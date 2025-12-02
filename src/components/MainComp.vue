<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuestionStore } from "../store/questionStore";
import axios from "axios";

const storeQuestions = useQuestionStore();
onMounted(async () => {
  try {
    await axios
      .get("http://localhost/app_poligon/wp-json/quizz-api/v1/source")
      //   .get("lo/app_poligon/wp-json/quizz-api/v1/source")
      .then((response) => {
        storeQuestions.setArray = response.data;
        console.log(response);
        console.log("quizzy pytania:" + storeQuestions.setArray);
      });

    //console.log("quizzy pytania:" + storeQuizz.kolekcjaPytan);
  } catch (error) {
    console.error(error);
    storeQuestions.error = "Failed to load users";
  } finally {
    storeQuestions.loading = false;
  }
});
console.log(storeQuestions.setArray);

const loadingGif = ref("../src/assets/loading-24054_256.gif");
</script>
<template>
  <input
    v-model="storeQuestions.search"
    type="text"
    placeholder="Search by name..."
    class="border p-2 rounded w-full mb-4"
  />
  <div v-if="storeQuestions.loading" class="text-center py-10">
    Loading questions...
    <img :src="loadingGif" width="100px" height="100px" />
  </div>
  <div v-else-if="storeQuestions.error" class="text-red-500 text-center">
    {{ storeQuestions.error }}
  </div>
  <div v-else>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-black-100">
          <th class="p-2 border">Question</th>
          <th class="p-2 border">Answer1</th>
          <th class="p-2 border">Answer2</th>
          <th class="p-2 border">Answer3</th>
          <th class="p-2 border">Answer4</th>
          <th class="p-2 border">Correct Answer</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in storeQuestions.computedFilterQuestions"
          :key="item.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="border p-2">{{ item.question }}</td>
          <td class="border p-2">{{ item.answer1 }}</td>
          <td class="border p-2">{{ item.answer2 }}</td>
          <td class="border p-2">{{ item.answer3 }}</td>
          <td class="border p-2">{{ item.answer4 }}</td>
          <td class="border p-2">{{ item.correct_answer }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
