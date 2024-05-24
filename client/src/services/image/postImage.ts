
const POST_IMAGE_API = import.meta.env.IMAGE_API || "http://localhost:8000/image";
const postImage = async(productImageRef:any)=>{
    const formData = new FormData();
    formData.append("productImage", productImageRef.current.files[0]);
    
    const response = await fetch(POST_IMAGE_API, {
        method: "POST",
        body: formData,
    })
    return response.json();
}

export default postImage;