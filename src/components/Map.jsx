import React, { useState, Component } from "react";
import ReactMapGL from "react-map-gl";
import DeckGL, { ArcLayer, ScatterplotLayer } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../index.css";
import { Container } from "react-bootstrap";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        height: "80vh",
        width: "100vw",
        latitude: props.lat,
        longitude: props.long,
        zoom: 2
      },
      flightNumber: "",
      airLineIata: "",
      from: "",
      to: "",
      dt: "",
      at: "",
      isHidden: true
    };
  }

  render() {
    return (
      <div
        style={
          {
            // position: "absolute",
            // top: 120,
            // left: 120,
            // height: "100vh",
            // width: "100vw",
          }
        }
      >
        {/* <Container>
    <Row className='show-grid'>
    <Col> */}
        <ReactMapGL
          className="mapView"
          // zoom={3}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          mapStyle="mapbox://styles/mapbox/light-v9"
          // scrollZoom={false}
          touchZoom={true}
        >
          <DeckGL
            className="arcs"
            viewState={this.state.viewport}
            layers={[
              new ArcLayer({
                id: "flight-arcs",
                data: this.props.data,
                pickable: true,
                getSourcePosition: d => d.source,
                getTargetPosition: d => d.target,
                getSourceColor: () => this.props.sourceLine,
                getTargetColor: () => this.props.targetLine,
                getWidth: () => 10,
                getTilt: 50,
                onHover: ({ object, x, y }) => {
                    console.log(object)
                  try {
                    this.setState({
                      flightNumber: object.flightNumber,
                      airLineIata: object.airlineIata,
                      from: object.flyFrom,
                      to: object.flyTo,
                      dt: object.departureTime,
                      at: object.arrivalTime,
                      isHidden: false
                    });
                  } catch (err) {}
                }
              })
            ]}
          />
        </ReactMapGL>
        <Container>
          <div className='info' style={this.state.isHidden?{display:'none'}:{}}>
            <h6>Flight Number : {this.state.flightNumber}</h6>
            <h6>AirLine Iata : {this.state.airLineIata}</h6>
            <h6>From : {this.state.from}</h6>
            <h6>To : {this.state.to}</h6>
            <h6>Departure Time : {this.state.dt}</h6>
            <h6>Arrival Time : {this.state.at}</h6>
          </div>
        </Container>
        {/* </Col>
      </Row>
      </Container> */}
      </div>
    );
  }
}
