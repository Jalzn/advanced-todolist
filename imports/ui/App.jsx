import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
