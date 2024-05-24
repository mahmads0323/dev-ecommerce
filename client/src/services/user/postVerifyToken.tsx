const POST_USER_VERIFY_TOKEN_API =
  import.meta.env.POST_USER_VERIFY_API || "http://localhost:8000/user/verify";
const postVerifyToken = async (token: string) => {
    const response = await fetch(POST_USER_VERIFY_TOKEN_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
    })
    return response.json();
};

export default postVerifyToken;
