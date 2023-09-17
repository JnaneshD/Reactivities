import React, { Fragment, useEffect, useState } from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Puff } from 'react-loader-spinner';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // this will be called when the application loads because we do not have anything in the parameters and dependencies. 
    // Also if we dont have a condition it will keep on firing the requests so to avoid that behavior 
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setFormLoaded(true);
        //setLoading(true);

    })
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
    setEditMode(false);
  }
  // here create the functions that will take care of the Edit form visibility
  function handleFormOpen(id?: string) {
    console.log(id);
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    // Check the presence of activity ID
    activity.id ? setActivities([...activities.filter(x => x.id = activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string)
  {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>

      {loading ? (
        <div>
          <Container style={{ marginTop: '7em' }}>
            <Header as="h1" content="Reactivities" icon="users" />
            <ActivityDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              selectActivity={handleSelectActivity}
              cancelSelectActivity={handleCancelSelectActivity}
              editMode={editMode}
              openForm={handleFormOpen}
              closeForm={handleFormClose}
              createOrEdit={handleCreateOrEditActivity} 
              deleteActivity={handleDeleteActivity}/>
          </Container>
        </div>
      ) :
        // <Segment textAlign='center' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //   <Puff
        //     height="80"
        //     width="80"
        //     radius={1}
        //     color="#4fa94d"
        //     ariaLabel="puff-loading"
        //     wrapperStyle={{}}
        //     wrapperClass=""
        //     visible={true}
        //   />
        // </Segment>
        <LoadingComponent content='Loading app'/>
      }
    </Fragment>
  );
}

export default App;
