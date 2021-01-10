import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Base64 } from 'base64-string';
import { getRoomIdFromName, createRoom } from './SkeletonApi'

function onRoomJoin( event, roomName, onFailure = () => {}, onSuccess = () => {} ) {
    event.preventDefault();

    if( roomName === "" ) { return; }

    let error = getRoomIdFromName( roomName ).error;

    if( error == null ) {
        onSuccess( getRoomIdFromName( roomName ).id )
    } else {
        onFailure( error );
    }
}

function onRoomCreate( event, roomName, onFailure = () => {}, onSuccess = () => {} ) {
    event.preventDefault();

    if( roomName === "" ) { return; }

    const base64_encoder = new Base64();
    const date = new Date();

    let roomId = base64_encoder.encode( roomName + date.getMilliseconds() );

    let roomCreated = createRoom( roomId, roomName );
    let error = roomCreated.error;

    if( error == null ) {
        onSuccess( roomId );
    } else {
        onFailure( error );
    }
}


export default function RoomCreate() {
    let history = useHistory();

    let [roomContent,   setRoomContent]   = useState( "" ); 
    let [joinFailed,    setJoinFailed]    = useState( false );
    let [createdId,     setCreatedId]     = useState( null );
    let [createdFailed, setCreatedFailed] = useState( null );

    return (
    <Container>
        <Row> 
            <Col>
            <Form>
                <Form.Group onSubmit={ event => event.preventDefault() }>
                    <Form.Label>Create a room or join an existing room here!</Form.Label>
                    <Form.Control placeholder="Enter the room name" onChange={ event => setRoomContent( event.target.value ) } />
                </Form.Group>

                { joinFailed ? <p style={ { color: "red" } }>No room with this name exists.</p> : "" }
                { createdFailed ? <p style={ { color: "red" } }>A room with this name already exists.</p> : "" }
                { createdId ? <p style={ { color: "green" } }>Created a room at <span href={createdId}>incommon.online/{createdId}</span> </p> : "" }

                <Button variant="primary" className="mr-2" onClick={ event => { setJoinFailed( false ); setCreatedFailed( false ); setCreatedId( null ); onRoomJoin( event, roomContent, () => setJoinFailed( true ), id => history.push( '/' + id ) ); } }>Join a room</Button>
                <Button variant="primary" className="mr-2" onClick={ event => { setJoinFailed( false ); setCreatedFailed( false ); setCreatedId( null ); onRoomCreate( event, roomContent, () => setCreatedFailed( true ), ( id ) => setCreatedId( id ) ) } }>Create a room</Button>
            </Form>
            </Col>
        </Row> 
    </Container>
    );
}