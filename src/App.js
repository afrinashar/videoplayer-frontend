// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import VideoPage from './containers/VideoPage'; // Assuming you have a separate page for each video

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/video/:videoId" component={VideoPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
