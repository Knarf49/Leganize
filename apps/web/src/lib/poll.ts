import { prisma } from "@/lib/prisma";
import * as runtime from "@prisma/client/runtime/client.js";

export type PollOptionType = {
  id: string;
  text: string;
  voteCount: number;
};

export type PollType = {
  id: string;
  question: string;
  options: PollOptionType[];
  totalVotes: number;
  userVote?: string; // optionId that user voted for
  createdAt: Date;
};

export type TxClient = Omit<typeof prisma, runtime.ITXClientDenyList>;

/**
 * Get all polls with vote counts
 */
export async function getPolls(userId?: string): Promise<PollType[]> {
  const polls = await prisma.poll.findMany({
    include: {
      options: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
      votes: userId
        ? {
            where: { userId },
            select: { optionId: true },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return polls.map((poll) => ({
    id: poll.id,
    question: poll.question,
    options: poll.options.map((option) => ({
      id: option.id,
      text: option.text,
      voteCount: option._count.votes,
    })),
    totalVotes: poll.options.reduce(
      (sum, option) => sum + option._count.votes,
      0,
    ),
    userVote:
      userId && Array.isArray(poll.votes) && poll.votes.length > 0
        ? poll.votes[0].optionId
        : undefined,
    createdAt: poll.createdAt,
  }));
}

/**
 * Get all polls without sequence ID (no longer using Ably sync)
 */
export async function getPollsWithSequence(
  userId?: string,
): Promise<[PollType[], number]> {
  const polls = await prisma.poll.findMany({
    include: {
      options: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
      votes: userId
        ? {
            where: { userId },
            select: { optionId: true },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pollsData = polls.map((poll) => ({
    id: poll.id,
    question: poll.question,
    options: poll.options.map((option) => ({
      id: option.id,
      text: option.text,
      voteCount: option._count.votes,
    })),
    totalVotes: poll.options.reduce(
      (sum, option) => sum + option._count.votes,
      0,
    ),
    userVote:
      userId && Array.isArray(poll.votes) && poll.votes.length > 0
        ? poll.votes[0].optionId
        : undefined,
    createdAt: poll.createdAt,
  }));

  return [pollsData, 0]; // Return 0 as dummy sequence ID
}

/**
 * Get a single poll without sequence ID
 */
export async function getPoll(
  id: string,
  userId?: string,
): Promise<[PollType, number]> {
  const poll = await prisma.poll.findUniqueOrThrow({
    where: { id },
    include: {
      options: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
      votes: userId
        ? {
            where: { userId },
            select: { optionId: true },
          }
        : false,
    },
  });

  const pollData: PollType = {
    id: poll.id,
    question: poll.question,
    options: poll.options.map((option) => ({
      id: option.id,
      text: option.text,
      voteCount: option._count.votes,
    })),
    totalVotes: poll.options.reduce(
      (sum, option) => sum + option._count.votes,
      0,
    ),
    userVote:
      userId && Array.isArray(poll.votes) && poll.votes.length > 0
        ? poll.votes[0].optionId
        : undefined,
    createdAt: poll.createdAt,
  };

  return [pollData, 0]; // Return 0 as dummy sequence ID
}

/**
 * Create a new poll with options
 */
export async function createPoll(
  userId: string,
  question: string,
  options: string[],
): Promise<PollType> {
  if (options.length < 2) {
    throw new Error("Poll must have at least 2 options");
  }

  const poll = await prisma.poll.create({
    data: {
      question,
      options: {
        create: options.map((text) => ({ text })),
      },
    },
    include: {
      options: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
    },
  });

  return {
    id: poll.id,
    question: poll.question,
    options: poll.options.map((option) => ({
      id: option.id,
      text: option.text,
      voteCount: option._count.votes,
    })),
    totalVotes: 0,
    createdAt: poll.createdAt,
  };
}

/**
 * Vote on a poll (upsert to handle vote changes)
 */
export async function vote(
  userId: string,
  pollId: string,
  optionId: string,
): Promise<PollType> {
  // Upsert the vote (update if exists, create if not)
  await prisma.vote.upsert({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
    update: {
      optionId,
    },
    create: {
      userId,
      pollId,
      optionId,
    },
  });

  // Get updated poll data with vote counts
  const poll = await prisma.poll.findUniqueOrThrow({
    where: { id: pollId },
    include: {
      options: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
      votes: {
        where: { userId },
        select: { optionId: true },
      },
    },
  });

  return {
    id: poll.id,
    question: poll.question,
    options: poll.options.map((option) => ({
      id: option.id,
      text: option.text,
      voteCount: option._count.votes,
    })),
    totalVotes: poll.options.reduce(
      (sum, option) => sum + option._count.votes,
      0,
    ),
    userVote: poll.votes.length > 0 ? poll.votes[0].optionId : undefined,
    createdAt: poll.createdAt,
  };
}

// Removed old outbox-based functions:
// - deletePoll
// - editPoll
// - deletePollOption
// - withOutboxWrite
// These are no longer needed after removing Ably real-time updates
