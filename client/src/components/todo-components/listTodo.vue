<template>
  <ul class="list-group">
    <li
      class="list-group-item d-flex justify-content-between"
      v-for="todo in matchingTodo"
      :key="todo.id"
    >
      <div>
        <input
          class="form-check-input me-1"
          type="checkbox"
          id="firstCheckbox"
          v-model="todo.completed"
          @change="keySave(todo)"
        />

        <label
          class="form-check-label"
          for="firstCheckbox"
          :class="{ 'text-decoration-line-through': todo.completed }"
        >
          <span v-if="editing !== null && editing.id === todo.id">
            <input
              type="text"
              v-model="editing.name"
              @keydown.enter="keySave(editing)"
              v-focus
            />
          </span>
          <span v-else>
            {{ todo.name }}
          </span>
        </label>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-outline-info mx-3"
          @click="
            editing !== null && editing.id === todo.id
              ? keySave(editing)
              : editTodo(todo)
          "
        >
          {{ btnEdit(todo) }}
        </button>
        <span @click="removeTodo(todo)"
          ><i class="bi bi-trash text-danger btn"></i
        ></span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  matchingTodo: {
    type: Array,
    required: true,
  },
});
const editing = ref(null);
const emit = defineEmits(["remove", "edit", "complete"]);
function removeTodo(todo) {
  emit("remove", todo);
}
function editTodo(todo) {
  editing.value = todo;
}
function btnEdit(todo) {
  return editing.value !== null && editing.value.id === todo.id
    ? "Save"
    : "Edit";
}
function keySave(todo) {
  emit("edit", todo);
  editing.value = null;
}
</script>

<script>
export const focusTodo = {
  mounted(el) {
    el.focus();
  },
};
</script>
