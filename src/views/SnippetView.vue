<script setup>
import { useRoute } from 'vue-router'
import SnippetsForm from '../components/SnippetsForm.vue'

const route = useRoute()

const id = route.params.id
</script>

<template>
  <div class="container">
    <section class="section">
      <SnippetsForm :id="id" />
    </section>
  </div>
</template>
