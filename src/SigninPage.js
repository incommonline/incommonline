import { Container, Row, Col, Form } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import { Base64 } from 'base64-string';

import UserPage from './UserPage';

const stringHash = require( "string-hash" );


export default function SigninPage() {
  let { roomId } = useParams();

  let history = useHistory();

  let [currentName, setCurrentName] = useState( "" );
  let [rooms = [], setRooms] = useLocalStorage( "rooms" );
  let [sessions = [], setSessions] = useLocalStorage( "sessions" );

  let room = rooms.find( room => room.id === roomId );

  let [currentSession, setCurrentSession] = useState( sessions.find( session => session.roomId === room.id ) );

  if( room === undefined ) { 
    history.push( '/' ); return "";
  }

  let onSubmit = event => {
    event.preventDefault();

    let foundUser = room.users.find( user => user.name === currentName );

    if( foundUser === undefined ) {
      const base64_encoder = new Base64();
      const date = new Date();
  
      let userId = base64_encoder.encode( stringHash( currentName + date.getMilliseconds ) ).slice( 5, 11 ); 
      foundUser = { id: userId, name: currentName };
      room.users.push( foundUser );

      setRooms( rooms );
    } 

    setSessions( [...sessions, { userId: foundUser.id, roomId: room.id }] );
    setCurrentSession( { userId: foundUser.id, roomId: room.id } );
  }

  if( currentSession === undefined ) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Welcome to {room.name}. Who are you?</h1> 
            <Form onSubmit={onSubmit}>
              <Form.Control placeholder="your name" onChange={ event => setCurrentName( event.target.value ) }/>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <UserPage userId={currentSession.userId} roomId={currentSession.roomId}/>
    );
  }
}