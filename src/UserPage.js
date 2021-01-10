import { Container, Row, Col, Form, Card, Tab, Tabs, ListGroup, ListGroupItem, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';
import { useState } from 'react';

export default function UserPage( props ) {
    let { roomId, userId } = props;
    let history = useHistory();

    let [rooms = [], setRooms] = useLocalStorage( "rooms" );
    let [nicheName, setNicheName] = useState();
    let [nicheExists, setNicheExists] = useState( false );
    let [sessions = [], setSessions] = useLocalStorage( "sessions" );

    let room  = rooms.find( room => room.id === roomId );

    let users  = room.users;
    let niches = room.niches; 

    let thisUser = room.users.find( user => user.id === userId );

    let myNiches = niches.filter( niche => niche.supporters.some( user => user === thisUser.id ) );
    let otherNiches = niches.filter( niche => niche.supporters.some( user => user === thisUser.id ) === false );

    let onClick = ( event ) => { 
        event.preventDefault();
        
        document.getElementById("nicheadder").reset();

        if( nicheName === undefined ) { return; }

        let newNiche = { name: nicheName.trim(), supportRequired: 4, supporters: [ thisUser.id ] };

        if( nicheName === "" ) { return; }

        if( niches.some( niche => niche.name === newNiche.name ) ) {
            setNicheExists( true );
        } else {
            setNicheExists( false );
            niches.unshift( newNiche );
            setRooms( rooms );
            console.log(rooms);
        }
    }

    let onPush = ( event, nicheName ) => {
        let newRooms = [...rooms];

        let newRoom  = newRooms.find( room => room.id === roomId );

        let niche = newRoom.niches.find( niche => niche.name === nicheName );

        if( niche.supporters.some( supporter => supporter.id === thisUser.id ) === false ) {
            niche.supporters.push( thisUser.id );
        }

        setRooms( newRooms );
    }

    let logout = () => {
        setSessions( sessions.filter( session => (session.roomId === room.id && session.userId === thisUser.id) === false ) );
        history.push( "/" );
    }

    return (
      <Container>
        <Row>
          <Col xs={3}>
            <Row>
              <Card style={ { width: "100%", padding: "20px 20px 0px 20px" } }>
              <Card.Title>Add a niche!</Card.Title>
              <Form id="nicheadder" onSubmit={ event => event.preventDefault() }>
                <Form.Group>
                  <Form.Control placeholder="I'm interested in..." onChange={ event => setNicheName( event.target.value ) }/>
                  { nicheExists ? <p style={ { color: "red", fontSize: "small" } }>Niche already exists.</p> : "" }
                </Form.Group>

                <Button style={ { marginBottom: "10px" } } onClick={onClick} type="submit" >Add</Button>
              </Form>
              </Card>
            </Row>
            <Row>
              <Col>
                <ListGroup variant="flush">
                  <ListGroupItem style={ { textAlign: "center" } }><b>People</b></ListGroupItem>
                  <ListGroupItem key={thisUser.id}>{thisUser.name}</ListGroupItem>
                  <Button style={ { marginBottom: "10px" } } onClick={logout} type="click" >Log Out</Button>
                  { users.map( user => user.id === thisUser.id ? "" : <ListGroupItem key={user.id}>{user.name}</ListGroupItem> ) }
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
                        { otherNiches.map( niche => 
                            <ListGroupItem key={niche.name}>
                                <span className="align-middle" >{niche.name}</span> 
                                <div style={{ float: "right" } }>
                                    <span className="align-middle" > {niche.supporters.length} / {niche.supportRequired} </span> 
                                    <Button variant="primary" size="sm" style={{ float: "right", marginLeft: "15px" }} type="submit" onClick={ event => onPush( event, niche.name ) }>Support</Button>
                                </div>
                            </ListGroupItem> ) }
                      </ListGroup>
                    </Tab>
                    <Tab eventKey="myNiches" title="My Niches" style={ { padding: "10px" } }>
                      <ListGroup> { myNiches.map( niche => 
                        <ListGroupItem key={niche.name}> <span className="align-middle">{niche.name}</span> 
                          <DropdownButton size="sm" disabled={niche.supporters.length < niche.supportRequired} style={ { float: "right", marginLeft: "15px" } } id="dropdown-basic-button" title={niche.supporters.length < niche.supportRequired ? "Awaiting more members" : "Other members"} >
                            { niche.supporters.map( supporter => <Dropdown.Item key={supporter}>{users.find( user => user.id === supporter ).name} </Dropdown.Item> ) }
                          </DropdownButton>
                            <span style={{ float: "right" } } className="align-middle">{ niche.supporters.length >= niche.supportRequired ? "✔ " : niche.supporters.length + "/" + niche.supportRequired } </span>
                        </ListGroupItem> ) }
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