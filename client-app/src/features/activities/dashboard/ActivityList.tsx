import { SyntheticEvent, useState } from "react";
import { Button, Container, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


export default observer(function ActivityList() {
    const [target, setTarget] = useState('');
    const {activityStore} = useStore();
    const {activitiesByDate, loading} = activityStore;
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        activityStore.deleteActivity(id);
    }
    return (
        <>
            <Container >
                <Item.Group divided>
                    {activitiesByDate.map(activity => (
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
                                    <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="purple"></Button>
                                    <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleActivityDelete(e, activity.id)} floated="right" content="Delete" color="red"></Button>
                                    <Label basic content={activity.category} color="red" size="large"></Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Container>

        </>
    )
})