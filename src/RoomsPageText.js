import { Container, Row, Col } from 'react-bootstrap';

import RoomsPageApp from './RoomsPageApp'

export default function RoomsPageText() {
    return ( 
        <Container>
            <Row>
                <Col>
                    <p>Welcome to incommon! incommon is a web app to connect people with niche interests within a larger group (i.e. nwhacks, student clubs, or degree programs). Members of the larger group can anonymously post niche interests and their identity is not revealed until enough people (set by the poster) say they are also interested in the niche interest. Give it a try!</p>
                </Col>
                <Col>
                    <RoomsPageApp/>
                </Col>
            </Row>
        </Container>
    )
}