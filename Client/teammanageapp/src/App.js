import React, { Component } from 'react';
import './App.css';
import Member from '../src/component/member'
import Project from '../src/component/project'
import MemberInProject from '../src/component/memberInProject'
import { Container, Row, Col } from 'reactstrap';
class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <p style={{ fontSize: 200 + '%', fontWeight: "bold", textAlign: "center" }}>Team manage app</p>
        </header>
        <Container>
          <Row>
            <Col xs="6" sm="4">
              <Member />
            </Col>
            <Col xs="6" sm="4">
              <Project />
            </Col>
            <Col sm="4">
            <MemberInProject/>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default App;
