import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import ConfirmDialog from "../details/ConfirmDialog";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, loading, updateActivity} = activityStore;

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
        activity.id? updateActivity(activity) : createActivity(activity);
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
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button disabled={loading} floated="right" type="button" content="Cancel" onClick={closeForm}/>
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