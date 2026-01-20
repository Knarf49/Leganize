"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  Circle,
  CircleCheck,
  Clock,
  EllipsisVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ---- types ----
type TaskStatus = "pending" | "in-progress" | "success";

interface Task {
  id: string;
  title: string;
  detail?: string;
  status: TaskStatus;
}

// ---- mock data ----
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Gather requirements",
    detail:
      "Collect and document all functional and non-functional requirements from stakeholders, including scope, constraints, and acceptance criteria.",
    status: "pending",
  },
  {
    id: "2",
    title: "Design UI",
    detail:
      "Create wireframes and high-fidelity UI designs, define user flows, and ensure consistency with the design system and accessibility guidelines.",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Implement API",
    detail:
      "Develop backend API endpoints, define request and response schemas, handle validation, authentication, and error handling.",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Write tests",
    detail:
      "Write unit and integration tests to verify business logic, API responses, and edge cases to ensure system reliability.",
    status: "pending",
  },
  {
    id: "5",
    title: "Deploy to production",
    detail:
      "Prepare production environment, run final checks, deploy the application, and monitor logs and metrics after release.",
    status: "success",
  },
];

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "success").length;
  const progress = Math.round((completed / total) * 100);

  const grouped = {
    pending: tasks.filter((t) => t.status === "pending"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    success: tasks.filter((t) => t.status === "success"),
  } as const;

  const toggleSuccess = (id: string, checked: boolean) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: checked ? "success" : "pending" } : t,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <nav className="fixed top-16 left-0 right-0 bg-white z-60 flex w-full justify-between border-b-2 mb-6 h-15 px-6">
        <div className="flex items-center">
          <ChevronLeft />
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Compilance Checklist</h2>
            <p className="text-primary/50">Post-meeting actions</p>
          </div>
        </div>
        <EllipsisVertical className="h-full" />
      </nav>
      <Card className="mt-12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif font-normal">
            Completion Progress
          </CardTitle>
          <p className="text-md text-muted-foreground">
            {completed} of {total}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progress} />

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Legend color="bg-green-500" label="Done" />
            <Legend color="bg-yellow-400" label="In Progress" />
            <Legend color="bg-gray-400" label="Pending" />
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <TaskSection
        title="Pending"
        status="pending"
        tasks={grouped.pending}
        onToggle={toggleSuccess}
      />

      <TaskSection
        title="In Progress"
        status="in-progress"
        tasks={grouped["in-progress"]}
        onToggle={toggleSuccess}
      />

      <TaskSection
        title="Completed"
        status="success"
        tasks={grouped.success}
        onToggle={toggleSuccess}
      />

      <div className="bg-linear-to-r from-primary/4 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Auto-generated checklist</h2>
        <p className="text-primary/50">
          These actions were identified based on meeting conclusion. Tap any
          item to update its status
        </p>
      </div>

      <Button variant="outline" className="w-full py-6 border-2 text-lg">
        Export Checklist
      </Button>
    </div>
  );
}

// ---- components ----
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function TaskSection({
  title,
  status,
  tasks,
  onToggle,
}: {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onToggle: (id: string, checked: boolean) => void;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>

      {tasks.length === 0 && (
        <p className="text-sm text-muted-foreground">No tasks</p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm"
        >
          {/* <Checkbox
            className="mt-1"
            checked={task.status === "success"}
            onCheckedChange={(v) => onToggle(task.id, Boolean(v))}
          /> */}
          <div
            className={cn(
              "size-fit p-1 rounded-lg",
              task.status === "success" && "bg-secondary/30",
              task.status === "pending" && "bg-primary/30",
              task.status === "in-progress" && "bg-yellow-100",
            )}
          >
            {task.status === "pending" && (
              <Circle className="text-primary/50" />
            )}
            {task.status === "success" && (
              <CircleCheck className="text-yellow-400" />
            )}
            {task.status === "in-progress" && (
              <Clock className="text-secondary/50" />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <p
                className={
                  task.status === "success"
                    ? "text-sm text-muted-foreground line-through"
                    : "text-sm font-medium"
                }
              >
                {task.title}
              </p>

              <span className="text-xs text-muted-foreground">Jan 15</span>
            </div>

            {task.detail && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
