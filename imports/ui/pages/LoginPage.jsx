import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-4">
        <LoginForm />
        <div className="text-gray-600 text-center text-sm">
          <Link to="/register">Ainda nao tenho conta</Link>
        </div>
      </div>
    </div>
  );
};
