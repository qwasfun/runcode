<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <header><RouterLink to="/auth/login">登录 / 注册</RouterLink></header>
    <header><RouterLink to="/ProfileView"></RouterLink></header>
    <header></header>
    <div>
      <RouterLink to="/auth/profile">profile</RouterLink>
    </div>
    <div><RouterLink to="/snippets">snippets</RouterLink></div>
    <div><RouterLink to="/snippets/:id">snippets id</RouterLink></div>
    <div><RouterLink to="/new">new</RouterLink></div>
    <div><RouterLink to="/about">about</RouterLink></div>

    <div>welcome</div>
  </main>
</template>
