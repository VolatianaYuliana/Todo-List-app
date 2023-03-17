<template>
  <form class="input-group mb-3" @submit.prevent="addTodo">
    <input
      type="text"
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
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo">
        <input
          class="form-check-input me-1"
          type="checkbox"
          id="firstCheckbox"
          v-model="todo.completed"
        />
        <label class="form-check-label" for="firstCheckbox" :class="{'text-decoration-line-through' : todo.completed}">
        {{
          todo.name
        }}</label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const inputValue = ref("");
const todos = ref([
  {
    name: "First checkbox",
    completed: false,
  },
]);
function addTodo() {
  todos.value.push({
    name: inputValue.value,
    completed: false,
  });
  inputValue.value = "";
}
</script>
