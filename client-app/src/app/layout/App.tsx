import React, { Fragment, useEffect } from 'react';
import { Header, Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await activityStore.loadActivities();
    };

    fetchData();
  }, [activityStore]);


  return (
    <Fragment>
      <NavBar />

      {activityStore.loadingInitial === false ? (
        <div>
          <Container style={{ marginTop: '7em' }}>
            <Header as="h1" content="Reactivities" icon="users" />
            <ActivityDashboard/>
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

export default observer(App);
