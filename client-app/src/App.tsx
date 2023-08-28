import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Container, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // this will be called when the application loads because we do not have anything in the parameters and dependencies. 
    // Also if we dont have a condition it will keep on firing the requests so to avoid that behavior 
    axios.get("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    })
  }, []);

  return (
    <Container>
      <div>
        <Header as="h1" content="Reactivities" icon="users"/>
        <List>
          {activities.map((activity: any) =>( 
            <List.Item key={activity.id}>
              {activity.title}
              </List.Item>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default App;
