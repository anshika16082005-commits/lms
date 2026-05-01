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
    const lessonsId = request.nextUrl.searchParams.get("lessonId");
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
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as File | null;
    const type = formData.get("type") as string;
    const isPreview = formData.get("isPreview") === "true";
    const duration = formData.get("duration") as string;

    const updateLesson: Record<string, any> = {};
    if (title) updateLesson.title = title;
    if (description) updateLesson.description = description;

    if (url) updateLesson.url = url;

    if (type) updateLesson.type = type;

    if (isPreview !== undefined) updateLesson.isPreview = isPreview;

    if (duration) updateLesson.duration = duration;

    if (!updateLesson) {
      return NextResponse.json(
        { error: "Lessons are required" },
        { status: 400 },
      );
    }

    const duplicateLesson = course.modules.some((mod: any) =>
      mod.lessons.some(
        (les: any) =>
          les.title.toLowerCase() === updateLesson.title?.toLowerCase() &&
          les.description.toLowerCase() ===
            updateLesson.description?.toLowerCase(),
      ),
    );

    if (duplicateLesson) {
      return NextResponse.json(
        { error: "A lesson with this title and description already exists" },
        { status: 400 },
      );
    }

    const updateCourse = await Course.updateOne(
      {
        _id: courseId,
        "modules.lessons._id": lessonsId,
        "modules._id": moduleId,
      },
      {
        $set: {
          "modules.$[mod].lessons.$[les]": updateLesson,
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

    const newLesson: Record<string, any> = {};
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as File | null;
    const type = formData.get("type") as string;
    const isPreview = formData.get("isPreview") === "true";
    const duration = formData.get("duration") as string;

    if (title) newLesson.title = title;
    if (description) newLesson.description = description;
    // if (url)
    //   newLesson.url = url;
    if (type) newLesson.type = type;
    if (isPreview !== undefined) newLesson.isPreview = isPreview;
    if (duration) newLesson.duration = duration;

    if (!newLesson) {
      return NextResponse.json(
        { error: "At least one field is required to add a lesson" },
        { status: 400 },
      );
    }
    const duplicateLesson = course.modules.some((mod: any) =>
      mod.lessons.some(
        (les: any) =>
          les.title.toLowerCase() === newLesson.title?.toLowerCase() &&
          les.description.toLowerCase() ===
            newLesson.description?.toLowerCase(),
      ),
    );

    if (duplicateLesson) {
      return NextResponse.json(
        { error: "A lesson with this title and description already exists" },
        { status: 400 },
      );
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
        { error: "Failed to add lesson in module" },
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
    const lessonId = request.nextUrl.searchParams.get("lessonId");
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
    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const deleteCourse = await Course.findByIdAndUpdate(
      {
        _id: courseId,
        "modules._id": moduleId,
        "modules.$[mod].lessons._id": lessonId,
      },
      {
        $pull: {
          "modules.$[mod].lessons": { _id: lessonId },
        },
      },
      {
        arrayFilters: [{ "mod._id": moduleId }],
        new: true,
      },
    );
    if (!deleteCourse) {
      return NextResponse.json(
        { error: "Failed to delete lesson from module" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Lesson deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
