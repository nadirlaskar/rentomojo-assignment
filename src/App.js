import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Posts, Home, PostDetails } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route path="/posts/:userId" exact>
          <Posts />
        </Route>
        <Route path="/post-details/:postId" exact>
          <PostDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
