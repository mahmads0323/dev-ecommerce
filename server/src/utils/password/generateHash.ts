import crypto from "crypto"

const GenerateHash = (password: string)=>{
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return {salt, hash};
}

export default GenerateHash;