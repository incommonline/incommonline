import { Container, Row, Col, Form, Card, Tab, Tabs, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useLocalStorage } from '@rehooks/local-storage';
import { useState } from 'react';

export default function UserPage( props ) {
    let { roomId, userId } = props;

    let [rooms = [], setRooms] = useLocalStorage( "rooms" );
    let [nicheName, setNicheName] = useState();

    let room  = rooms.find( room => room.id === roomId );

    let users  = room.users;
    let niches = room.niches; 

    let thisUser = room.users.find( user => user.id === userId );

    let myNiches = niches.filter( niche => niche.supporters.some( user => user === thisUser.id ) );
    let otherNiches = niches.filter( niche => niche.supporters.some( user => user === thisUser.id ) === false );

    let onClick = ( event ) => { 

        let niche = { name: nicheName, supportRequired: 4, supporters: [ thisUser.id ] };

        console.log( niche );

        niches.push( niche );

        setRooms( rooms );
    }

    return (
      <Container>
        <Row>
          <Col xs={3}>
            <Row>
              <Card style={ { width: "100%", padding: "20px 20px 0px 20px" } }>
              <Card.Title>Add a niche!</Card.Title>
              <Form onSubmit={ event => event.preventDefault() }>
                <Form.Group>
                  <Form.Control placeholder="I'm interested in..." onChange={ event => setNicheName( event.target.value ) }/>
                  { nicheExists ? <p style={ { color: "red", fontSize: "small" } }>Niche already exists.</p> : "" }
                </Form.Group>

                <Button style={ { marginBottom: "10px" } } onClick={onClick} type="click" >Add</Button>
              </Form>
              </Card>
            </Row>
            <Row>
              <Col>
                <ListGroup variant="flush">
                  <ListGroupItem style={ { textAlign: "center" } }>Users</ListGroupItem>
                  <ListGroupItem key={thisUser.id}>{thisUser.name}</ListGroupItem>
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
                        { otherNiches.map( niche => <ListGroupItem key={niche.name}>{niche.name} <span style={{ float: "right" } }> {niche.supporters.length} / {niche.supportRequired} </span></ListGroupItem> ) }
                      </ListGroup>
                    </Tab>
                    <Tab eventKey="myNiches" title="My Niches" style={ { padding: "10px" } }>
                      <ListGroup>
                        { myNiches.map( niche => <ListGroupItem key={niche.name}>{niche.name} <span style={{ float: "right" } }> { niche.supporters.length >= niche.supportRequired ? "✔ " : niche.supporters.length + "/" + niche.supportRequired } </span></ListGroupItem> ) }
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