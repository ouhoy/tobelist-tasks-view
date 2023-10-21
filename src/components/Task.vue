<script>
import Options from "@/components/Options.vue";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";
export default {
  components: {Options},
  props: ['task'],
  data() {
    return {
      isSelected: false,
      taskLabel: null,
    }
  },
  methods: {
    handleDelete() {
      const docRef = doc(db, "tasks", this.task.id);
      deleteDoc(docRef);
    },
    handleCheck() {
      const docRef = doc(db, "tasks", this.task.id);
      updateDoc(docRef, {
        complete: !this.task.complete
      });
    },
    handleCancel() {
      this.isSelected = false;
      this.$emit('cancel');
    },
    handleEdit() {
      this.isSelected = true;
      this.$emit('edit', this.task);
    }
  },
  mounted() {
    this.taskLabel = this.$refs.taskLabel;
  },
  watch: {
    'task.complete': {
      handler(val) {
        if (this.taskLabel) {
          this.taskLabel.style.textDecoration = val ? 'line-through' : 'none';
        }
      },
      immediate: true
    },
    task(oldVal, newVal) {
      this.isSelected = false

    }
  },
}
</script>

<template>
  <li :key="task.id"
      :class="{'bg-gray-50': isSelected}"
      class="task w-full  flex items-center justify-between  border-b border-gray-200 rounded-t-lg dark:border-gray-600">
    <div class="  flex items-center pl-3">
      <input @click="handleCheck" :id="task.id" type="checkbox" :checked="task.complete"
             class=" cursor-pointer rounded-full w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
      <label ref="taskLabel"
          class="  w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
          task.title
        }}</label>
    </div>
    <Options @delete="handleDelete" @cancel="handleCancel" :isSelected="isSelected" @edit="handleEdit" :key="task.id"/>
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