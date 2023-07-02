<template>
  <form @submit.prevent="login">
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="email"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="password"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Sign In</button>
  </form>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { instance } from "../../composables/api";
import { useRouter } from "vue-router";

export default {
  name: "SigninForm",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref(null)

    onBeforeMount(async () => {
      try {
        const checkuser = await instance.get("/todos/user");

        if (checkuser.status === 200) {
          router.push("/todo");
        }
        console.log(checkuser.data);
      } catch (e) {
        // console.log({"message": "de onbeforeMount", e});
          // error.value = e
      }
    });

    const login = async () => {
      try {
        const response = await instance.post("/auth/signin", {
          email: email.value,
          password: password.value,
        });
        // Handle successful login
        localStorage.setItem("token", response.data.token);
        router.push("/todo");
      } catch (e) {
        // Handle login error
        // console.log({"message": "de login", e});
        error.value = e.response.data.message;
      }
    };

    return {
      email,
      password,
      error,
      login,
    };
  },
};
</script>
