export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getPoll } from "@/lib/poll";
import { auth } from "@/lib/auth/auth-node";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const id = (await params).id;
    if (!userId)
      return NextResponse.json(
        { message: "Need authorization" },
        { status: 404 },
      );
    if (!id)
      return NextResponse.json(
        { message: "Poll's id is required" },
        { status: 404 },
      );
    const [data, sequenceId] = await getPoll(id, userId);
    return NextResponse.json({ sequenceId, data });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to get poll", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return NextResponse.json(
        { message: "Authorization is required" },
        { status: 401 },
      );

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "poll id is required" },
        { status: 400 },
      );
    }

    // Delete poll (cascades to options and votes)
    await prisma.poll.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("failed to delete poll", error);
    return NextResponse.json(
      { message: "failed to delete poll", error },
      { status: 500 },
    );
  }
}
