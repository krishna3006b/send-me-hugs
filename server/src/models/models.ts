import { model, Mongoose, Schema } from 'mongoose';
import { IRaising, IUser, IWithdraw } from '../types';
import { boolean, string } from 'zod';

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: [true, "Enter First Name"] },
    lastName: { type: String, required: [true, "Enter last Name"] },
    email: { type: String, required: [true, "Enter Email"], unique: true, validate: [(email: string) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) }, "Please enter a valid email"] },
    password: { type: String, required: [true, "Enter Password"], minlength: [8, "Password must be atleast 8 characters long"] },
    token: { type: String },
    dp: { type: String },
    fundraisings: [{ type: Schema.Types.ObjectId, ref: "Raising", default: [] }],
    walletAddress: { type: String },
    withdrawals: [{ type: Schema.Types.ObjectId, ref: 'Withdrawal' }],
    location: { type: String },
})

export const User = model<IUser>("User", userSchema);

const raisingSchema = new Schema<IRaising>({
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
        user: { type: Schema.Types.ObjectId, ref: "User" },
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

export const Raising = model<IRaising>("Raising", raisingSchema);

const withdrawalSchema = new Schema<IWithdraw>({
    amount: { type: Number, required: [true, 'Enter amount'] },
    fundraising: { type: Schema.Types.ObjectId, ref: 'Raising', required: [true, 'Enter fundraising'] },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Enter user'] }
});

// Export the model
export const Withdrawal = model<IWithdraw>('Withdrawal', withdrawalSchema);