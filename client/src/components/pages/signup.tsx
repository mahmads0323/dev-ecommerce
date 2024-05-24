import { useEffect, useState } from "react";
import Button from "../reusable/button";
import { Link, useNavigate } from "react-router-dom";
import SignupDetailsType from "../../types/general/signupDetailsType";
import postUser from "../../services/user/postUser";
import useContextStore from "../context/cartContext";
import useUserAuthContext from "../context/userContext";

type ErrorType = {
  name: string;
  email: string;
  password: string;
  confimPassword: string;
};

const initialDetails: SignupDetailsType = {
  name: "",
  email: "",
  password: "",
};

const initialErrorDetails: ErrorType = {
  name: "",
  email: "",
  password: "",
  confimPassword: "",
};

const EMAIL_REGEX =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
const emailRegex = new RegExp(EMAIL_REGEX)
const passwordRegex = new RegExp(PASSWORD_REGEX)

const SignupPage = () => {
  const [userDetails, setUserDetails] =
    useState<SignupDetailsType>(initialDetails);
  const [errorDetails, setErrorDetails] =
    useState<ErrorType>(initialErrorDetails);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const contextStore = useContextStore();
  const {loginAndSignup, loggedIn} = useUserAuthContext()

  useEffect(()=> {
    if(loggedIn){
      navigate("/", {replace: true})
    }
  }, [loggedIn, navigate])

  const handleNameChange = (e) => {
    setUserDetails({ ...userDetails, name: e.target.value });
    setErrorDetails({...errorDetails, name: ""})
  };
  const handleEmailChange = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
    setErrorDetails({...errorDetails, email: ""})
  };
  const handlePasswordChange = (e) => {
    if (e.target.value !== confirmPassword) {
      setErrorDetails({
        ...errorDetails,
        confimPassword: "password do not match",
      });
    } else {
      setErrorDetails({ ...errorDetails, confimPassword: "" });
    }
    setUserDetails({ ...userDetails, password: e.target.value });
    setErrorDetails({...errorDetails, password: ""})
  };
  const handleConfirmPassword = (e) => {
    if (e.target.value !== userDetails.password) {
      setErrorDetails({
        ...errorDetails,
        confimPassword: "password do not match",
      });
    } else {
      setErrorDetails({ ...errorDetails, confimPassword: "" });
    }
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(userDetails.name === ""){
        setErrorDetails({...errorDetails, name: "Please provide name"})
        return;
    }
    if(userDetails.email === ""){
        setErrorDetails({...errorDetails, email: "Please provide email"})
        return;
    }
    if(userDetails.password === ""){
        setErrorDetails({...errorDetails, password: "Please provide password"})
        return;
    }
    if(confirmPassword === ""){
        setErrorDetails({...errorDetails, confimPassword: "Please confirm password"})
        return;
    }
    if(!emailRegex.test(userDetails.email)){
        setErrorDetails({...errorDetails, email: "Invalid email"})
        return;
    }
    if(!passwordRegex.test(userDetails.password)){
        setErrorDetails({...errorDetails, password: "password must include symbols, numbers, uppercase and lowercase letters"});
        return;
    }
    const responseData = await postUser(userDetails);
    if(responseData.message.includes("error")){
      contextStore.setAlertMessages(prev => [...prev, {message: responseData.message, boxType: "failure"}]);
      return;
    }
    await loginAndSignup("token",  responseData.message);
    navigate("/", {replace: true})
  };
  return (
    <section className="flex flex-col items-center py-4">
      <p className="font-semibold text-customBluesm:text-xl md:text-2xl md:font-bold lg:text-3xl">
        Signup
      </p>
      <form
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[80vw] my-4 p-4 bg-lightWhite  border border-lightBlue rounded-md sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
      >
        <label className="flex flex-col w-full py-2">
          <div className="flex flex-col">
            <span className="font-medium">Name</span>
            <input
              type="text"
              value={userDetails.name}
              onChange={handleNameChange}
              className="bg-lightWhite border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter name"
            />
          </div>
          <p className="text-xs text-red-500">
            {errorDetails?.name != "" && errorDetails?.name}
          </p>
        </label>
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
        <label className="flex flex-col w-full py-2">
          <div className="flex flex-col">
            <span className="font-medium">Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="bg-lightWhite border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Confirm password"
            />
          </div>
          <p className="text-xs text-red-500">
            {errorDetails?.confimPassword != "" && errorDetails?.confimPassword}
          </p>
        </label>
        <Button type="submit" content="Signup" classNames="!mt-2" />
        <div className="flex w-full justify-center space-x-1">
        <p>Already have an account?</p>
        <Link to={"/Login"} className="underline">Login</Link>
      </div>
      </form>
    </section>
  );
};

export default SignupPage;
