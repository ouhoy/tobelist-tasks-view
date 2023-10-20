<script setup lang="ts">

import Options from "@/components/Options.vue";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {ref, watch} from "vue";
import {db} from "@/firebase/config";

interface Task {
  id: string,
  title: string,
  complete: boolean
}


const {task} = defineProps<{
  task: Task
}>()

const emit = defineEmits()
const isSelected = ref(false);


async function handleDelete() {
  const docRef = doc(db, "tasks", task.id);
  await deleteDoc(docRef)
}

function handleCheck() {
  const docRef = doc(db, "tasks", task.id);
  updateDoc(docRef, {
    complete: !task.complete
  })
}

function handleCancel() {
  isSelected.value = false;
  emit("cancel")
}

function handleEdit() {
  isSelected.value = true;
   emit("edit", task)

}

</script>

<template>

  <li :key="task?.id"
      :class="{'bg-gray-50': isSelected}"
      class=" task w-full  flex items-center justify-between  border-b border-gray-200 rounded-t-lg dark:border-gray-600">
    <div class="  flex items-center pl-3">
      <input @click="handleCheck" :id="task?.id" type="checkbox" :checked="task?.complete"
             class=" cursor-pointer rounded-full w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
      <label
          class="  w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
          task.title
        }}</label>
    </div>
    <Options @delete="handleDelete" @cancel="handleCancel" :isSelected="isSelected" @edit="handleEdit" :key="task?.id"/>

  </li>
</template>

<style scoped>

li:last-child {
  border-bottom: 0 !important;
}

input[type="checkbox"] {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-size: 60% !important;
}

</style>