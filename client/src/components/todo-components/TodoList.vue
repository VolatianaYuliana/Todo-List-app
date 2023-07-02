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
import { onMounted, ref, computed, onBeforeMount, inject } from "vue";
import formTodo from "./formTodo.vue";
import listTodo from "./listTodo.vue";
import { instance } from "../../composables/api";
import { useRouter } from "vue-router";

const todos = ref([]);
const error = ref(null);
const user = inject("user");
const searchKeyword = ref("");
const filteredTodos = ref([]);
const showAll = ref(false);
const router = useRouter();

onBeforeMount(async () => {
  try {
    const checkuser = await instance.get("/todos/user");

    user.value = checkuser.data;
  } catch (error) {
    router.push("/signin");
  }
});

onMounted(async () => {
  try {
    const { data } = await instance.get(`/todos/tasks`); // Utiliser instance pour effectuer une requête GET
    todos.value = [...data];
  } catch (err) {
    error.value = err.message;
  }
});
const saveTodo = async (inputVal) => {
  showAll.value = true;
  if (inputVal !== "") {
    try {
      const { data } = await instance.post(`/todos/tasks`, {
        // Utiliser instance pour effectuer une requête POST
        name: inputVal,
      });
      todos.value.push(data);
    } catch (err) {
      error.value = err.message;
    }
  }
};

const removeTodo = async (todo) => {
  try {
    const { data } = await instance.delete(`/todos/tasks/${todo.id}`); // Utiliser instance pour effectuer une requête DELETE
    if (data.message === "Delete successfully") {
      todos.value = todos.value.filter((t) => t.id !== todo.id);
    }
  } catch (err) {
    error.value = err.message;
  }
};
const editTodo = async (todo) => {
  try {
    const { data } = await instance.put(`/todos/tasks/${todo.id}`, {
      // Utiliser instance pour effectuer une requête PUT
      name: todo.name,
      completed: todo.completed,
    });
    todos.value = todos.value.map((value) => {
      if (value.id === todo.id) {
        return { ...value, name: data.name, completed: data.completed };
      }
      return value;
    });
  } catch (err) {
    error.value = err.message;
  }
};

const searchTodo = async (typedValue) => {
  searchKeyword.value = typedValue;
  showAll.value = false;
  error.value = "";
  try {
    const { data } = await instance.get(`/todos/search?q=${typedValue}`); // Utiliser instance pour effectuer une requête GET avec des paramètres
    filteredTodos.value = [...data.data];
  } catch (err) {
    error.value = err.message;
  }
};
const matchingTodo = computed(() => {
  if (!searchKeyword.value || showAll.value) {
    return todos.value;
  }
  return filteredTodos.value;
});

function showAllTodos() {
  error.value = "";
  showAll.value = true;
}

async function findTodos(inputValTodo) {
  showAll.value = false;
  try {
    const { data } = await instance.get(`/todos/search?q=${inputValTodo}`);
    if (data.data < 1) {
      error.value = "can't find the todo";
    } else {
      filteredTodos.value = [...data.data];
    }
  } catch (err) {
    error.value = err.message;
  }
}
</script>
