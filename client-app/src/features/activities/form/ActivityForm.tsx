import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import ConfirmDialog from "../details/ConfirmDialog";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, loading, updateActivity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        venue: '',
        date: '',
        city: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    function handleSubmitClick() {
        setShowConfirmDialog(true);
        
    };

    const handleCancel = () => {
        // Hide the confirm dialog when canceled
        setShowConfirmDialog(false);
    };

    const handleConfirm = () => {
        // Handle the delete action here
        // This is where you would perform the actual delete logic
        // After that, you can hide the dialog
        setShowConfirmDialog(false);
        if (!activity.id)
        {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        //activity.id? updateActivity(activity) : createActivity(activity);
    };
    function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
       const {name, value} = event.target;
       setActivity({...activity, [name]: value}) 
    }; 
    if (loadingInitial) return <LoadingComponent content="Loading"/>
    return (
        <Segment clearing>
            <Form autoComplete="off" onSubmit={handleSubmitClick}>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" value={activity.description}  name="description" onChange={handleInputChange}/>
                <Form.Input placeholder="Category" value={activity.category}  name="category" onChange={handleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}/>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}/>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button disabled={loading} floated="right" type="button" content="Cancel" as={Link} to="/activities" />
            </Form>
            <ConfirmDialog
                message="Are you sure you want to edit this item?"
                onConfirm={handleConfirm}
                dialogVisible={showConfirmDialog}
                closeDialog={handleCancel}
            />
        </Segment>
    )
})