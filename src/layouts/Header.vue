<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- <header><RouterLink to="/auth/login">登录 / 注册</RouterLink></header>
  <header><RouterLink to="/ProfileView"></RouterLink></header> -->

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item"> Home </RouterLink>

        <RouterLink to="/snippets" class="navbar-item"> Snippets </RouterLink>
        <RouterLink to="/snippets" class="navbar-item"> My Snippets </RouterLink>
        <RouterLink to="/about" class="navbar-item"> About </RouterLink>

        <div class="navbar-item">
          <div class="buttons">
            <RouterLink to="/new" class="button is-primary"> New Snippet </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <RouterLink to="/auth/login" class="button is-light"> Log in </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
