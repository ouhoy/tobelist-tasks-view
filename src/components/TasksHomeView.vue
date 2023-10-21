<script setup lang="ts">

import Task from "@/components/Task.vue";
import getCollection from "@/composables/getCollection";
import TaskInput from "@/components/TaskInput.vue";
import {ref} from "vue";

interface Task {
  id: string,
  title: string,
  complete: boolean
}

const {documents: tasks} = getCollection("tasks", "SJvI31P1pHO1vWjlkdcvbVnoXge2")
const editedTask = ref<Task>({ id: '',
  title: '',
  complete: false,})

function handleEdit(task: Task){
   editedTask.value = task
}
function handleUpdate() {
  editedTask.value = {title: "", complete: false, id: ""}
  console.log("Updated")
}
</script>

<template>

  <div class="tasks-container mt-16 mx-auto">
    <ul v-if="tasks?.length" class=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <Task v-for="task in tasks" @edit="handleEdit" :task="task"/>
    </ul>
    <TaskInput :editedTask="editedTask" @update="handleUpdate"/>
  </div>

</template>

<style scoped>

.tasks-container {
  max-width: 768px;
  width: 95%;
}
</style>