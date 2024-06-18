import { toast } from "react-toastify";
import { addUserToProject } from "../../api/TeamAPI";
import { Project, TeamMember } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type SearchMemberResultProps = {
  member: TeamMember;
  projectId: Project["_id"];
  reset: () => void;
};

export function SearchMemberResult({
  member,
  projectId,
  reset,
}: SearchMemberResultProps) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projectTeam", projectId],
      });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleAddMemberToProject = () => {
    const data = {
      projectId,
      id: member._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{member.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddMemberToProject}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
}
