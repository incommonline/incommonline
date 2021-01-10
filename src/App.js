import { Container, Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home'
import UserQuery from './UserQuery'

export default function App() {
  return (
    <Router>
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
