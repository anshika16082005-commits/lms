import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";

connect();

//todo:edit and view functionality for users

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins are allowed" },
        { status: 401 },
      );
    }

    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password",
    );

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins are allowed" },
        { status: 401 },
      );
    }

    const deletedUserId = request.nextUrl.searchParams.get("uid");

    if (!deletedUserId) {
      return NextResponse.json(
        { message: "No user id given" },
        { status: 400 },
      );
    }

    const deletedUser = await User.findById(deletedUserId);
    if (!deletedUser) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    await User.findByIdAndDelete(deletedUserId);
    return NextResponse.json({
      success: true,
      data: {
        name: deletedUser.name,
        email: deletedUser.email,
        role: deletedUser.role,
      },
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}
