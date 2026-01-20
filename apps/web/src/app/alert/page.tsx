import { StatusCard } from "@/components/Meeting/StatusCard";
import { Alert } from "@/components/ui/alert";
import { ChevronLeft, Filter } from "lucide-react";

export default function AlertPage() {
  return (
    <div>
      <nav className="flex w-full justify-between border-b-2 mb-6 h-15">
        <div className="flex items-center">
          <ChevronLeft />
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Live Alert</h2>
            <p className="text-primary/50">3 active alerts</p>
          </div>
        </div>
        <Filter className="h-full text-primary/60" />
      </nav>
      <Alert className="bg-primary/4 border-primary/6 shadow-sm flex items-center gap-x-6">
        <div className="bg-secondary/10 size-8 p-2 text-center rounded-full text-secondary font-semibold">
          2
        </div>
        <div>
          <h2 className="text-lg font-semibold">3 items need Attention</h2>
          <p className="text-primary/50">
            Review before proceeding with meeting
          </p>
        </div>
      </Alert>
      <section className="space-y-4 mt-5">
        <h1>Need Attention</h1>
        <StatusCard
          status="alert"
          title="Shareholder Approval Required"
          message="Agentda item 4 (New Director Appointment) requires shareholder"
          recommendAct="Defer to next shareholder meeting or call EGM"
          time={2}
        />
        <StatusCard
          status="alert"
          title="Shareholder Approval Required"
          message="Agentda item 4 (New Director Appointment) requires shareholder"
          recommendAct="Defer to next shareholder meeting or call EGM"
          time={2}
        />
        <StatusCard
          status="alert"
          title="Shareholder Approval Required"
          message="Agentda item 4 (New Director Appointment) requires shareholder"
          recommendAct="Defer to next shareholder meeting or call EGM"
          time={2}
        />
      </section>
    </div>
  );
}
