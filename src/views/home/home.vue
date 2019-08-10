<template>
  <el-container class="container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="aside_top" :class="{current:isCollapse}"></div>
      <el-menu
        class="my_menu"
        :collapse="isCollapse"
        :default-active="$route.path"
        :collapse-transition="false"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="change"></span>
        <span class="text">江苏传智播客XXXX公司</span>
        <el-dropdown class="my_dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" style="width:30px;vertical-align:middle" />
            <span>葫芦小金刚</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store/store.js'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    change () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      this.$router.push('/login')
      store.clearUser()
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-header {
    height: 60px;
    line-height: 55px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .my_dropdown {
      float: right;
    }
  }
  .el-aside {
    background-color: #002033;
    .aside_top {
      width: 100%;
      height: 60px;
      background: url(../../assets/images/logo_admin.png) no-repeat center/140px;
    }
    .current {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px;
    }
    .my_menu {
      border-right: 0;
    }
  }
}
</style>
