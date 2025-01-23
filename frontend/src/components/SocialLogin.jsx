import React, { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import AuthProvider from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } = useContext(AuthContext);
const navigate = useNavigate();
const location = useLocation();
const from = location?.state?.from?.pathname || "/";

const googleSignUp = () => {
  signUpWithGoogle()
    .then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Google Sign Up Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("login").close();
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
};

const githubSignUp = () => {
  signUpWithGithub()
    .then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Github Sign Up Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("login").close();
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
};

const facebookSignUp = () => {
  signUpWithFacebook()
    .then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Facebook Sign Up Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("login").close();
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
};

const SocialLogin = () => {
  return (
    <div className="text-center space-x-3 mb-5">
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGoogle className="w-6 h-6" onClick={googleSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGithub className="w-6 h-6" onClick={githubSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaFacebook className="w-6 h-6" onClick={facebookSignUp} />
      </button>
    </div>
  );
};

export default SocialLogin;
