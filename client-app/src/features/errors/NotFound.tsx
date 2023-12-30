import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search">
                    
                </Icon>
                Oops - we could not find what you were looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>Return to Homepage</Button>
            </Segment.Inline>
        </Segment>
    )
}