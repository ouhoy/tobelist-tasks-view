<script setup lang="ts">


import {ref} from "vue";
import useClickOutside from "@/composables/useClickOutside";


const {isSelected} = defineProps<{
  isSelected: boolean
}>()
const emit = defineEmits();
const showOptions = ref(false);
const optionsModal = ref(null)


useClickOutside(optionsModal, ()=>{
  showOptions.value = false;
})
function handleClick() {
  showOptions.value = !showOptions.value
  if (!showOptions.value) {
    emit("cancel")
  }
}

function handleDelete(){
  showOptions.value = false;
  emit("delete")
}

function handleEdit() {
  showOptions.value = !showOptions.value;

  emit("edit")
}

</script>

<template>
  <div ref="optionsModal" class="options-container">
    <span @click="handleClick" :class="{'show-options-icon':showOptions} "
          class="options-icon  text-gray-500">...</span>
    <div v-if="showOptions" id="dropdown"

         class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
          <a href="#" @click="handleEdit"
             class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
          <a href="#" @click="handleDelete"
             class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
        </li>

      </ul>
    </div>


  </div>
</template>

<style scoped lang="scss">
.options-container {
  position: relative;
}

#dropdown {
  position: absolute;
  right: 24px;
  transition: all .2s ease-in-out;

}

.options-icon {
  font-family: system-ui;
  font-size: 18px;
  font-weight: bolder;
  transform: rotate(90deg);
  position: absolute;
  right: 8px;
  top: -8px;
  cursor: pointer;
  opacity: 0;
  transition: all .1s ease-in-out;
}

.show-options-icon {
  opacity: 1 !important;

}

.task:hover .options-icon {
  opacity: 1;


}
</style>