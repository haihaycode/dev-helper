import Axios from "@/api/axios";
import {
  IVocabulariesResponse,
  IVocabulary,
  IVocabularyRequest,
} from "@/models/IIearnEnglish";
import { getPath, api } from "./config";
import { IBaseModel } from "@/models/base";

export const getAllVocabularies = async (
  body: IVocabularyRequest
): Promise<IVocabulariesResponse> => {
  const response = await Axios.get(getPath(api.vocabulary.getAll), {
    params: body,
  });
  return response.data as IVocabulariesResponse;
};

export const createVocabulary = async (
  body: IVocabulary
): Promise<IBaseModel<IVocabulary>> => {
  const response = await Axios.post(getPath(api.vocabulary.create), body);
  return response.data as IBaseModel<IVocabulary>;
};

export const updateVocabulary = async (
  id: number,
  body: IVocabulary
): Promise<IBaseModel<IVocabulary>> => {
  const response = await Axios.put(
    `${getPath(api.vocabulary.update)}?id=${id}`,
    body
  );
  return response.data as IBaseModel<IVocabulary>;
};

export const changeSpecial = async (
  id: number
): Promise<IBaseModel<IVocabulary>> => {
  const response = await Axios.patch(
    `${getPath(api.vocabulary.special)}?id=${id}`
  );
  return response.data as IBaseModel<IVocabulary>;
};

export const deleteVoca = async (
  id: number
): Promise<IBaseModel<IVocabulary>> => {
  const response = await Axios.delete(
    `${getPath(api.vocabulary.delete)}?id=${id}`
  );
  return response.data as IBaseModel<IVocabulary>;
};
