import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Container, Item, Label } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities,  selectActivity, cancelSelectActivity, deleteActivity }: Props) {
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
                                    <Button onClick={() => deleteActivity(activity.id)} floated="right" content="Delete" color="red"></Button>
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