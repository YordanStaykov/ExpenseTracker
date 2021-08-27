const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			default: 0,
		},
		expenses: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Expense",
			},
		],
	},
	{
		capped: { size: 1024 },
		bufferCommands: false,
		autoCreate: false, // disable `autoCreate` since `bufferCommands` is false
	}
);

module.exports = mongoose.model("User", userSchema);
