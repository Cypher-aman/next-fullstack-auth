import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helper/getTokenData";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { password, email } = reqBody;

    console.log(password);
    const token = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email },
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const info = await transport.sendMail({
      from: "admin@example.com",
      to: `${user.email}`,
      subject: "Reset Password",
      text: "Reset Password",
      html: `<p> Someone has requested a password reset. If this was you, click here to reset your password <a href=${process.env.DOMAIN}/verifyResetToken?token=${token}>Reset Password</a> .And if this was not you, please ignore this email</p>`,
    });

    return NextResponse.json(
      { message: "Token sent successfull" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    console.log(token);
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.forgotPasswordToken = "";
    user.forgotPasswordTokenExpiry = undefined;
    user.password = token;
    await user.save();

    return NextResponse.json(
      { message: "Password Reset Successfull" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }
};
