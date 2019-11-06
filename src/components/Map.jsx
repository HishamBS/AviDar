import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import DeckGL, { ArcLayer,ScatterplotLayer } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dotenv from "dotenv";
import "../index.css";
import Arc from "./Arc";


const Map = props => {


  dotenv.config();
  const [viewport, setViewport] = useState({
    height: "80vh",
    width: "100vw",
    latitude: props.lat,
    longitude: props.long,
    zoom: 2
  });
  


  return (
    <div
      className="mapView"
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
        // zoom={3}
        {...viewport}
        onViewportChange={newViewport => setViewport(newViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/light-v9"
        scrollZoom={false}
        touchZoom={true}
      >
        <DeckGL
          viewState={viewport}
          layers={[
            new ArcLayer({
              id: "flight-arcs",
              data: props.data,
              pickable: true,
              getSourcePosition: d => d.source,
              getTargetPosition: d => d.target,
              getSourceColor: () => props.sourceLine,
              getTargetColor: () => props.targetLine,
              getWidth: () => 3,
              getTilt: 50,
              onHover: ({ object, x, y }) => {
                // console.log(object);
                 return (
                  <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: x, top: y}}>
        { object.flightNumber }
      </div>)
                    {/* flightNumber={object.flightNumber}
                    airLineIata={object.airlineIata}
                    from={object.flyFrom}
                    to={object.flyTo}
                    dt={object.departureTime}
                    at={object.arrivalTime} */}
                   
                
                
                /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
              }
            })
          ]}
        />
      </ReactMapGL>
      {/* </Col>
      </Row>
      </Container> */}
    </div>
  );
};

export default Map;
