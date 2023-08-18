import { connectDB } from "@/dbConfig/dbConfg";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helper/getTokenData";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = getTokenData(req);
    const user = await User.findById(userId).select("-password");

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
