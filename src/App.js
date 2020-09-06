import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Createcours from "./components/Cours/Createcours";
import addTag from "./components/Tags/addTag";
import signedIn from "./components/auth/SignedIn";
import signedUp from "./components/auth/SignedUp";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Createcours} />
            <Route path="/signin" component={signedIn} />
            <Route path="/signup" component={signedUp} />
            <Route path="/tags" component={addTag} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
