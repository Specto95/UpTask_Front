import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import {
  TeamMember,
  teamMemberSchema,
  teamMembersSchema,
  type Project,
  type TeamMemberForm,
} from "../types";

type MemberAPI = {
  projectId: Project["_id"];
  formData: TeamMemberForm;
  id?: TeamMember["_id"];
};

export async function findMemberByEmail({ projectId, formData }: MemberAPI) {
  try {
    const url = `projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    const response = teamMemberSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addUserToProject({
  projectId,
  id,
}: Pick<MemberAPI, "projectId" | "id">) {
  try {
    const url = `projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getMembers(projectId: Project["_id"]) {
  try {
    const url = `projects/${projectId}/team`;
    const { data } = await api(url);
    const response = teamMembersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type removeMemberAPI = {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
};

export async function removeUserFromProject({
  projectId,
  userId,
}: removeMemberAPI) {
  try {
    const url = `projects/${projectId}/team/${userId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
