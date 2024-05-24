import LoginDetailsType from "../../types/general/loginDetailsType"

const POST_LOGIN_DETAILS_TO_GET_USER_API = import.meta.env.LOGIN_USER_API || "http://localhost:8000/user/login"

const postLoginDetailsToGetUser = async(signUpDetails: LoginDetailsType)=>{
    const userDetails:LoginDetailsType = {
        email: signUpDetails.email,
        password: signUpDetails.password,
    }
    const response = await fetch(POST_LOGIN_DETAILS_TO_GET_USER_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userDetails: userDetails})
    })
    return response.json()
}

export default postLoginDetailsToGetUser;