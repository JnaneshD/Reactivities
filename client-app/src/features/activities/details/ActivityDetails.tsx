import React from "react";
import { Card, Image,  Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";


interface Proper {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;

}



export default function ActivityDetail({ activity, cancelSelectActivity, openForm }: Proper) {

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
                        <Button color="grey" content="Cancel" onClick={cancelSelectActivity}></Button>
                    </Button.Group>
                </Card.Content>
            </Card>
            
        </>
    )
}