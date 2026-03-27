import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { title, description } = body;
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { modules: { title, description } } },
      { new: true },
    );

    return NextResponse.json({
      message: "Module added successfully",
      data: updatedCourse,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId).populate(
      "instructor",
      "name email",
    );
    return NextResponse.json({
      message: "Course details fetched successfully",
      data: course,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function UPDATE() {
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
