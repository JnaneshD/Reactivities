import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilter";



export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    
    useEffect(() => {
        if(activityRegistry.size === 0) loadActivities();
    }, [activityRegistry.size, loadActivities])
    if (activityStore.loadingInitial) return <LoadingComponent content="Meh"/>
    return (
        <Grid celled>
            <Grid.Column width='10' >
                <ActivityList ></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})