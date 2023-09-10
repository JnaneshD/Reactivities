import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ConfirmDialog from "../details/ConfirmDialog";

interface Props {
    Activity: Activity | undefined;
    closeForm: () => void;
}

export default function ActivityForm({Activity, closeForm}: Props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDeleteClick = () => {
        // Show the confirm dialog when delete is triggered
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
    };
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title"/>
                <Form.TextArea placeholder="Description"/>
                <Form.Input placeholder="Category"/>
                <Form.Input placeholder="Date"/>
                <Form.Input placeholder="City"/>
                <Form.Input placeholder="Venue"/>
                <Button floated="right" positive type="button" content="Submit" onClick={handleDeleteClick}/>
                <Button floated="right" type="button" content="Cancel" onClick={closeForm}/>
            </Form>
            <ConfirmDialog
                message="Are you sure you want to delete this item?"
                onConfirm={handleConfirm}
                dialogVisible={showConfirmDialog}
                closeDialog={handleCancel}
            />
        </Segment>
    )
}