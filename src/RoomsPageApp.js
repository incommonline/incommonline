import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Base64 } from 'base64-string';
import { useLocalStorage } from '@rehooks/local-storage';

const stringHash = require("string-hash");

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

        let roomWithName = rooms.find( room => room.name === roomName );

        if( roomWithName === undefined ) {
            setJoinFailed( true );
        } else {
            history.push( '/' + roomWithName.id );
        }
    }

    let onRoomCreate = ( event ) => {
        event.preventDefault();

        clearButtonStates();

        if( roomName === "" ) { return; }
    
        const base64_encoder = new Base64();
        const date = new Date();
    
        let roomId = base64_encoder.encode( stringHash( roomName + date.getMilliseconds ) ).slice( 5, 11 ); 
        let room = { id: roomId, name: roomName, users: [], niches: [] };

        if ( rooms.some( room => room.name === roomName ) === false ) {
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
                    
                    { joinFailed ? <p style={ { color: "red", fontSize: "small" } }>No room with this name exists.</p> : "" }
                    { createdFailed ? <p style={ { color: "red", fontSize: "small" } }>A room with this name already exists.</p> : "" }
                    { createdId ? <p style={ { color: "green", fontSize: "small" } }>Created a room at <a href={createdId}>{window.location.host}/{createdId}</a>. Share this with your friends!</p> : "" }
                </Form.Group>

                
                <Button variant="primary" className="mr-2" onClick={ onRoomJoin }>Join a room</Button>
                <Button variant="primary" className="mr-2" onClick={ onRoomCreate }>Create a room</Button>
            </Form>
            </Col>
        </Row> 
    </Container>
    );
}