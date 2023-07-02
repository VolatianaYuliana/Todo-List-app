<template>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="password"
      />
    </div>
    <div class="mb-3">
      <label for="lastname" class="form-label">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="lastname"
        v-model="lastname"
      />
    </div>
    <div class="mb-3">
      <label for="firstname" class="form-label">First Name</label>
      <input
        type="text"
        class="form-control"
        id="firstname"
        v-model="firstname"
      />
    </div>
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </form>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { instance } from "../../composables/api";
import { useRouter } from "vue-router";

export default {
  name: "SignupForm",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const firstname = ref("");
    const lastname = ref("");

    onBeforeMount(async () => {
      try {
        const checkuser = await instance.get("/todos/user");

        if (checkuser) {
          router.push("/todo");
        }
        console.log(checkuser);
      } catch (error) {
        console.log(error);
      }
    });

    const submitForm = async () => {
      try {
        const data = await instance.post("/auth/signup", {
          email: email.value,
          password: password.value,
        });
        console.log(data);
        localStorage.setItem("token", data.data.token);
        router.push("/todo");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      firstname,
      lastname,
      submitForm,
    };
  },
};
</script>
