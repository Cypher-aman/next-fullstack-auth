import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded.id;
  } catch (error: any) {
    throw new Error(error);
  }
};
