import React from "react";
import { Card, Image,  Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDetail() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;
    if(!activity)
    {
        return <LoadingComponent/>;
    }
    return (
        <>
            <Card fluid>
                <Image src={`/assets/categoryImages/logo512.png`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button onClick={() => openForm(activity.id)} color="blue" content="Edit"></Button>
                        <Button color="grey" content="Cancel" onClick={cancelSelectedActivity}></Button>
                    </Button.Group>
                </Card.Content>
            </Card>
            
        </>
    )
})