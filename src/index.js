// It's best practice to import and configure dotenv at the very top
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"; // FIX 1: Added .js extension for ES Modules
import express from "express";

const app = express();

(async () => {
    try {
        // Wait for the mongoose connection to be established
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${mongoose.connection.host}`);

        // FIX 2: Corrected the event name from "error:" to "error"
        app.on("error", (error) => {
            console.log("EXPRESS APP ERROR: ", error);
            // It's better to just log this than to re-throw, as the server is running
        });

        // Start listening for requests only after the DB is connected
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on PORT: ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("MONGODB CONNECTION FAILED: ", error);
        // FIX 3: Changed "throw err" to "throw error" to use the caught variable
        // It's good practice to exit the process if the database connection fails
        process.exit(1);
    }
})();

