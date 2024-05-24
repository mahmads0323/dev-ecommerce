import crypto from "crypto"

const VerifyHash = (password: string, hashToVerify: string, salt: string)=>{
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === hashToVerify;
}

export default VerifyHash;