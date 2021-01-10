import { Container, Row, Col, Form, Button } from 'react-bootstrap';
  
export default function RoomCreate() {
    return (
    <Container>
        <Row> 
            <Col>
            <Form>
                <Form.Group>
                    <Form.Label>Create a room or join an existing room here!</Form.Label>
                    <Form.Control placeholder="Enter the room name" />
                </Form.Group>

                <Button variant="primary" className="mr-2">Join a room</Button>
                <Button variant="primary" className="mr-2">Create a room</Button>
            </Form>
            </Col>
        </Row> 
    </Container>
    );
}