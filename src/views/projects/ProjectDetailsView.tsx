import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getFullProjectDetailsById } from "../../api/ProjectAPI";
import { AddTaskModal } from "../../components/tasks/Modals/Add/AddTasksModal";
import { TaskList } from "../../components/tasks/TaskList";
import { EditTaskData } from "../../components/tasks/Edit/EditTaskData";
import { TaskModalDetails } from "../../components/tasks/Modals/List/TaskModalDetails";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import { useMemo } from "react";

export function ProjectDetailsView() {
  const navigate = useNavigate();
  const projectId = useParams().projectId!;

  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProjectDetailsById(projectId!),
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <Navigate to="/404" />;
  }
  if (data && user) {
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) ? (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`?newTask=true`)}
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Agregar Tarea
            </button>
            <Link
              to={"team"}
              className="bg-fuchsia-500 hover:bg-fuchsia-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        ) : (
          <> </>
        )}
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails projectId={projectId!} />
      </>
    );
  }
}
