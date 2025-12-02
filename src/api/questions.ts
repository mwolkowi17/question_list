import axios from "axios";
import type { QuestionSet } from "../questionSetTypes";

const API_URL = "http://localhost/app_poligon/wp-json/quizz-api/v1/source";

export const getSet = async (): Promise<QuestionSet[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
