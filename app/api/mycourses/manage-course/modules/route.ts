import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required in headers" },
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.role === "student") {
      return NextResponse.json(
        { message: "Only instructors are allowed" },
        { status: 403 },
      );
    }

    const courseId = request.nextUrl.searchParams.get("courseId");
    const moduleId = request.nextUrl.searchParams.get("moduleId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const { modules } = await request.json();

    if (!modules) {
      return NextResponse.json(
        { error: "Invalid modules data" },
        { status: 400 },
      );
    }

    const updateModule: Record<string, unknown> = {};

    if (modules.title) {
      updateModule["modules.$.title"] = modules.title;
    }
    if (modules.description) {
      updateModule["modules.$.description"] = modules.description;
    }

    const updateCourse = await Course.updateOne(
      { _id: courseId, "modules._id": moduleId },
      {
        $set: {
          ...updateModule,
        },
      },
      {
        arrayFilters: [{ "mod._id": moduleId }],
      },
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Module updated successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//todo : update lessons in module and also add delete lesson in module
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required in headers" },
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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
    const { modules } = await request.json();
    if (!modules) {
      return NextResponse.json(
        { error: "Modules are required" },
        { status: 400 },
      );
    }

    const duplicateModule = course.modules.some(
      (mod: any) =>
        mod.title.toLowerCase() === modules.title.toLowerCase() &&
        mod.description.toLowerCase() === modules.description.toLowerCase(),
      // mod.lessons.length === modules.lessons.length &&
      // mod.lessons.every((les: any, index: number) => {
      //   const lesson = modules.lessons[index];
      //   return (
      //     les.title.toLowerCase() === lesson.title.toLowerCase() &&
      //     les.description.toLowerCase() === lesson.description.toLowerCase() &&
      //     les.url.toLowerCase() === lesson.url.toLowerCase() &&
      //     les.type.toLowerCase() === lesson.type.toLowerCase() &&
      //     les.isPreview === lesson.isPreview &&
      //     les.duration === lesson.duration
      //   );
      // }),
    );

    if (duplicateModule) {
      return NextResponse.json(
        { error: "A module with this title already exists" },
        { status: 400 },
      );
    }

    const newModule: Record<string, unknown> = {};
    if (modules.title) {
      newModule["title"] = modules.title;
    }
    if (modules.description) {
      newModule["description"] = modules.description;
    }
    if (modules.lessons) {
      newModule["lessons"] = modules.lessons;
    }
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          modules: newModule,
        },
      },
      { new: true },
    ).select(
      "-thumbnail -lectures -enrolledStudents -instructor -createdAt -updatedAt",
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Module added successfully",
      data: updateCourse,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required in headers" },
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

    const moduleId = request.nextUrl.searchParams.get("moduleId");
    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 },
      );
    }
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          modules: { _id: moduleId },
        },
      },
      { new: true },
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to delete module" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Module deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
