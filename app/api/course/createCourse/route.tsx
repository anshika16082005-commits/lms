import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const instructor = request.headers.get("x-user-id");
    const reqBody = await request.json();
    const { title, description, duration, level, category } = reqBody;
    //validation
    console.log("create course instructor id :", instructor);
    console.log(reqBody);
    const duplicate = await Course.findOne({ title, instructor });
    if (duplicate) {
      return NextResponse.json(
        { error: "Course already exists" },
        { status: 400 },
      );
    }
    console.log("Course does not exist already");

    const newCourse = new Course({
      title,
      description,
      category,
      level,
      instructor,
      duration,
    });

    const savedCourse = await newCourse.save();
    // creator.createdCourses.append(savedCourse._id);
    console.log(savedCourse, "from : create-course");
    const response = NextResponse.json({
      message: "New Course created successfully",
      success: true,
      savedCourse,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
