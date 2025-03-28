import Axios from "@/api/axios";
import {
  IVocabulariesResponse,
  IVocabularyRequest,
} from "@/models/IIearnEnglish";
import { getPath, api } from "./config";

export const getAllVocabularies = async (
  body: IVocabularyRequest
): Promise<IVocabulariesResponse> => {
  const response = await Axios.get(getPath(api.vocabulary.getAll), {
    params: body,
  });
  return response.data as IVocabulariesResponse;
};
