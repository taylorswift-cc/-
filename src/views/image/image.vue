<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div>
      <el-radio-group v-model="imgForm.collect" size="small" @change="allOrCol">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right" @click="openDialog">添加素材</el-button>
      <div class="item_box">
        <div class="item" v-for="item in images" :key="item.id">
          <img style="width: 200px; height: 200px" :src="item.url" />
          <div class="opacity_box" v-if="!imgForm.collect">
            <span
              class="el-icon-star-off"
              :class="{current:item.is_collected}"
              @click="collect(item)"
            ></span>
            <span class="el-icon-delete" @click="deleteCol(item)"></span>
          </div>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" style="text-align:center">
        <el-upload
          name="image"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :headers="headers"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
      <div>
        <el-pagination
          v-if="total>imgForm.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          class="paging"
          :current-page="imgForm.page"
          :page-size="imgForm.per_page"
          @current-change="togglePage"
        ></el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import store from '@/store/store.js'
export default {
  data () {
    return {
      imgForm: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      headers: { Authorization: `Bearer ${store.getUser().token}` },
      imageUrl: null
    }
  },
  methods: {
    uploadSuccess (res) {
      this.$message.success('素材上传成功')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    allOrCol (status) {
      this.imgForm.collect = status
      this.getImages()
    },
    async collect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      if (data.collect) {
        this.$message.success('添加收藏成功')
      } else {
        this.$message.success('取消收藏成功')
      }
      item.is_collected = data.collect
    },
    deleteCol (item) {
      this.$confirm('此张素材将永久删除，是否确认删除？', '警告提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${item.id}`)
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch(() => {})
    },
    togglePage (newPage) {
      this.imgForm.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imgForm })
      this.images = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.item_box {
  margin-top: 20px;
  .item {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .opacity_box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
      }
      .current {
        color: red;
      }
    }
  }
}
.paging {
  text-align: center;
}
</style>
