import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";

connect();

//todo:view course functionality

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const courses = await Course.find({
      title: { $regex: search, $options: "i" },
    })
      .populate("instructor", "name")
      .sort({ createdAt: -1 });

    const formattedCourses = courses.map((course: any) => ({
      _id: course._id,
      title: course.title,
      instructor: course.instructor?.name || "Unknown",
      price: course.price,
      isFree: course.price === 0,
      students: course.enrolledStudents?.length || 0,
    }));

    return NextResponse.json({
      success: true,
      data: formattedCourses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
}
