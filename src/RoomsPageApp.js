import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Base64 } from 'base64-string';
import { getRoomIdFromName } from './SkeletonApi';
import { useLocalStorage } from '@rehooks/local-storage';

export default function RoomsPageApp() {
    let history = useHistory();

    let [roomName,      setRoom]          = useState( "" ); 
    let [joinFailed,    setJoinFailed]    = useState( false );
    let [createdId,     setCreatedId]     = useState( null );
    let [createdFailed, setCreatedFailed] = useState( null );
    let [rooms = [],    setRooms]         = useLocalStorage( "rooms" );

    let clearButtonStates = () => {
        setJoinFailed( false ); setCreatedFailed( false ); setCreatedId( null );
    }

    let onRoomJoin = ( event ) => {
        event.preventDefault();

        clearButtonStates();

        if( roomName === "" ) { return; }

        let roomsWithName = rooms.filter( room => room.name === roomName );

        if( roomsWithName === undefined || roomsWithName.length == 0 ) {
            setCreatedFailed( true );
        } else {
            history.push( '/' + roomsWithName[0].id );
        }
    }

    let onRoomCreate = ( event ) => {
        event.preventDefault();

        clearButtonStates();

        if( roomName === "" ) { return; }
    
        const base64_encoder = new Base64();
        const date = new Date();
    
        let roomId = base64_encoder.encode( roomName + date.getMilliseconds() );
        let room = { id: roomId, name: roomName };

        if ( rooms.includes( room ) === false ) {
            setRooms( [...rooms, room] );
            setCreatedId( roomId );
        } else {
            setCreatedFailed( true );
        }
    }

    return (
    <Container>
        <Row> 
            <Col>
            <Form>
                <Form.Group onSubmit={ event => event.preventDefault() }>
                    <Form.Label>Create a room or join an existing room here!</Form.Label>
                    <Form.Control placeholder="Enter the room name" onChange={ event => setRoom( event.target.value ) } />
                </Form.Group>

                { joinFailed ? <p style={ { color: "red" } }>No room with this name exists.</p> : "" }
                { createdFailed ? <p style={ { color: "red" } }>A room with this name already exists.</p> : "" }
                { createdId ? <p style={ { color: "green" } }>Created a room at <span href={createdId}>incommon.online/{createdId}</span> </p> : "" }

                <Button variant="primary" className="mr-2" onClick={ onRoomJoin }>Join a room</Button>
                <Button variant="primary" className="mr-2" onClick={ onRoomCreate }>Create a room</Button>
            </Form>
            </Col>
        </Row> 
    </Container>
    );
}