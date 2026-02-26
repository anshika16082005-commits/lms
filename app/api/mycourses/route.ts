import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { instructor } = reqBody;
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
