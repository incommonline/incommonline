import { Form, Button } from 'react-bootstrap';

export default function RoomCreate() {
    return (
    <Form>
        <Form.Group>
            <Form.Label>Create a room!</Form.Label>
            <Form.Control placeholder="Enter the room name" />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
    </Form>
    );
}