const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			process.env.MONGO_URI
		);
		console.log(
			`MongoDB Connected: ${conn.connection.host}`
				.rainbow.bold.italic.underline
		);
	} catch (err) {
		console.error(
			`Error: ${err.message}`.red.bold
		);
		process.exit();
	}
};

module.exports = connectDB;
