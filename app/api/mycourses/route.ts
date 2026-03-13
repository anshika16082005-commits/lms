import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const instructor = request.headers.get("x-user-id");
    const allcourses = await Course.find({ instructor });
    if (!allcourses) {
      return NextResponse.json({ error: "No course found" }, { status: 400 });
    }

    const response = NextResponse.json({
      message: "Got all courses",
      success: true,
      allcourses,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
