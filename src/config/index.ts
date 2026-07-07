import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_SECRET_IN,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_key: process.env.STRIPE_WEBHOOK_KEY
}

export default config;