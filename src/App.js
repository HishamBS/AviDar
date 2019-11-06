import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect, Link } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Flights from "./components/Flights";
import Navigation from "./components/Navigation";
import axios from "axios";
import dotenv from "dotenv";
import Footer from "./components/Footer";
dotenv.config();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivingData: [],
      departingData: [],
      selectedCityIata: "",
      selectedCityName: "",
      selectedCityLat: 0,
      selectedCityLong: 0,
      cityFound: false
    };
  }

  //handling the search button function
  handleSearchBtn = async city => {
    //get the typed city name and convert it to Iata
    city = city.toLowerCase();
    const chosenCity = await axios.get(
      `http://aviation-edge.com/v2/public/autocomplete?key=${process.env.REACT_APP_AV_EDGE_API_KEY}&city=${city}`
    );
    if (city !=='')
    {
      for (let i = 0; i < chosenCity.data.cities.length; i++) {
        if (chosenCity.data.cities[i].nameCity.toLowerCase() === city) {
          this.setState({
            cityFound: true
          });
        }
      }

      if (this.state.cityFound == true) {
        //setting the city iata and coordinates to the state
        console.log("hi");

        this.setState({
          selectedCityIata: chosenCity.data.cities[0].codeIataCity,
          selectedCityName: chosenCity.data.cities[0].nameCity,
          selectedCityLat: parseFloat(chosenCity.data.cities[0].latitudeCity),
          selectedCityLong: parseFloat(chosenCity.data.cities[0].longitudeCity)
        });
        this.handleMap();
       
      } else {
        alert("you have to enter a valid city");
      }}
      else{
        alert('you cant leave the field empty')
      }
    
  };

  // creating the two maps function
  handleMap = async () => {
    try {
      // creating the city database for getting iatas and coordinates
      const cityDB = await axios.get(
        `https://aviation-edge.com/v2/public/cityDatabase?key=${process.env.REACT_APP_AV_EDGE_API_KEY}`
      );

      //creating all arriving flights to chosen city
      const arrivingToCity = await axios.get(
        `http://aviation-edge.com/v2/public/routes?key=${process.env.REACT_APP_AV_EDGE_API_KEY}&arrivalIata=${this.state.selectedCityIata}`
      );

      //creating all departing flights from chosen city
      const departingFromCity = await axios.get(
        `http://aviation-edge.com/v2/public/routes?key=${process.env.REACT_APP_AV_EDGE_API_KEY}&departureIata=${this.state.selectedCityIata}`
      );

      // creating arrays of iatas to compose the array of objects which will plot the arcs to the map

      let arrivngArr = [];
      let departingArr = [];
      for (let i = 0; i < arrivingToCity.data.length; i++) {
        arrivngArr.push({
          iata: arrivingToCity.data[i].departureIata,
          departureTime: arrivingToCity.data[i].departureTime,
          arrivalTime: arrivingToCity.data[i].arrivalTime,
          flightNumber: arrivingToCity.data[i].flightNumber,
          airlineIata: arrivingToCity.data[i].airlineIata
        });
      }
      for (let i = 0; i < departingFromCity.data.length; i++) {
        departingArr.push({
          iata: departingFromCity.data[i].arrivalIata,
          departureTime: departingFromCity.data[i].departureTime,
          arrivalTime: departingFromCity.data[i].arrivalTime,
          flightNumber: departingFromCity.data[i].flightNumber,
          airlineIata: departingFromCity.data[i].airlineIata
        });
      }

      // the final data arrays of objects that will plot the arcs to the two final maps
      let arrivng = [];
      // the loop for creating arriving array of objects
      for (let i = 0; i < cityDB.data.length; i++) {
        for (let j = 0; j < arrivngArr.length; j++) {
          if (cityDB.data[i].codeIataCity === arrivngArr[j].iata) {
            arrivng.push({
              flyFrom: cityDB.data[i].nameCity,
              flyTo: this.state.selectedCityName,
              source: [
                parseFloat(cityDB.data[i].latitudeCity),
                parseFloat(cityDB.data[i].longitudeCity)
              ],
              target: [this.state.selectedCityLong, this.state.selectedCityLat],
              departureTime: arrivngArr[j].departureTime,
              arrivalTime: arrivngArr[j].arrivalTime,
              flightNumber: arrivngArr[j].flightNumber,
              airlineIata: arrivngArr[j].airlineIata
            });
          }
        }
      }

      let departing = [];
      // the loop for creating departing array of objects
      for (let i = 0; i < cityDB.data.length; i++) {
        for (let j = 0; j < departingArr.length; j++) {
          if (cityDB.data[i].codeIataCity === departingArr[j].iata) {
            departing.push({
              flyFrom: this.state.selectedCityName,
              flyTo: cityDB.data[i].nameCity,
              source: [this.state.selectedCityLong, this.state.selectedCityLat],
              target: [
                parseFloat(cityDB.data[i].latitudeCity),
                parseFloat(cityDB.data[i].longitudeCity)
              ],
              departureTime: departingArr[j].departureTime,
              arrivalTime: departingArr[j].arrivalTime,
              flightNumber: departingArr[j].flightNumber,
              airlineIata: departingArr[j].airlineIata
            });
          }
        }
      }

      this.setState({
        arrivingData: arrivng,
        departingData: departing
      });

      console.log(arrivngArr);
      console.log(departingArr);
      // console.log(departingStatusArr)
      // console.log(arrivingStatusArr)
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  selectedCity={this.state.selectedCity}
                  handleSearch={this.handleSearchBtn}
                  test={this.handleMap}
                  cityFound={this.state.cityFound}
                />
              )}
            />
            <Route
              exact
              path="/flights"
              render={props => (
                <Flights
                  {...props}
                  arrivingData={this.state.arrivingData}
                  departingData={this.state.departingData}
                  selectedCity={this.state.selectedCity}
                  selectedCityLat={this.state.selectedCityLat}
                  selectedCityLong={this.state.selectedCityLong}
                />
              )}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
