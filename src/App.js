
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import Styles from './app.module.scss';
import EventRegisterScreen from './screens/EventRegisterScreen/EventRegisterScreen';
import EventListScreen from './screens/EventListScreen/EventListScreen';
import AddEventScreen from './screens/AddEventScreen/AddEventScreen';
import EventDetailScreen from './screens/EventDetailScreen/EventDetailScreen';
import VolunteerListScreen from './screens/VolunteerListScreen/VolunteerListScreen';
import AddVolunteerScreen from './screens/AddVolunteerScreen/AddVolunteerScreen';
import ParticipantListScreen from './screens/ParticipantListScreen/ParticipantListScreen';
import UserRegisterScreen from './screens/UserRegisterScreen/UserRegisterScreen';
import UserLoginScreen from './screens/UserLoginScreen/UserLoginScreen';

const App = () => {
  return (
    <Router>
      <div className={Styles.Container}>
        <header className={Styles.Header}>
          <Header/>
        </header>
        
        <div className={Styles.Content}>
          <aside className={Styles.Sidebar}>
            <Sidebar/>
          </aside>
          <main className={Styles.Main}>
            <Switch>
            <Route path='/event/:id/register/' component={EventRegisterScreen}/>
            <Route path='/event/:id' component={EventDetailScreen}/>
            <Route path='/events/' component={EventListScreen}/>
            <Route path='/volunteers' component={VolunteerListScreen}/>
            <Route path='/participants' component={ParticipantListScreen}/>
            <Route path='/register' component={UserRegisterScreen}/>
            <Route path='/login' component={UserLoginScreen}/>
            <Route path='/addevent' component={AddEventScreen}/>
            <Route path='/addvolunteer' component={AddVolunteerScreen}/>
            <Route path='/' component={EventListScreen}/>
            </Switch>
          </main>
        </div>
     </div>
    </Router>
  )
}

export default App;
