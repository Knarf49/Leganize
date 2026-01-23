export async function createPoll(question: string, options: string[]) {
  const response = await fetch("/api/polls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, options }),
  });
  if (!response.ok)
    throw new Error(
      `POST /api/polls: ${response.status} ${JSON.stringify(await response.json())}`,
    );
  return response.json();
}

/**
 * Vote on a poll
 */
export async function vote(pollId: string, optionId: string) {
  const response = await fetch(`/api/polls/${pollId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId }),
  });
  if (!response.ok)
    throw new Error(
      `POST /api/polls/:id/vote: ${response.status} ${JSON.stringify(await response.json())}`,
    );
  return response.json();
}

/**
 * Edit a poll
 */
export async function editPoll(
  id: string,
  question?: string,
  options?: { id?: string; text: string }[],
) {
  const response = await fetch(`/api/polls/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, options }),
  });
  if (!response.ok)
    throw new Error(
      `PUT /api/polls/:id: ${response.status} ${JSON.stringify(await response.json())}`,
    );
  return response.json();
}

/**
 * Delete a poll
 */
export async function deletePoll(id: string) {
  const response = await fetch(`/api/polls/${id}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error(
      `DELETE /api/polls/:id: ${response.status} ${JSON.stringify(await response.json())}`,
    );
  return response.json();
}

/**
 * Delete a poll option
 */
export async function deletePollOption(pollId: string, optionId: string) {
  const response = await fetch(`/api/polls/${pollId}/options/${optionId}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error(
      `DELETE /api/polls/:id/options/:optionId: ${response.status} ${JSON.stringify(await response.json())}`,
    );
  return response.json();
}

// Removed Ably-related merge functions:
// - mergePoll
// - mergePollList
// These are no longer needed after removing Ably real-time updates
