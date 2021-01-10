import { Container, Row, Col, Form, ListGroup, ListGroupItem, Tabs, Tab, Card, Button } from 'react-bootstrap';
import { useParams, useLocation, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import { getRoomName, getRoomDetails } from './SkeletonApi'

/* from react-router example */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function UserRoom( props ) {
  let roomInfo = getRoomDetails( props.roomId, props.userId, props.name);

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

  let [userId, setUserId] = useLocalStorage("userid");
  let [created, setCreated] = useLocalStorage("signedin");
  let [name, setName] = useLocalStorage("username");

  // runs on first round, runs if created changes from false to true
  useEffect(() => {
    if(created) {
      history.push( '/' + roomId + '?userid=' + userId )
    }
  }, [created])

  if( !query.get( 'userid' ) ) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Welcome to {getRoomName( roomId )}. Who are you?</h1> 
            <Form onSubmit={ event => { event.preventDefault(); setCreated(true);  } }>
              <Form.Control placeholder="userid" onChange={ event => setUserId( event.target.value ) }/>
              <Form.Control placeholder="name" onChange={ event => setName( event.target.value ) }/>
              <Button type="submit">Sign in</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <UserRoom userId={userId} roomId={roomId} name={name}/>
    );
  }
}