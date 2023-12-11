import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

try {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(
			`🚀 Daily Tracker service is ready at http://localhost:${port}`
		);
	});
} catch (error) {
	console.log("Error ==>", error);
	process.exit(1);
}
