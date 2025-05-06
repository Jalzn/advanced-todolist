import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const currentUser = useTracker(() => Meteor.user());

  const isAuthenticated = !!currentUser;

  const logout = () => {
    Meteor.logout((err) => {
      if (!err) {
        navigate("/login");
      }
    });
  };

  return {
    currentUser,
    isAuthenticated,
    logout,
  };
};
