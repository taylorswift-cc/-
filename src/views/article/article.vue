<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form ref="searchForm" label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="searchForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-select v-model="searchForm.channel_id"></my-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getArticles">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查到 {{total}} 条数据：</div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:100px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" style="width:100px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="searchForm.per_page"
        :current-page="searchForm.page"
        style="margin-top:20px;text-align:center"
        v-if="total>searchForm.per_page"
        @current-change="togglePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dateArr: [],
      total: 0,
      articles: []
    }
  },
  watch: {
    'searchForm.channel_id': function (val) {
      if (val === '') {
        this.searchForm.channel_id = null
      }
    },
    dateArr (val) {
      if (val) {
        this.searchForm.begin_pubdate = val[0]
        this.searchForm.end_pubdate = val[1]
      } else {
        this.searchForm.begin_pubdate = null
        this.searchForm.end_pubdate = null
      }
    }
  },
  methods: {
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    togglePage (page) {
      this.searchForm.page = page
      this.getArticles()
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.searchForm })
      this.articles = data.results
      this.total = data.total_count
      console.log(this.articles)
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
