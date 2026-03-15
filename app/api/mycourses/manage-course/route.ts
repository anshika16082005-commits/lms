import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
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
