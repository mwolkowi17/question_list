import { defineStore } from "pinia";
import { getSet } from "../api/questions";
import type { QuestionSet } from "../questionSetTypes";
import { computed, ref } from "vue";

export const useQuestionStore = defineStore("qusetionStore", () => {
  const setArray = ref([] as QuestionSet[]);

  const loading = ref(true);

  const error = ref(null as string | null);

  const search = ref("");

  async function fetchSet() {
    setArray.value = await getSet();
  }

  function filterQuestions(query: string): QuestionSet[] {
    return setArray.value.filter((u) => {
      u.question.toLowerCase().includes(query.toLowerCase());
    });
  }

  const computedFilterQuestions = computed<QuestionSet[]>(() => {
    return setArray.value.filter((u) => {
      return u.question.toLowerCase().includes(search.value.toLowerCase());
    });
  });

  return {
    setArray,
    loading,
    error,
    search,
    computedFilterQuestions,
    fetchSet,
    filterQuestions,
  };
});
