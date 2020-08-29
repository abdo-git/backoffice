import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import  NavBar  from "./components/layout/NavBar";
import Createcours from "./components/Cours/Createcours";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/' component={Createcours}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
