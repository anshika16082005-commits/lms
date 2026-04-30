import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const user = await User.findById(userId);
    if (user.role === "student") {
      return NextResponse.json(
        { message: "Only instructors are allowed" },
        { status: 403 },
      );
    }
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Course details fetched successfully",
      data: course,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
