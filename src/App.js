import React,{Component} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import {NavBar,Tags} from './components'

class App extends  Component {
  render(){
  return (
    <BrowserRouter>
    <div className="App">
     <NavBar/>
     <Switch>
       <Route path="/tags" component={Tags}/>
     </Switch>
    </div>
    </BrowserRouter>
  )
}
}

export default App;
