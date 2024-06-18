import { Navigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import { EditProjectForm } from "../../components/projects/EditProjectForm";

export function EditProjectView() {
  const { projectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <Navigate to="/404" />;
  }

  if (data) return <EditProjectForm data={data} projectId={projectId!} />;
}
