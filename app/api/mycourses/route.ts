import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import User from "@/models/users";
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
      data: allcourses,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findByIdAndDelete(courseId);
    const createdBy = request.headers.get("x-user-id");
    await User.findByIdAndUpdate(createdBy, {
      $pull: { createdCourses: courseId },
    });
    return NextResponse.json({
      message: "Course deleted successfully",
      data: course,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function UPDATE(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findByIdAndUpdate(courseId, {});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
