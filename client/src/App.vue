<script setup>
import { provide, ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter()
const checkuser = ref(false);
provide("user", checkuser);

function logOut () {
checkuser.value = false;
localStorage.clear()
router.push('/signin')
}
</script>

<template>
  <header class="d-flex justify-content-center py-3 border-bottom">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </li>
      <li class="nav-item"  v-show="checkuser">
        <RouterLink to="/todo" class="nav-link">Todo</RouterLink>
      </li>
      <li class="nav-item"  v-show="!checkuser">
        <RouterLink to="/signup" class="nav-link"> Sign up </RouterLink>
      </li>
      <li class="nav-item"  v-show="!checkuser">
        <RouterLink to="/signin" class="nav-link"> Sign in </RouterLink>
      </li>
      <li class="nav-item"  v-show="checkuser">
        <button class=" btn btn-danger " @click="logOut()">Log out</button>
      </li>
    </ul>
  </header>
  <div class="container mt-3">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
