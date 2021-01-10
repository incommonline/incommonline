import { Container, Row, Col, Form, ListGroup, ListGroupItem, Tabs, Tab, Card } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useState } from 'react'

import { getRoomName } from './SkeletonApi'

/* from react-router example */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function getRoomDetails( roomId, userId ) {
  return {
    currentUserId: userId,
    currentUserName: "Dominic S.",
    otherUsers: [ "Weiyoung", "Bereket" ],
    roomId: roomId,
    roomName: "Choral Reef",
    myNiches: [ { nicheName: "K-Pop", currentSupport: 1, supportRequired: 4, memberIds: null }, { nicheId: "abcdefgh", nicheName: "Vocal Jazz", currentSupport: 3, supportRequired: 3, members: [ "Weiyoung", "Dominic S.", "Bereket" ] } ],
    otherNiches: [ { nicheName: "Hockey", currentSupport: 3, supportRequired: 4 } ]
  };
}

function UserRoom( props ) {
  let roomInfo = getRoomDetails( props.roomId, props.userId );

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <p className="mt-3" style={ { textAlign: "center" } }>Current user is: {roomInfo.currentUserName}</p>
            </Col>
          </Row>
          <Row>
            <Card style={ { width: "100%", padding: "20px" } }>
            <Card.Title>Add a niche!</Card.Title>
            <Form>
              <Form.Group>
                <Form.Control placeholder="I'm interested in..."/>
              </Form.Group>
            </Form>
            </Card>
          </Row>
          <Row>
            <Col>
              <ListGroup variant="flush">
                <ListGroupItem style={ { textAlign: "center" } }>Other Users</ListGroupItem>
                { roomInfo.otherUsers.map( user => <ListGroupItem>{user}</ListGroupItem> ) }
              </ListGroup>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
              <Col>
                <Tabs defaultActiveKey="unsupportedNiches" id="niches-tab">
                  <Tab eventKey="unsupportedNiches" title="Explore" style={ { padding: "10px" } }>
                    <p style={ { padding: "15px 0 0 0"} }>Here are listed the niches that need support!</p>
                    <ListGroup>
                      { roomInfo.otherNiches.map( niche => <ListGroupItem>{niche.nicheName} <span style={{ float: "right" } }> {niche.currentSupport} / {niche.supportRequired} </span></ListGroupItem> ) }
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="myNiches" title="My Niches" style={ { padding: "10px" } }>
                    <ListGroup>
                      { roomInfo.myNiches.map( niche => <ListGroupItem>{niche.nicheName} <span style={{ float: "right" } }> { niche.currentSupport >= niche.supportRequired ? "✔ " : niche.currentSupport + "/" + niche.supportRequired } </span></ListGroupItem> ) }
                    </ListGroup>
                  </Tab>
                </Tabs>
              </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default function UserQuery() {
  let { roomId } = useParams();

  let query = useQuery();
  let history = useHistory();

  let [userQueryValue, setUserQueryValue] = useState( "" );

  if( !query.get( 'userid' ) ) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Welcome to {getRoomName( roomId )}. Who are you?</h1> 
            <Form onSubmit={ event => { event.preventDefault(); history.push( '/' + roomId + '?userid=' + userQueryValue ) } }>
              <Form.Control onChange={ event => setUserQueryValue( event.target.value ) }/>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <UserRoom userId={query.get( "userid" )} roomId={roomId}/>
    );
  }
}