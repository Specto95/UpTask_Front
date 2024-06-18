import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Note } from "../../types";
import { formatDate } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};

export function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const projectId = params.projectId!;

  const canDelete = useMemo(() => {
    return data?._id === note.createdBy._id;
  }, [data, note.createdBy._id]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
  });

  const handleDeleteNote = () => {
    mutate({
      projectId,
      taskId,
      noteId: note._id,
    });
  };

  if (isLoading) return <p>Cargando...</p>;
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          className="bg-red-400 hover:bg-red-500 text-xs p-3 text-white font-bold cursor-pointer
        transition-colors
      "
          onClick={handleDeleteNote}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
