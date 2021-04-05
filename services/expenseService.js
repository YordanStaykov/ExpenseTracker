const Expense = require('../models/Expense');
const User = require('../models/User');
const validCategories = ["advertising",
    "benefits",
    "car",
    "equipment",
    "fees",
    "home-office",
    "insurance",
    "interest",
    "Labor",
    "maintenance",
    "materials",
    "meals-and-entertainment",
    "office-supplies",
    "other",
    "professional-services",
    "rent",
    "taxes",
    "travel",
    "utilities"
]

const getAll = async () => {
    let expenses = await Expense.find({}).lean();

    return expenses;
};

const getOne = async (id) => {
    let expense = await Expense.findById(id);

    return expense;
};

const create = async (expenseData) => {
    if (expenseData.total < 0) {
        throw { message: 'Total should be greater than 0!' };
    };

    if (!validCategories.includes(expenseData.category)) {
        throw { message: 'No such category!' };
    }

    let expense = new Expense(expenseData);
    let user = await User.findById(expense.user);
    user.expenses.push(expense._id)

    await expense.save()
    await user.save()
    return;
};

const deleteOne = async (id) => {
    return await Expense.findByIdAndDelete(id);
};

const refillAmount = async (userId, amount) => {
    let user = await User.findById(userId);

    user.amount += Number(amount);

    return await user.save();
};

const getTotalForUser = async (userId) => {
    let user = await User.findById(userId).populate('expenses').lean();

    let userAmount = user.amount;
    let expensesAmount = 0;
    let merches = 0;

    user.expenses.forEach(x => {
        expensesAmount += x.total;
        merches++;
    });

    return { expensesAmount, merches, userAmount };
}


module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    refillAmount,
    getTotalForUser
}