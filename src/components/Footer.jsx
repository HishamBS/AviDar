import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
export default class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="bottom">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://png2.cleanpng.com/sh/bebbfaf5a59b6270321b314fe3f34207/L0KzQYm3VMAzN6J0iZH0aYP2gLBuTgJibJJ3RdV4bYD4hLb5Tflkd594RdV1aYCwccP7TgJibJJ3RadqY0K0dLO9hMFmaWg2RqM6OUe1SIa8UcUzOmc8SaI8MEi4SYm1kP5o/kisspng-radar-computer-icons-clip-art-radar-5ac21db6d1ea71.1197285515226710308598.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            {" HBS"}
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
