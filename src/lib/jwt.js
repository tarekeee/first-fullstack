import jwt from "jsonwebtoken";
export function signJWTtoken(payload,options = {expiresIn : "1h"}) {
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload,secret,options);
    return token;
}

export function verifyJWT(token) {
    try {

    const secret = process.env.SECRET_KEY;
    const decoded = jwt.verify(token,secret);
    return decoded;
}
    catch (e) {
        console.log(e);
    }
}