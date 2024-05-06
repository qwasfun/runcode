<script setup>
import { onMounted, ref } from 'vue'
import Account from '../components/UserAccount.vue'
import { supabase } from '../supabase'

const result = ref('')
const form = ref({
  files: [
    {
      filename: 'main.c',
      content: ''
    }
  ],
  lang: 'c'
})

async function save() {
  console.log(form.value)
  // return
  const { error, data } = await supabase.from('snippets').insert(form.value).select()

  console.log('save err', error)
  console.log('save data', data)
}

function run() {
  console.log('run')
}
</script>

<template>
  <main>
    <form>
      <label for="filename">文件名<input type="text" v-model="form.files[0].filename" /> </label>
      <label for="input">描述<input type="text" v-model="form.desc" /> </label>
      <div>
        <textarea cols="100" rows="10" v-model="form.files[0].content"></textarea>
      </div>
      <label for="input">参数输入<input type="text" v-model="form.input" /> </label>
      <label for="input"
        >语言类型<select v-model="form.lang">
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
