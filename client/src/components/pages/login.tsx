import { useEffect, useState } from "react";
import Button from "../reusable/button";
import { Link, useNavigate } from "react-router-dom";
import LoginDetailsType from "../../types/general/loginDetailsType";
import postLoginDetailsToGetUser from "../../services/user/postLoginDetailsToGetUser";
import useContextStore from "../context/cartContext";
import useUserAuthContext from "../context/userContext";

type ErrorType = {
  email: string;
  password: string;
};

const initialDetails: LoginDetailsType = {
  email: "",
  password: "",
};

const initialErrorDetails: ErrorType = {
  email: "",
  password: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailRegex = new RegExp(EMAIL_REGEX)

const LoginPage = () => {
  const [userDetails, setUserDetails] =
    useState<LoginDetailsType>(initialDetails);
  const [errorDetails, setErrorDetails] =
    useState<ErrorType>(initialErrorDetails);
  const contextStore = useContextStore()
  const {loginAndSignup, loggedIn} = useUserAuthContext()
  const navigate = useNavigate();

  useEffect(()=> {
    if(loggedIn){
      navigate("/", {replace: true})
    }
  }, [loggedIn, navigate])

  const handleEmailChange = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
    setErrorDetails({...errorDetails, email: ""})
  };
  const handlePasswordChange = (e) => {
    setUserDetails({ ...userDetails, password: e.target.value });
    setErrorDetails({...errorDetails, password: ""})
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(userDetails.email === ""){
        setErrorDetails({...errorDetails, email: "Please provide email"})
        return;
    }
    if(userDetails.password === ""){
        setErrorDetails({...errorDetails, password: "Please provide password"})
        return;
    }
    if(!emailRegex.test(userDetails.email)){
        setErrorDetails({...errorDetails, email: "Invalid email"})
        return;
    }
    const responseData = await postLoginDetailsToGetUser(userDetails);
    if(responseData.message.includes("error")){
      contextStore.setAlertMessages(prev => [...prev, {message: responseData.message, boxType: "failure"}]);
      return;
    }
    await loginAndSignup(responseData.message);
    navigate("/", { replace: true });

  };
  return (
    <section className="flex flex-col items-center py-4">
      <p className="font-semibold text-customBlue  sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
        Login
      </p>
      <form
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[80vw] my-4 p-4 bg-lightWhite  border border-lightBlue rounded-md sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
      >
        <label className="flex flex-col w-full py-2">
          <div className="flex flex-col">
            <span className="font-medium">Email</span>
            <input
              type="email"
              value={userDetails.email}
              onChange={handleEmailChange}
              className="bg-lightWhite border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter email"
            />
          </div>
          <p className="text-xs text-red-500">
            {errorDetails?.email != "" && errorDetails?.email}
          </p>
        </label>
        <label className="flex flex-col w-full py-2">
          <div className="flex flex-col">
            <span className="font-medium">Password</span>
            <input
              type="password"
              value={userDetails.password}
              onChange={handlePasswordChange}
              className="bg-lightWhite border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter password"
            />
          </div>
          <p className="text-xs text-red-500">
            {errorDetails?.password != "" && errorDetails?.password}
          </p>
        </label>
        <Button type="submit" content="Login" classNames="!mt-2" />
        <div className="flex w-full justify-center space-x-1">
        <p>Don't have an account?</p>
        <Link to={"/signup"} className="underline">Signup</Link>
      </div>
      </form>
    </section>
  );
};

export default LoginPage;
