import React, { Component } from "react";
import { Jumbotron, Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";
import dotenv from "dotenv";
dotenv.config();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      suggestions:[]
    };
  }
 
  render() {
    return (
      <div>
        <Jumbotron fluid className='mainJumbo'>
          <Container>
            <Container className="homeJump">
              <h1>AviDar</h1>
              <h3>
                AviDar stands for Aviation Radar
              </h3>
              
            </Container>
            <Form className='homeJump'>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="search"
                    placeholder="type the city iata or name in here"
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
            <Link to={this.props.cityFound ? "/flights" : "#"}>
              <Button
              as={Col}
                variant="dark"
                type=""
                onClick={() => this.props.handleSearch(this.state.city)}
                className='homeBtn'
              >
                Let The Magic Happens
              </Button>
            </Link>
          </Container>
          <Container className='secJumbo'>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
            <h5>You have to type a correct city name</h5>
            <p>it is a simple react application showing all departing and arriving flights 
              to the searched city</p>

            </Container>
        </Jumbotron>
        
      </div>
    );
  }
}
