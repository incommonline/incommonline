import { Container, Row, Col, Form, Card, Tab, Tabs, ListGroup, ListGroupItem } from 'react-bootstrap'

import { getRoomDetails } from './SkeletonApi'


export default function UserPage( props ) {
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