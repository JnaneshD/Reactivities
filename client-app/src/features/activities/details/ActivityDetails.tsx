import React, { useEffect } from "react";
import { Card, Image,  Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";


export default observer(function ActivityDetail() {
    const {activityStore} = useStore();

    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);
    if(!activity || loadingInitial)
    {
        return <LoadingComponent/>
    }

    return (
        <>
            <Card fluid>
                <Image src={`/assets/categoryImages/logo512.png`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity?.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity?.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity?.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button color="blue" content="Edit" as={Link} to={`/manage/${activity.id}`}></Button>
                        <Button color="grey" content="Cancel" as={Link} to='/activities' ></Button>
                    </Button.Group>
                </Card.Content>
            </Card>
            
        </>
    )
})