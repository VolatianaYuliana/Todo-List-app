<template>
  <form class="input-group mb-3" @submit.prevent="addTodo">
    <input
      type="text"
      name="todo"
      class="form-control"
      placeholder="add something to your list"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
      v-model="inputValue"
    />
    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
      +
    </button>
  </form>
  <div v-if="error">{{ error }}</div>
  <div v-if="todos?.length">
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo">
        <input
          class="form-check-input me-1"
          type="checkbox"
          id="firstCheckbox"
          v-model="todo.completed"
        />
        <label
          class="form-check-label"
          for="firstCheckbox"
          :class="{ 'text-decoration-line-through': todo.completed }"
        >
          {{ todo.name }}</label
        >
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {getData,createData} from "../composables/fetcher";
const todos = ref([])
const inputValue = ref("");
const error = ref(null)
onMounted(async ()=>{
  const {data,error: getDataError}  = await getData("tasks");
  if (getDataError) {
    error.value = getDataError
  }
todos.value = [...data]
})


async function addTodo() {
  if (inputValue.value !== "") {
    const {data, error: createDataError} = await createData("tasks", { name: inputValue.value });
    if (createDataError) {
    error.value = createDataError
  };
    todos.value.push(data);
    inputValue.value = "";
  }
}
</script>
