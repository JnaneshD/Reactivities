import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid celled>
            <Grid.Column width='10'>
                <ActivityList ></ActivityList>
            </Grid.Column>
            <GridColumn width="6">
                {selectedActivity && !editMode && <ActivityDetail />}
                {editMode && <ActivityForm/>}
            </GridColumn>
        </Grid>
    )
})