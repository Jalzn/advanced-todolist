import { Meteor } from "meteor/meteor"
import {useTracker} from "meteor/react-meteor-data"
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  const user = useTracker(() => Meteor.user())

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
};
