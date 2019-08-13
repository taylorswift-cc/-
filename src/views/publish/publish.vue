<template>
  <div class="pubcontainer">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="pubForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor :options="editorOption" v-model="pubForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="pubForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="pubForm.cover.type ===1">
            <my-updata v-model="pubForm.cover.images[0]"></my-updata>
          </div>
          <div v-else>
            <my-updata v-model="pubForm.cover.images[0]"></my-updata>
            <my-updata v-model="pubForm.cover.images[1]"></my-updata>
            <my-updata v-model="pubForm.cover.images[2]"></my-updata>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-select v-model="pubForm.channel_id"></my-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  methods: {
    async publish (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.pubForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发布成功')
      this.$router.push('article')
    }
  },
  data () {
    return {
      pubForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },

      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
