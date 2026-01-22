// components/poll/PollItems.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PollOption } from "./PollOption";
import type { PollType } from "@/lib/poll";
import { vote } from "@/lib/models/mutations";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { usePoll } from "@/lib/models/hook";
import { toast } from "react-toastify";

type PollItemsProps = {
  poll: PollType;
  onVote?: (optionId: string) => void;
  showResult?: boolean;
  className?: string;
};

export function PollItems({
  poll: initialPoll,
  onVote,
  showResult = true,
  className,
}: PollItemsProps) {
  const [poll, model] = usePoll(initialPoll.id);
  const session = useSession();
  const userId = session.data?.user?.id;
  const isSessionLoading = session.status === "loading";

  // Use poll from model if available, otherwise use initial poll
  const currentPoll = poll || initialPoll;
  const selectedId = currentPoll.userVote ?? null;

  const handleVote = async (optionId: string) => {
    if (!userId) {
      toast.error("You must be logged in to vote");
      return;
    }

    if (!model) {
      console.warn("Model not ready");
      return;
    }

    const mutationId = uuidv4();

    // Calculate optimistic update
    const optimisticPoll: PollType = {
      ...currentPoll,
      userVote: optionId,
      options: currentPoll.options.map((opt) => {
        if (opt.id === optionId) {
          // Increase vote count for new selection
          return { ...opt, voteCount: opt.voteCount + 1 };
        } else if (opt.id === selectedId) {
          // Decrease vote count for previous selection
          return { ...opt, voteCount: Math.max(0, opt.voteCount - 1) };
        }
        return opt;
      }),
      totalVotes:
        selectedId === null
          ? currentPoll.totalVotes + 1
          : currentPoll.totalVotes,
    };

    const [confirmed, cancel] = await model.optimistic({
      mutationId,
      name: "vote",
      data: { poll: optimisticPoll },
    });

    try {
      await vote(mutationId, userId, currentPoll.id, optionId);
      await confirmed;
      onVote?.(optionId);
    } catch (error) {
      console.error("Failed to vote:", error);
      toast.error(error instanceof Error ? error.message : "Failed to vote");
      cancel();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{currentPoll.question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {currentPoll.options.map((option) => {
          const percentage =
            currentPoll.totalVotes > 0
              ? Math.round((option.voteCount / currentPoll.totalVotes) * 100)
              : 0;

          return (
            <PollOption
              key={option.id}
              id={option.id}
              label={option.text}
              votes={option.voteCount}
              percentage={percentage}
              selected={selectedId === option.id}
              disabled={!model || !userId || isSessionLoading}
              showResult={showResult}
              onSelect={handleVote}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
