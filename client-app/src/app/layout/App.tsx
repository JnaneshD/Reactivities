import React, { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Header, Container, List, Loader, Segment } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Puff } from 'react-loader-spinner';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    // this will be called when the application loads because we do not have anything in the parameters and dependencies. 
    // Also if we dont have a condition it will keep on firing the requests so to avoid that behavior 

    axios.get("http://localhost:5000/api/activities").then(response => {
      setTimeout(() => {
        setActivities(response.data);
        setFormLoaded(true);
      }, 1000);

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

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>

      {formLoaded ? (
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
              closeForm={handleFormClose} />
          </Container>
        </div>
      ) :
        <Segment textAlign='center' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Segment>
      }
    </Fragment>
  );
}

export default App;
