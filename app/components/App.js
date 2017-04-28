import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/battle" component={Battle} exact />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => (<p>Not Found</p>)}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
