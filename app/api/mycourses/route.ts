import { connect } from "@/dbConfig/dbConfig";
import cloudinary from "@/lib/cloudinary";
import Course from "@/models/courseModel";
import User from "@/models/users";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connect();

//Note:For student dashboard
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const user = await User.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.role === "student") {
      const enrolledCourses = await Course.find({
        enrolledStudents: userId,
      });
      console.log("Enrolled Courses:", enrolledCourses);
      return NextResponse.json({
        message: "Got enrolled courses",
        success: true,
        data: enrolledCourses,
      });
    }
    if (user.role === "instructor") {
      const allCreatedCourses = await Course.find({ instructor: userId });
      if (!allCreatedCourses) {
        return NextResponse.json({ error: "No course found" }, { status: 400 });
      }

      const response = NextResponse.json({
        message: "Got all created courses",
        success: true,
        data: allCreatedCourses,
      });
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    //TODO: Delete the course and remove the course from the user's enrolled courses list.

    const userId = request.headers.get("x-user-id");
    const user = await User.findById(userId);

    if (user.role === "student") {
      return NextResponse.json({ message: "Only instructors are allowed" });
    }
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const course = await Course.findByIdAndDelete(courseId);
    if (course.thumbnail.public_id !== undefined) {
      await cloudinary.uploader.destroy(course.thumbnail.public_id);
    }
    // const createdBy = request.headers.get("x-user-id");
    // await User.findByIdAndUpdate(createdBy, {
    //   $pull: { createdCourses: courseId },
    // });
    return NextResponse.json({
      message: "Course deleted successfully",
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
