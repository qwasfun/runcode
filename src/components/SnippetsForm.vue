<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
const router = useRouter()

const snippet = ref({
  files: [{}]
})
async function getData(id) {
  const { data } = await supabase.from('snippets').select().eq('uuid', id)
  snippet.value = data[0]
  console.log(data)
}
const props = defineProps({
  id: {
    type: String
  }
})
onMounted(() => {
  if (props.id) {
    getData(props.id)
  }
})

const activeFileIndex = ref(0)
function changeActiveFileIndex(index) {
  activeFileIndex.value = index
}

const stdout = ref('')

function addFile() {
  snippet.value.files.push({ name: '', content: '' })
}

function deleteFile(index) {
  snippet.value.files.splice(index, 1)
}

async function save() {
  let error
  let data
  if (props.id) {
    // 编辑
    const res = await supabase
      .from('snippets')
      .update({ ...snippet.value })
      .eq('uuid', props.id)

    error = res.error
  } else {
    // 新增
    const res = await supabase.from('snippets').insert(snippet.value).select()
    error = res.error
    data = res.data

    router.push(`/snippet/${data[0].uuid}`)
  }
  console.log(error)
}

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
        stdout.value = data.stdout
      } else {
        stdout.value = data
      }
    })
}
</script>
<template>
  <form>
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="columns"></div>
        <div class="tabs is-toggle field-body">
          <ul>
            <li
              v-for="(item, index) in snippet.files"
              :key="index"
              :class="activeFileIndex == index ? 'is-active' : ''"
              class="field has-addons mr-1"
              @click="changeActiveFileIndex(index)"
            >
              <p class="control">
                <input
                  v-model="snippet.files[index].name"
                  class="input is-small"
                  type="text"
                  placeholder="Filename including extension…"
                />
              </p>
              <p class="control">
                <button class="button is-danger is-small" @click.prevent="deleteFile(index)">
                  del
                </button>
              </p>
            </li>
            <li class="field">
              <button class="button is-primary is-small" @click.prevent="addFile()">add</button>
            </li>
          </ul>
        </div>

        <div class="field" v-for="(item, index) in snippet.files" :key="index">
          <div class="control" v-show="activeFileIndex == index">
            <textarea
              v-model="snippet.files[index].content"
              rows="25"
              class="textarea is-small"
              placeholder="Textarea"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-small">描述</label>
          <div class="control">
            <input
              v-model="snippet.desc"
              class="input is-small"
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small">语言类型</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="snippet.lang">
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              v-model="snippet.stdin"
              rows="8"
              class="textarea is-small"
              placeholder="input"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              v-model="stdout"
              rows="9"
              class="textarea is-small"
              placeholder="output"
              readonly
            ></textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button @click.prevent="save" class="button is-link">保存</button>
          </div>
          <div class="control">
            <button @click.prevent="run" class="button is-link is-light">运行</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
