const mongoose = require("mongoose");

async function setupMongoose() {
	await mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", console.log.bind(console, "Db Connected!"));
}

module.exports = setupMongoose;
