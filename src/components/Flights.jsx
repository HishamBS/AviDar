import React, { Component } from "react";
import Map from "./Map";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../index.css";

export default class Flights extends Component {
  render() {
    const greenRgb = [0, 255, 0, 120];
    const redRgb = [255, 0, 0, 120];

    return (
      <div>
        <Tabs className='tabStyles'>
          <TabList>
            <Tab>
              <h5>Departing Flights ({this.props.departingData.length})</h5>
            </Tab>
            <Tab>
              <h5>Arriving Flights ({this.props.arrivingData.length})</h5>
            </Tab>
          </TabList>

          <TabPanel>
            <Map
              data={this.props.departingData}
              lat={this.props.selectedCityLat}
              long={this.props.selectedCityLong}
              sourceLine={greenRgb}
              targetLine={redRgb}
            />
          </TabPanel>
          <TabPanel>
            <Map
              data={this.props.arrivingData}
              lat={this.props.selectedCityLat}
              long={this.props.selectedCityLong}
              sourceLine={greenRgb}
              targetLine={redRgb}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
