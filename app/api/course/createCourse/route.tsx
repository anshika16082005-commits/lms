import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import User from "@/models/users";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const instructor = request.headers.get("x-user-id");
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const level = formData.get("level") as string;
    const category = formData.get("category") as string;
    const thumbnail = formData.get("thumbnail") as File | null;

    const duplicate = await Course.findOne({ title, instructor });
    if (duplicate) {
      return NextResponse.json(
        { error: "Course already exists" },
        { status: 400 },
      );
    }

    const newCourse = new Course({
      title,
      description,
      category,
      level,
      instructor,
      duration,
      thumbnail,
    });

    const savedCourse = await newCourse.save();
    await User.findByIdAndUpdate(instructor, {
      $push: {
        createdCourses: savedCourse._id,
      },
    });

    const response = NextResponse.json({
      message: "New Course created successfully",
      success: true,
      status: 201,
      savedCourse,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
