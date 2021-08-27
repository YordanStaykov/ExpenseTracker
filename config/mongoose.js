const mongoose = require("mongoose");

async function setupMongoose() {
	try {
		await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	} catch (error) {
		console.log(error);
	}

	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", console.log.bind(console, "Db Connected!"));
}

module.exports = setupMongoose;
