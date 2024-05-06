<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
const snippet = ref({
  files: [{}]
})

const id = route.params.id
async function getData() {
  const { data } = await supabase.from('snippets').select().eq('uuid', id)
  snippet.value = data[0]
  console.log(data)
}
onMounted(() => {
  getData(id)
})

const result = ref('')

async function run() {
  // let url = `https://glot.io/api/run/${snippet.value.lang}/latest`
  // let url = `/run/${snippet.value.lang}/latest`
  let url = `${import.meta.env.VITE_GLOT_RUN_URL}?lang=${snippet.value.lang}&version=latest`

  let snippetClone = snippet.value

  axios
    .post(
      url,
      {
        files: snippetClone.files,
        stdin: snippet.value.stdin
      },
      {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_GLOT_TOKEN}`
        }
      }
    )
    .then((res) => {
      let data = res.data
      console.log(data.error)
      if (data.error === '') {
        result.value = data.stdout
      } else {
        result.value = data
      }
    })
}

async function save() {
  const { error } = await supabase
    .from('snippets')
    .update({ ...snippet.value })
    .eq('uuid', id)
    .select()

  console.log('save err', error)
}
</script>

<template>
  <main>
    <form>
      <label for="filename">文件名<input type="text" v-model="snippet.files[0].name" /> </label>
      <label for="input">描述<input type="text" v-model="snippet.desc" /> </label>
      <div>
        <textarea cols="100" rows="10" v-model="snippet.files[0].content"></textarea>
      </div>
      <label for="input">参数输入<input type="text" v-model="snippet.stdin" /> </label>
      <label for="input"
        >语言类型<select v-model="snippet.lang">
          <option value="c">c</option>
          <option value="javascript">javascript</option>
          <option value="typescript">typescript</option>
        </select>
      </label>

      <button @click.prevent="save">保存</button>
      <button @click.prevent="run">运行</button>

      <div>
        <div>运行结果</div>
        <div>{{ result }}</div>
      </div>
    </form>
  </main>
</template>
