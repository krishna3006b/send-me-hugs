"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Withdrawal = exports.Raising = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, "Enter First Name"] },
    lastName: { type: String, required: [true, "Enter last Name"] },
    email: { type: String, required: [true, "Enter Email"], unique: true, validate: [(email) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email); }, "Please enter a valid email"] },
    password: { type: String, required: [true, "Enter Password"], minlength: [8, "Password must be atleast 8 characters long"] },
    token: { type: String },
    dp: { type: String },
    fundraisings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Raising", default: [] }],
    walletAddress: { type: String },
    withdrawals: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Withdrawal' }],
    location: { type: String },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
const raisingSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    title: { type: String, required: [true, "Enter title"] },
    story: { type: String, required: [true, "Enter story"] },
    thumbnail: { type: String },
    amount: { type: Number, required: [true, 'Enter amount required'] },
    fundraisingFor: { type: String },
    category: { type: String },
    location: { type: String },
    walletAddress: { type: String },
    id: { type: String },
    address: { type: String },
    user: { type: String },
    donors: [{
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            amount: { type: Number, required: true },
            donatedAt: { type: Date, default: Date.now },
            status: { type: String, enum: ['Received', 'Pending', 'Cancelled'], default: 'Received' }
        }],
    images: [
        { type: String }
    ],
    certificate: { type: String },
    amountDonated: { type: Number, default: 0 },
    role: { type: String, enum: ["NGO", "Individual"], default: "Individual" },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    amountWithdrawn: { type: Number, default: 0 }
    // documents: [
    //     { type: String }
    // ],
});
exports.Raising = (0, mongoose_1.model)("Raising", raisingSchema);
const withdrawalSchema = new mongoose_1.Schema({
    amount: { type: Number, required: [true, 'Enter amount'] },
    fundraising: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Raising', required: [true, 'Enter fundraising'] },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    date: { type: Date, default: Date.now },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: [true, 'Enter user'] }
});
// Export the model
exports.Withdrawal = (0, mongoose_1.model)('Withdrawal', withdrawalSchema);
