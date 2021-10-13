import React from "react";
import GameContainer from "./components/GameContainer";
import Signup from "./components/Signup";
import './stylesheets/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='container'>
        <nav>
          <ul>
            <Link to="/"><li>Login</li></Link>
            <Link to="/signup"><li>Signup</li></Link>
						<Link to="/play"><li>Play</li></Link>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/play">
            <GameContainer />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Login() {
  return <h2>Login</h2>;
}

export default App;