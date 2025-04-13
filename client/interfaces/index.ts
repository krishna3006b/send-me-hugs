export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  walletAddress?: string;
  password?: string;
  dp?: string;
  amount?: number;
  token?: string;
  donatedAt?: Date;
  status?: string;
  withdrawals?:any[]
  fundraisings?:Fundraising[]
}

export interface Fundraising {
  email: string;
  title: string;
  story: string;
  thumbnail: string;
  amount: number;
  amountDonated: number;
  fundraisingFor: string;
  category: string;
  location: string;
  id: string;
  role: string;
  createdAt?: Date;
  isCompleted?: boolean;
  images?: string[];
  donors?: User[];
  amountWithdrawn?: number;
  walletAddress?:string;
}

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cPassword: string;
  walletAddress:string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type forgotPasswordData = {
  password: string;
  cPassword: string;
};

export type GetInTouchData = {
  name: string;
  email: string;
  message: string;
};

export interface formData {
  title: string;
  amount: number;
  thumbnail: string | null;
  category: string;
  story: string;
  // youtube: string;
  country: string;
  pincode: string;
  fundraisingFor?: string;
}

export interface FormState {
  title: string;
  walletAddress: string;
  description: string;
  thumbnail: File | null;
  images: File[];
  totalAmount: number;
  role: "NGO" | "Individual";
  amountDonated?: number;
  address?: string;
  name?: string;
  email?: string;
}

export interface RaisingState {
  title: string;
  walletAddress: string;
  description: string;
  thumbnail: string;
  images: string[];
  amountDonated: number;
  totalAmount: number;
  role: "NGO" | "Individual";
  address?: string;
  name?: string;
  email?: string;
  id: string;
}