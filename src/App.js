import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import  NavBar  from "./components/layout/NavBar";
import Createcours from "./components/Cours/Createcours";
import  createChap  from "./components/Cours/Chapitres/createChap.js";
import addTag from './components/Tags/addTag'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Createcours}/>
            <Route path='/createChap' component={createChap}/>
            <Route path='/tags' component={addTag}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
