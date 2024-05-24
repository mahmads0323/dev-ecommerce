import SignupDetailsType from "../../types/general/signupDetailsType"

const POST_USER_API = import.meta.env.POST_USER_API || "http://localhost:8000/user"

const postUser = async(signUpDetails: SignupDetailsType)=>{
    const userDetails:SignupDetailsType = {
        name: signUpDetails.name,
        email: signUpDetails.email,
        password: signUpDetails.password,
    }
    const response = await fetch(POST_USER_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userDetails: userDetails})
    })
    return response.json()
}

export default postUser;