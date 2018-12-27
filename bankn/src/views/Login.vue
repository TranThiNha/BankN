
<template>
  <div id="bg">
    <div class="container">
      <div class="logo">
        <img src="/icons/logo-white-login.png">
      </div>
      <div class="login-form">
        <div class="login-title">
          <span>Đăng nhập</span>
        </div>
        <div id="form">
          <form v-on:submit.prevent="login">
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Đăng nhập</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập tên đăng nhập" v-model="dataLogin.username"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Mật khẩu</label>
              <input
                type="password"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập mật khẩu" v-model="dataLogin.password"
              >
            </div>
            <!-- <vue-recaptcha @verify="onVerify" sitekey="6LewKIUUAAAAAP1n2vt257R034CUmGSlsHNsJFaU"></vue-recaptcha> -->
            <div style="margin-top: 30px">
              <button
                type="submit"
                class="button-big"
                style="width: 100%;"
              >Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      dataLogin: {}
    }
  },
  components: {
    // VueRecaptcha
  },
  methods: {
    onVerify: function(response) {
      //chỗ này là hiện cái nút lên nè
    },
    login() {
      // this.$router.replace("/home");

      // var passmd5 = md5($("#password").val());
      // this.dataLogin.password = passmd5;
        axios
          .post(`http://192.168.0.116:3000/auth`, this.dataLogin)
          .then(response => {
            // alert(JSON.stringify(response));
            if (response.data.auth == 1){
              var user = {
                role: response.data.role,
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                id: response.data.id
              };
              this.$store.dispatch("Login", user);
              this.$router.replace("/home");
            } else {
              alert("Sai");
            }
          })
          .catch(err => {
            alert(err);
          });
    }
  }
};
</script>


<style scoped>
#bg {
  background: url(/imgs/bg.png);
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.logo {
  padding-top: 40px;
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  width: 375px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 35px;
  padding-top: 25px;
  margin-left: auto;
  margin-right: auto;
}

.login-title {
  font-size: 24px;
  font-weight: 900;
  color: #001339;
  text-align: center;
  margin-bottom: 20px;
}
</style>