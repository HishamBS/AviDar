import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../index.css";
const Arc = props => {
  const [setSmShow] = useState(false);
  return (
      <Modal
        size="md"
        show={props.click}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="arc"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h1>Flight Number : {props.flightNumber}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>AirLine Iata : {props.airLineIata}</h3>
          <h3>From : {props.from}</h3>
          <h3>To : {props.to}</h3>
          <h3>Departure Time : {props.dt}</h3>
          <h3>Arrival Time : {props.at}</h3>
        </Modal.Body>
      </Modal>
  );
};
export default Arc;
