import Axios from "@/api/axios";
import { DICTIONARY_API_URL } from "./config";
import { AxiosRequestConfig } from "axios";
import { DictionaryResponse } from "@/models/IDictionaryEntry";

export const getVocabularyByDictionary = async (
  param: string
): Promise<DictionaryResponse> => {
  const response = await Axios.get(
    DICTIONARY_API_URL + "/api/v2/entries/en/" + param,
    {
      loading: false,
      authenticate: true, //cần xác thực
    } as AxiosRequestConfig
  );
  return response.data as DictionaryResponse;
};
