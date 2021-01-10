import { Container, Row, Col, Form, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home'
import UserQuery from './UserQuery'

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" style={ { marginBottom: "40px" } }>
        <Navbar.Brand href="#home">
          incommon.
        </Navbar.Brand>
      </Navbar>

      <Switch>
        <Route path="/:roomId">
          <UserQuery/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}
