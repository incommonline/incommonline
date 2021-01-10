import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RoomsPageText from './RoomsPageText'
import SigninPage from './SigninPage'

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" style={ { marginBottom: "40px" } }>
        <Navbar.Brand>
          incommon.
        </Navbar.Brand>
      </Navbar>

      <Switch>
        <Route path="/:roomId">
          <SigninPage/>
        </Route>
        <Route path="/">
          <RoomsPageText/>
        </Route>
      </Switch>
    </Router>
  );
}
