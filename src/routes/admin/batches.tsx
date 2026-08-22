import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { listRows } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/batches")({
  component: BatchesAdmin,
});

function batchLabel(row: Record<string, unknown>): string {
  const start = String(row["start_date"] ?? "");
  const end = row["end_date"] ? String(row["end_date"]) : "";
  return end && end !== start ? `${start} → ${end}` : start;
}

function BatchesAdmin() {
  const [tripId, setTripId] = useState("");
  const [batchId, setBatchId] = useState("");

  const { data: trips = [] } = useQuery({
    queryKey: ["admin", "journeys"],
    queryFn: () => listRows("journeys", "sort_order"),
  });
  const { data: hosts = [] } = useQuery({
    queryKey: ["admin", "hosts"],
    queryFn: () => listRows("hosts", "sort_order"),
  });
  const { data: batches = [] } = useQuery({
    queryKey: ["admin", "trip_batches"],
    queryFn: () => listRows("trip_batches", "start_date"),
  });

  const hostNames = useMemo(
    () => Object.fromEntries(hosts.map((h) => [String(h["id"]), String(h["name"] ?? "Untitled")])),
    [hosts],
  );
  const tripBatches = useMemo(
    () => batches.filter((b) => b["trip_id"] === tripId),
    [batches, tripId],
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Trip Batches</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Departures for a trip — dates, capacity, seats remaining, and the hosts leading each
          batch. Reusable trip details live on the trip itself.
        </p>
      </header>

      <section className="space-y-4">
        <div className="max-w-xs space-y-1.5">
          <Label className="text-xs font-medium">Trip</Label>
          <Select
            value={tripId}
            onValueChange={(v) => {
              setTripId(v);
              setBatchId("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a trip…" />
            </SelectTrigger>
            <SelectContent>
              {trips.map((trip) => (
                <SelectItem key={String(trip["id"])} value={String(trip["id"])}>
                  {String(trip["title"] ?? "Untitled")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {tripId ? (
          <>
            <CollectionManager
              config={{
                table: "trip_batches",
                title: "Batches",
                labelKey: "start_date",
                labelFor: batchLabel,
                orderable: true,
                statusKey: "status",
                scope: { trip_id: tripId },
                filter: (row) => row["trip_id"] === tripId,
                emptyLabel: "No batches for this trip yet — add the first departure.",
                defaults: { status: "draft" },
                fields: [
                  { key: "start_date", label: "Start date", type: "date", required: true },
                  { key: "end_date", label: "End date", type: "date" },
                  { key: "capacity", label: "Capacity", type: "number", min: 0 },
                  { key: "seats_remaining", label: "Seats remaining", type: "number", min: 0 },
                  {
                    key: "batch_type",
                    label: "Batch type",
                    type: "text",
                    placeholder: "Standard, Long weekend…",
                  },
                  {
                    key: "status",
                    label: "Status",
                    type: "select",
                    options: [
                      { value: "draft", label: "Draft (hidden)" },
                      { value: "published", label: "Published (live)" },
                    ],
                  },
                ],
              }}
            />

            <div className="max-w-xs space-y-1.5">
              <Label className="text-xs font-medium">Assign hosts to batch</Label>
              <Select value={batchId} onValueChange={setBatchId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a batch…" />
                </SelectTrigger>
                <SelectContent>
                  {tripBatches.map((batch) => (
                    <SelectItem key={String(batch["id"])} value={String(batch["id"])}>
                      {batchLabel(batch)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {batchId ? (
              <CollectionManager
                config={{
                  table: "trip_batch_hosts",
                  title: "Hosts on this batch",
                  description: "A batch can have one lead host and multiple co-hosts.",
                  labelKey: "role",
                  labelFor: (row) => hostNames[String(row["host_id"])] ?? "Unknown host",
                  subtitleFor: (row) => (row["role"] === "lead" ? "Lead host" : "Co-host"),
                  scope: { batch_id: batchId },
                  filter: (row) => row["batch_id"] === batchId,
                  emptyLabel: "No hosts assigned to this batch yet.",
                  defaults: { role: "lead" },
                  fields: [
                    {
                      key: "host_id",
                      label: "Host",
                      type: "relation",
                      required: true,
                      relation: { table: "hosts", labelKey: "name" },
                    },
                    {
                      key: "role",
                      label: "Role",
                      type: "select",
                      options: [
                        { value: "lead", label: "Lead host" },
                        { value: "co_host", label: "Co-host" },
                      ],
                    },
                  ],
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a batch above to assign its lead host and co-hosts.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a trip above to manage its batches and host assignments.
          </p>
        )}
      </section>
    </div>
  );
}
