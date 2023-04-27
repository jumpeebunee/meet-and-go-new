import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Redirect, Route } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from '../pages/Chat/Chat'

const AppNavigation = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/home">
        <Home/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route exact path="/chat">
        <Chat/>
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </IonRouterOutlet>
  )
}

export default AppNavigation