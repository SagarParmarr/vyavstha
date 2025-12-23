import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React, { useState } from "react";
import { DisplayOption, ViewMode } from "gantt-task-react";
type PropType = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
type TaskTypeItems = "task" | "milestone" | "project";

const TimeLineView = ({ id, setIsModalNewTaskOpen }: PropType) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  return <div>Timeline View loading...</div>;
};

export default TimeLineView;
