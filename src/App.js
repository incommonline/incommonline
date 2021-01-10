import { Container, Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

import Home from "./Home"

// stubs
function getRoomName( roomId ) {
  return getRoomDetails( roomId, "deadbeef" ).roomName;
}

function getRoomDetails( roomId, userId ) {
  return {
    currentUserId: userId,
    roomId: roomId,
    roomName: "Choral Reef",
    niches: [ { nicheId: "TWwyAzRd", nicheName: "Hockey", isSupportedByUser: false, currentSupport: 3, supportRequired: 4 }, 
              { nicheId: "biiTCxey", nicheName: "K-Pop",  isSupportedByUser: true,  currentSupport: 1, supportRequired: 4 } ],
    subgroups: [ { subgroupId: "abcdefgh", subgroupName: "Vocal Jazz", memberIds: [ "1a2b3c4d", "2a3b4c5d" ] } ]
  }
}


function Test() {
  let { roomId } = useParams();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to {getRoomName( roomId )}. Who are you?</h1> 
          <Form>
            <Form.Control/>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:roomId">
          <Test/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}
