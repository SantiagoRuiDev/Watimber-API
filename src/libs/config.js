import { config } from "dotenv";

config();

export default {
    URI: process.env.MONGO_URI || "mongodb://localhost/notesdb",
    PORT: process.env.PORT || process.env.DEVELOPMENT_PORT,
    SECRET: process.env.SECRET || "",
    USERNAME: process.env.USERBASE_NAME || "",
    EMAIL: process.env.USERBASE_EMAIL || "",
    PASSWORD: process.env.USERBASE_PASSWORD || "",
    PRODUCTION: process.env.PRODUCTION == "true" ? true : false
}