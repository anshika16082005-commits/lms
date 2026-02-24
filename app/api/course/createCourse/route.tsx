import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, instructor, description, duration, level, category } =
      reqBody;
    //validation
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

    const response = NextResponse.json({
      message: "New Course created successfully",
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
