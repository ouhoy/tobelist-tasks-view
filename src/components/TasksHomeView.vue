<script setup lang="ts">

import Task from "@/components/Task.vue";
import getCollection from "@/composables/getCollection";
import TaskInput from "@/components/TaskInput.vue";


const {documents: tasks} = getCollection("tasks")
</script>

<template>

  <div class="tasks-container">
    <ul class="mt-16 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

      <Task v-for="task in tasks" :task="task"/>


    </ul>
    <TaskInput/>
  </div>

</template>

<style scoped>

.tasks-container {
  max-width: 768px;
  margin: 0 auto;
}
</style>