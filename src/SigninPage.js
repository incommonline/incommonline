import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import { UserPage } from 'UserPage';
import { getRoomName } from './SkeletonApi';

/* from react-router example */
function useQuery() {
  return new URLSearchParams( useLocation().search );
}

export default function SigninPage() {
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
      <UserPage userId={userId} roomId={roomId} name={name}/>
    );
  }
}