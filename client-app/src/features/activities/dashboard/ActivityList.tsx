import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Container, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityList({ activities,  selectActivity, cancelSelectActivity }: Props) {
    return (
        <>
            <Container >
                <Item.Group divided>
                    {activities.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    {activity.title}
                                </Item.Header>
                                <Item.Meta>
                                    {activity.date}
                                </Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>

                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="purple"></Button>
                                    <Label basic content={activity.category} color="red" size="large"></Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Container>

        </>
    )
}