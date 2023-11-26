import express from "express";
import cors from "cors";
import { errorResponse, successResponse } from "./utils/libs/response.js";

const app = express();

// get routes
import routes from "./routes/index.js";
import { StatusCodes } from "http-status-codes";
import connection from "./config/db.js";

// setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mount route
app.use("/v1", routes)

// index route
app.get("/", (req, res) => {
	return successResponse(res, "Welcome to Daily Tracker Backend service 🚀");
})

// handle 404 routes
app.all("*", async(req, res, next) => {
	return errorResponse(res, `Resource ${req.originalUrl} does not exist`, StatusCodes.NOT_FOUND)
})

// handle global error 
app.use((error, req, res, next) => {
	const message = (process.env.NODE_ENV === "development") ? error.message : "something went wrong";
	return errorResponse(res, message, StatusCodes.INTERNAL_SERVER_ERROR);
})

export default app;