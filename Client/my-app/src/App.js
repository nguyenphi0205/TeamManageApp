import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
// import Table from '../src/member.component/memberList.component'
class App extends Component {
  render() {
    return (
      <div className="App">
        <h5>Team Manage App </h5>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <Button color="danger">Danger!</Button>
            </div>
            <div class="col-sm">
              {/* <Table/> */}
            </div>
            <div class="col-sm">
              One of three columns
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
