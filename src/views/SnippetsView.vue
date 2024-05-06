<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
const lists = ref({})
async function getData() {
  const { data, error } = await supabase.from('snippets').select().range(0, 9)
  lists.value = data
  console.log(data)
}
onMounted(() => {
  getData()
})

console.log(lists.value)
</script>

<template>
  <main>
    <div>列表</div>

    <ul>
      <li v-for="item in lists" :key="item.uuid">
        <RouterLink :to="`/snippet/${item.uuid}`">{{ item.desc || 'no description' }}</RouterLink>
      </li>
    </ul>
  </main>
</template>
