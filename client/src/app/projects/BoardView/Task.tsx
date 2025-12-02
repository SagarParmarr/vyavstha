import { formatDate } from "date-fns";
import Image from "next/image";
import { DragSourceMonitor, useDrag } from "react-dnd";
import PriorityTag from "./PriorityTag";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import type { Task as TaskType } from "@/state/api";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (
      monitor: DragSourceMonitor<{
        id: number;
      }>,
    ) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagSplit: string[] = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate
    ? formatDate(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? formatDate(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        ref={(instance) => {
          drag(instance);
        }}
        className={`group rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all mb-4 dark:bg-dark-secondary cursor-grab dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
      >
        {/*<div

        className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary cursor-grab `}
      >*/}
        {task.attachments && task.attachments.length > 0 && (
          <Image
            src={`/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName || ""}
            width={400}
            height={200}
            className="h-auto w-full rounded-t-md"
          />
        )}
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {task.priority && <PriorityTag priority={task.priority} />}
              <div className="flex gap-2">
                {taskTagSplit.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                  >
                    {" "}
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <button className="flex h-6 w-4 shrink-0 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
          </div>
          <div className="my-3 flex justify-between ">
            <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
            {typeof task.points === "number" && (
              <div className="text-xs font-semibold dark:text-white">
                {task.points} pts
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500  dark:text-neutral-500">
            {formattedStartDate && <span>{formattedStartDate} -</span>}
            {formattedDueDate && <span>{formattedDueDate}</span>}
          </div>
          <p className="text-sm text-gray-600 dark:text-neutral-500">
            {task.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-1.5 overflow-hidden">
              {task.assignee && (
                <Image
                  key={task.assignee.userId}
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username || ""}
                  width={30}
                  height={30}
                  className="size-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
              )}
              {task.author && (
                <Image
                  key={task.author.userId}
                  src={`/${task.author.profilePictureUrl}`}
                  alt={task.author.username || ""}
                  width={30}
                  height={30}
                  className="size-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
              )}
            </div>
            <div className="flex items-center text-gray-500">
              <MessageSquareMore size={20} />
              <span className="ml-1 text-sm dark:text-neutral-400">
                {numberOfComments}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Task;
