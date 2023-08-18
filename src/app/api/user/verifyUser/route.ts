import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helper/getTokenData";

connectDB();
export const POST = async (req: NextRequest) => {
  try {
    const userId = getTokenData(req);

    console.log(userId);
    const token = await bcrypt.hash(userId, 10);

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { verifyToken: token, verifyTokenExpiry: Date.now() + 86400000 },
      { new: true }
    );
    console.log(user);

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
      subject: "Hello ✔",
      text: "Hello world?",
      html: `<p> Not verified? Click here to get verified <a href=${process.env.DOMAIN}/verifyuser?token=${token}>Verify</a> </p>`,
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
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.verifyToken = "";
    user.verifyTokenExpiry = undefined;
    user.isVerfied = true;
    await user.save();

    return NextResponse.json({ message: "User verified" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }
};
