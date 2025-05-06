import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-4">
        <RegisterForm />
        <div className="text-gray-600 text-center text-sm">
          <Link to="/login">Já possuo uma conta</Link>
        </div>
      </div>
    </div>
  );
};
