import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateAccessToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn
        } as SignOptions
    );

    return token;
}

export const verifyAccessToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    } catch (error: any) {
        console.log("Token verification failed:", error);
        return {
            success: false,
            error: error.message
        }
    }
}