import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  profilePic: z.string().optional().default(""),
  nationality: z.string().optional().default(""),
  gender: z.enum(["Male", "Female", "Other"]).optional().default("Male"),
  spokenLanguage: z.string().optional().default("English"),
  bankDetails: z.object({}).optional(),
  phone: z.string().min(1, "Phone number is required"),
  myRequests: z.array(z.string()).optional(),
  myUpcommingRequests: z.array(z.string()).optional(),
  declinedRequests: z.array(z.string()).optional(),
  address: z.string().optional().default(""),
  password: z.string().min(1, "Password is required"),
  isVerified: z.boolean().optional().default(true),
  role: z.enum(["Owner", "Traveller", "Admin"]).optional().default("Owner"),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordTokenExpiry: z.date().optional(),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
  otpToken: z.number().optional(),
  otpTokenExpiry: z.date().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
