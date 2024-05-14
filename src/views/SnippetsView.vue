<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
const lists = ref({})
async function getData() {
  const { data } = await supabase
    .from('snippets')
    .select()
    .order('created_at', { ascending: false })
    .range(0, 50)
  lists.value = data
  console.log(data)
}
onMounted(() => {
  getData()
})

function formatDateToYMD(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num
  }
  let d = new Date(date)

  var year = d.getFullYear()
  var month = padZero(d.getMonth() + 1)
  var day = padZero(d.getDate())

  return year + '-' + month + '-' + day
}
</script>

<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Language</th>
              <th>Description</th>
              <th>Created</th>
              <th>Owner</th>
            </tr>
          </thead>
          <!-- <tfoot>
            <tr>
              <th>Language</th>
              <th>Title</th>
              <th>Created</th>
              <th>Owner</th>
            </tr>
          </tfoot> -->
          <tbody>
            <tr v-for="item in lists" :key="item.uuid">
              <th>{{ item.lang }}</th>

              <td>
                <RouterLink :to="`/snippet/${item.uuid}`">{{
                  item.desc || 'no description'
                }}</RouterLink>
              </td>
              <td>{{ formatDateToYMD(item.created_at) }}</td>
              <td>{{ item.username || '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
