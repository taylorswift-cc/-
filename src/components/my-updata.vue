<template>
  <div class="myContainer">
    <div class="default" @click="dialogVisible = true">
      <img :src="value || null" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="imageForm.collect" size="mini" @change="changeCol">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="itemList">
            <div
              @click="ChosenImage = item.url"
              class="item"
              :class="{current:ChosenImage===item.url}"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            style="text-align:center"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="imageForm.per_page"
            :current-page="imageForm.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            style="text-align:center"
            name="image"
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
          >
            <img v-if="uploadImage" :src="uploadImage" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'my-updata',
  data () {
    return {
      imageForm: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      ChosenImage: null,
      uploadImage: null,
      total: 0,
      images: [],
      headers: { Authorization: `Bearer ${store.getUser().token}` }
    }
  },
  props: ['value'],
  methods: {
    confirm () {
      this.dialogVisible = false
      if (this.activeName === 'image') {
        this.defaultImg = this.ChosenImage
      } else {
        this.defaultImg = this.uploadImage
      }
      this.$emit('input', this.defaultImg)
    },
    uploadSuccess (res) {
      this.uploadImage = res.data.url
    },
    changeCol () {
      this.getImage()
    },
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imageForm })
      this.images = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.imageForm.page = newPage
      this.getImage()
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style lang="less" scoped>
.myContainer {
  .default {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    background: url(../assets/images/default.png) no-repeat center/cover;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .itemList {
    margin-top: 10px;
    .item {
      display: inline-block;
      width: 160px;
      height: 160px;
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        object-fit: cover;
      }
    }
    .current {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 160px;
        background: rgba(0, 0, 0, 0.5) url(../assets/images/selected.png)
          no-repeat center/50px;
      }
    }
  }
}
</style>
