import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    selectedActivity: Activity | undefined;
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}


export default function ActivityDashboard({ activities, selectActivity, cancelSelectActivity, selectedActivity,
    editMode, openForm, closeForm }: Props) {
    return (
        <Grid celled>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} cancelSelectActivity={cancelSelectActivity}></ActivityList>
            </Grid.Column>
            <GridColumn width="6">
                {selectedActivity && !editMode && <ActivityDetail activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm}/>}
                {editMode && <ActivityForm closeForm={closeForm} Activity={selectedActivity}/>}
            </GridColumn>
        </Grid>
    )
}