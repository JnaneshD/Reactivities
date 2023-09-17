import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ConfirmDialog from "../details/ConfirmDialog";

interface Props {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) =>void;
}

export default function ActivityForm({selectedActivity, closeForm, createOrEdit}: Props) {

    // Handle populating data for edit
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        venue: '',
        date: '',
        city: ''
    }

    const [activity, setActivity] = useState(initialState);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    function handleSubmitClick() {
        setShowConfirmDialog(true);
        console.log(activity);
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
        createOrEdit(activity);
    };
    function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
       const {name, value} = event.target;
       setActivity({...activity, [name]: value}) 
    }; 
    return (
        <Segment clearing>
            <Form autoComplete="off" onSubmit={handleSubmitClick}>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" value={activity.description}  name="description" onChange={handleInputChange}/>
                <Form.Input placeholder="Category" value={activity.category}  name="category" onChange={handleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}/>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}/>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}/>
                <Button floated="right" positive type="submit" content="Submit"/>
                <Button floated="right" type="button" content="Cancel" onClick={closeForm}/>
            </Form>
            <ConfirmDialog
                message="Are you sure you want to edit this item?"
                onConfirm={handleConfirm}
                dialogVisible={showConfirmDialog}
                closeDialog={handleCancel}
            />
        </Segment>
    )
}