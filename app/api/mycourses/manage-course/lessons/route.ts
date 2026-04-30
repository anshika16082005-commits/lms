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
    const lessonsId = request.nextUrl.searchParams.get("lessonsId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    if (!lessonsId) {
      return NextResponse.json(
        { error: "Lessons ID is required" },
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
    const { lessons } = await request.json();
    if (!lessons) {
      return NextResponse.json(
        { error: "Lessons are required" },
        { status: 400 },
      );
    }

    const updateLesson: Record<string, unknown> = {};
    if (lessons.title) {
      updateLesson["modules.$.lessons.$.title"] = lessons.title;
    }
    if (lessons.description) {
      updateLesson["modules.$.lessons.$.description"] = lessons.description;
    }
    if (lessons.url) {
      updateLesson["modules.$.lessons.$.url"] = lessons.url;
    }
    if (lessons.type) {
      updateLesson["modules.$.lessons.$.type"] = lessons.type;
    }
    if (lessons.isPreview !== undefined) {
      updateLesson["modules.$.lessons.$.isPreview"] = lessons.isPreview;
    }
    if (lessons.duration) {
      updateLesson["modules.$.lessons.$.duration"] = lessons.duration;
    }

    const updateCourse = await Course.updateOne(
      {
        _id: courseId,
        "modules.lessons._id": lessonsId,
        "modules._id": moduleId,
      },
      {
        $set: {
          "modules.$[mod].lessons": updateLesson,
        },
      },
      {
        arrayFilters: [{ "mod._id": moduleId }, { "les._id": lessonsId }],
      },
    );

    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Lesson updated successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//todo: implement lesson update functionality and add validation to check if the lesson with the same title already exists in the module
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
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }
    if (user.role !== "instructor") {
      return NextResponse.json(
        { message: "Only instructors are allowed" },
        { status: 401 },
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
    const { lessons } = await request.json();

    if (!lessons) {
      return NextResponse.json(
        { error: "Lessons are required" },
        { status: 400 },
      );
    }

    const duplicateLesson = course.modules.some((mod: any) =>
      mod.lessons.some(
        (les: any) =>
          les.title.toLowerCase() === lessons.title.toLowerCase() &&
          les.description.toLowerCase() === lessons.description.toLowerCase() &&
          //les.url.toLowerCase() === lessons.url.toLowerCase() &&
          les.type.toLowerCase() === lessons.type.toLowerCase() &&
          les.isPreview.toString().toLowerCase() ===
            lessons.isPreview.toString().toLowerCase() &&
          les.duration.toString().toLowerCase() ===
            lessons.duration.toString().toLowerCase(),
      ),
    );

    if (duplicateLesson) {
      return NextResponse.json(
        { error: "A lesson with this title already exists" },
        { status: 400 },
      );
    }

    const newLesson: Record<string, unknown> = {};
    if (lessons.title) {
      newLesson["title"] = lessons.title;
    }
    if (lessons.description) {
      newLesson["description"] = lessons.description;
    }
    if (lessons.url) {
      newLesson["url"] = lessons.url;
    }
    if (lessons.type) {
      newLesson["type"] = lessons.type;
    }
    if (lessons.isPreview !== undefined) {
      newLesson["isPreview"] = lessons.isPreview;
    }
    if (lessons.duration) {
      newLesson["duration"] = lessons.duration;
    }

    const updateCourse = await Course.updateOne(
      { _id: courseId, "modules._id": moduleId },
      {
        $push: {
          "modules.$.lessons": newLesson,
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
      message: "Lesson added successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
