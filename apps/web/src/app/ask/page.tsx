"use client";

import { Thread } from "@/components/thread";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";

export default function AskPage() {
  return (
    <ThreadProvider>
      <StreamProvider>
        <div className="py-18">
          <Thread />
        </div>
      </StreamProvider>
    </ThreadProvider>
  );
}
