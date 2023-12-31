import React, { ChangeEvent, useEffect, useState } from "react";
import { Button,  FormField,  Header,  Label,  Segment } from "semantic-ui-react";
import ConfirmDialog from "../details/ConfirmDialog";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { values } from "mobx";
import * as Yup from 'yup';
import MyTextInput from "./MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./SelectInput";
import { categoryOptions } from "../options/categoryOptions";
import MyDateInput from "./MyDateInput";

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
        date: null,
        city: ''
    });
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('category is required'),
        date: Yup.string().required('date is required'),
        venue: Yup.string().required('venue is required'),
        city: Yup.string().required('city is required')
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // function handleFormSubmit() {
    //     setShowConfirmDialog(true);
        
    // };

    // const handleCancel = () => {
    //     // Hide the confirm dialog when canceled
    //     setShowConfirmDialog(false);
    // };

    const handleFormSubmit = (activity: Activity) => {
        // Handle the delete action here
        // This is where you would perform the actual delete logic
        // After that, you can hide the dialog
        //setShowConfirmDialog(false);
        if (activity.id.length === 0 )
        {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        }
        else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        //activity.id? updateActivity(activity) : createActivity(activity);
    };
    // function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
    //    const {name, value} = event.target;
    //    setActivity({...activity, [name]: value}) 
    // }; 
    if (loadingInitial) return <LoadingComponent content="Loading"/>
    return (
        <Segment clearing>
            <Header content="Activty Details" sub color='teal'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
                    <MyTextInput placeholder="Title" name="title" />
                    <MyTextArea rows={3} placeholder="Description" name="description" />
                    <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                    <MyDateInput 
                        placeholderText="Date"
                        name='date'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        />
                    <Header content="Location Details" sub color="teal"/>
                    <MyTextInput placeholder="City" name="city" />
                    <MyTextInput placeholder="Venue" name="venue" />
                    <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit"/>
                    <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
                    </Form>
                )
                }
            </Formik>
            
            {/* <ConfirmDialog
                message="Are you sure you want to edit this item?"
                onConfirm={() => console.log('test')}
                dialogVisible={showConfirmDialog}
                closeDialog={handleCancel}
            /> */}
        </Segment>
    )
})