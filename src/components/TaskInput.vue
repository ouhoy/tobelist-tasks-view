<script lang="ts">

import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

export default {
  props: {
    editedTask: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTask: '',
      method: 'add',
      error: '',
    }
  },
  watch: {
    editedTask() {
      this.method = "update"
      this.error = "";
      this.newTask = this.editedTask?.title

    }
  },
  methods: {
    async handleSubmit() {
      this.error = ''
      if (!this.newTask) {
        this.error = "You need to describe the task first ^^";
        return
      }

      if (this.method === "add") {
        const collectionReference = collection(db, "tasks");

        await addDoc(collectionReference, {
          title: this.newTask,
          complete: false,

        })
        this.newTask = ''
      }

      if (this.method === "update") {
        const docRef = doc(db, "tasks", this.editedTask.id);
        await updateDoc(docRef, {
          title: this.newTask,
        })
        this.newTask = ''
        this.method= "add"

      }


    }
  }
}
</script>

<template>
  <form class="mt-2.5" @submit.prevent="handleSubmit">
    <div class="relative">

      <input type="search" id="default-search" autocomplete="nope"
             class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Task of the day..." v-model="newTask">

      <button type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ method[0].toUpperCase() + method.slice(1) }}
      </button>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-semibold">Oops!</span>
      {{ error }}</p>
  </form>
</template>

<style scoped>

</style>