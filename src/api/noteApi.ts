import Axios from "@/api/axios";
import { getPath, api } from "./config";
import { IBaseModel } from "@/models/base";
import { INote, INoteRequest, INotesResponse } from "@/models/INote";

export const getAll = async (body: INoteRequest): Promise<INotesResponse> => {
  const response = await Axios.get(getPath(api.note.getAll), {
    params: body,
  });
  return response.data as INotesResponse;
};

export const create = async (body: INote): Promise<IBaseModel<INote>> => {
  const response = await Axios.post(getPath(api.note.create), body);
  return response.data as IBaseModel<INote>;
};

export const update = async (
  id: number,
  body: INote
): Promise<IBaseModel<INote>> => {
  const response = await Axios.put(
    `${getPath(api.note.update)}?id=${id}`,
    body
  );
  return response.data as IBaseModel<INote>;
};

export const deleteNote = async (id: number): Promise<IBaseModel<INote>> => {
  const response = await Axios.delete(`${getPath(api.note.delete)}?id=${id}`);
  return response.data as IBaseModel<INote>;
};
