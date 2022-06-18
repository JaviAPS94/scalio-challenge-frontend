import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Posts } from './components/Posts';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Posts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
