export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { createPoll, getPollsWithSequence } from "@/lib/poll";
import { auth } from "@/lib/auth/auth-node";

export async function GET(_: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const [data, sequenceId] = await getPollsWithSequence(userId);
    return NextResponse.json({ sequenceId, data });
  } catch (error) {
    console.error("failed to get polls", error);
    return NextResponse.json(
      { message: "failed to get polls", error },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate body structure
    if (!body.question || typeof body.question !== "string") {
      return NextResponse.json(
        { message: "question is required and must be a string" },
        { status: 400 },
      );
    }

    if (!Array.isArray(body.options) || body.options.length < 2) {
      return NextResponse.json(
        { message: "options must be an array with at least 2 items" },
        { status: 400 },
      );
    }

    const poll = await createPoll(userId, body.question, body.options);

    return NextResponse.json({ success: true, data: poll });
  } catch (error) {
    console.error("failed to create poll", error);
    return NextResponse.json(
      { message: "failed to create poll", error },
      { status: 500 },
    );
  }
}
