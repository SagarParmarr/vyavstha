"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import type { Task as TaskType } from "@/state/api";

type Props = {
  task: TaskType;
};

export default function TaskCard({ task }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className="w-full"
    >
      <Card className="group rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all dark:bg-dark-secondary">
        {/* Cover Image */}
        {task.attachments && task.attachments?.length > 0 && (
          <div className="relative h-40 w-full">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName || "Attachment"}
              width={1000}
              height={500}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title + Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold tracking-tight">
                {task.title}
              </h3>

              <Badge className="capitalize text-xs px-2 py-0.5">
                {task.status}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description || "No description provided"}
            </p>
          </div>

          {/* Priority + Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs capitalize">
              Priority: {task.priority}
            </Badge>

            {task.tags ? (
              task.tags.split(",").map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[11px] px-2 py-0.5"
                >
                  {tag.trim()}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <Meta
              label="Start"
              value={
                task.startDate
                  ? format(new Date(task.startDate), "PP")
                  : "Not set"
              }
            />
            <Meta
              label="Due"
              value={
                task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"
              }
            />
            <Meta label="Author" value={task.author?.username || "Unknown"} />
            <Meta
              label="Assignee"
              value={task.assignee?.username || "Unknown"}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ---------- Meta Info Component ---------- */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
