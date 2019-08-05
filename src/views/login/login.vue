<template>
  <div class="container">
    <el-card class="my_card">
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
        <el-form-item>
          <img src="../../assets/images/logo_index.png" style="margin-top:10px" />
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:230px;margin-right:18px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和什么条款</el-checkbox>
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  data () {
    const checkLogin = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '15100639846',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkLogin, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post('authorizations', this.loginForm)
        .then(res => {
          store.setUser(res.data.data)
          this.$router.push('/')
        })
        .catch(() => {
          this.$message.error('手机号或验证码错误')
        })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my_card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      display: block;
      margin: 0 auto;
      width: 200px;
    }
  }
}
</style>
