import { Link } from "react-router-dom";
import { ProjectForm } from "./ProjectForm";
import { Project, ProjectFormData } from "../../types";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EditProjectFormTypes = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export function EditProjectForm({ data, projectId }: EditProjectFormTypes) {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    description: data.description,
    clientName: data.clientName,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"], //? REFRESH PROJECTS LIST
      });
      queryClient.invalidateQueries({
        queryKey: ["editProject", projectId],
      });
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt5">
          Llena el siguiente formulario para crear un nuevo proyecto
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver al Dashboard
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate // Disable default HTML5 validation
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
