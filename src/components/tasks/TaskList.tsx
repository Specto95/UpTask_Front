import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusTranslations } from "../../locales/es";
import { Project, Task, TaskProject, TaskStatus } from "../../types";
import { DropTask } from "./Drop/DropTask";
import { TaskCard } from "./TaskCard";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { updateTaskStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

//[key: string]: string because the key is a string and the value is a string

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-300",
  onHold: "border-t-yellow-300",
  inProgress: "border-t-blue-300",
  underReview: "border-t-purple-300",
  completed: "border-t-green-300",
};

export function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["task", projectId],
      // });
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      console.log("No hay destino");
      return;
    }

    const taskId = active.id as Task["_id"];
    const status = over.id as TaskStatus;

    mutate({ projectId, taskId, status });

    //? Optimistic Update - Update the task status in the UI before the API call
    queryClient.setQueryData(
      ["project", projectId],
      (oldData: Project) => {
        const updatedTasks = oldData.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status };
          }
          return task;
        });

        return { ...oldData, tasks: updatedTasks };
      }
    );
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <ul className="mt-5 space-y-5">
                <h3
                  className={`capitalize text-xl font-light border ${statusStyles[status]} bg-white p-3 border-t-8`}
                >
                  {statusTranslations[status]}
                </h3>
                <DropTask status={status} />

                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
