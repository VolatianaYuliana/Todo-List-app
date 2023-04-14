<template>
  <formTodo
    @add="saveTodo"
    @search="searchTodo"
    @show="showAllTodos"
    @find="findTodos"
  />
  <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
  <div v-if="todos?.length">
    <listTodo
      :matchingTodo="matchingTodo"
      @remove="removeTodo"
      @edit="editTodo"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import {
  getData,
  createData,
  deleteData,
  updateData,
} from "../../composables/fetcher";
import formTodo from "./formTodo.vue";
import listTodo from "./listTodo.vue";

const todos = ref([]);
const error = ref(null);
const searchKeyword = ref("");
const filteredTodos = ref([]);
const showAll = ref(false);
onMounted(async () => {
  const { data, error: getDataError } = await getData("tasks");
  if (getDataError) {
    error.value = getDataError;
  }
  todos.value = [...data];
});
const saveTodo = async (inputVal) => {
  showAll.value = true;
  if (inputVal !== "") {
    const { data, error: createDataError } = await createData("tasks", {
      name: inputVal,
    });
    if (createDataError) {
      error.value = createDataError;
      return;
    }
    todos.value.push(data);
  }
};
const removeTodo = async (todo) => {
  const { data, error: removeDataError } = await deleteData(`tasks/${todo.id}`);
  if (removeDataError) {
    error.value = removeDataError;
  }
  if (data.message === "Delete successfully") {
    todos.value = todos.value.filter((t) => t.id !== todo.id);
  }
};
const editTodo = async (todo) => {
  const { data, error: editDataError } = await updateData(`tasks/${todo.id}`, {
    name: todo.name,
    completed: todo.completed,
  });
  if (editDataError) {
    error.value = editDataError;
  }
  todos.value = todos.value.map((value) => {
    if (value.id === todo.id) {
      return { ...value, name: data.name, completed: data.completed };
    }
    return value;
  });
};

const searchTodo = async (typedValue) => {
  searchKeyword.value = typedValue;
  showAll.value = false;
  error.value = "";
  const { data, error: getDataError } = await getData(`search?q=${typedValue}`);

  if (getDataError) {
    error.value = getDataError;
  }
  filteredTodos.value = [...data.data];
};

const matchingTodo = computed(() => {
  if (!searchKeyword.value || showAll.value) {
    return todos.value;
  }
  return filteredTodos.value;
});

function showAllTodos() {
  error.value = ""
  showAll.value = true;
}
async function findTodos(inputValTodo) {
  showAll.value = false;
  const { data, error: getDataError } = await getData(
    `search?q=${inputValTodo}`
  );
  if (data.data < 1) {
    error.value = "can't find the todo";
  }
  if (getDataError) {
    error.value = getDataError;
  }
  filteredTodos.value = [...data.data];
}
</script>
