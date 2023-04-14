import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { focusTodo } from "./components/todo-components/listTodo.vue";
// import "./assets/main.css";

const app = createApp(App);
app.directive("focus", focusTodo);

app.use(router);

app.mount("#app");
