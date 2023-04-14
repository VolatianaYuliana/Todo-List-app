<template>
  <form @submit.prevent="functionTodo">
    <div class="d-flex flex-column mb-2">
      <div class="p-2 mb-2 ms-0">
        <button
          type="button"
          class="btn btn-primary me-4"
          @click="searchInput(null, true)"
        >
          Add todo
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="searchInput(null, false)"
        >
          Search todo
        </button>
      </div>

      <div class="input-group mb-3" v-if="showInput">
        <input
          type="text"
          name="todo"
          class="form-control"
          :placeholder="shifting"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="inputValue"
          @input="filterTodos"
          v-focus
        />
        <button
          class="btn btn-primary"
          type="submit"
          id="button-addon2"
          v-if="shifting === 'Add something to your list'"
        >
          +
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
const showInput = ref(false);
const shifting = ref("");
const inputValue = ref("");
const menuBtn = ref(null);
const emit = defineEmits(["add", "search", "show", "find"]);

function searchInput(event, arg) {
  if (arg) {
    shifting.value = "Add something to your list";
    emit("show");
  } else {
    shifting.value = "Search todo";
  }
  menuBtn.value = arg;
  showInput.value = true;
  inputValue.value = "";
}

function functionTodo() {
  if (menuBtn.value) {
    emit("add", inputValue.value);
    inputValue.value = "";
  } else {
    emit("find", inputValue.value.trim());
  }
}
function filterTodos(event) {
  emit("search", event.target.value.trim());
}
</script>
