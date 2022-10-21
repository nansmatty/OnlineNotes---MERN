const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const {
	errorHandler,
	notFound,
} = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(
	cors({
		origin:
			"https://curious-cactus-5b7831.netlify.app",
	})
);

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//---------------------------deployment code-----------------------------------//

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(
		express.static(
			path.join(__dirname, "/frontend/build")
		)
	);

	app.get("*", (req, res) =>
		res.sendFile(
			path.resolve(
				__dirname,
				"frontend",
				"build",
				"index.html"
			)
		)
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}
//---------------------------deployment code----------------------------------//

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server started on PORT: ${PORT}`)
);
