
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
          <form>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Đăng nhập</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập tên đăng nhập"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Mật khẩu</label>
              <input
                type="password"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập mật khẩu"
              >
            </div>
            <!-- <vue-recaptcha @verify="onVerify" sitekey="6LewKIUUAAAAAP1n2vt257R034CUmGSlsHNsJFaU"></vue-recaptcha> -->
            <div style="margin-top: 30px">
              <button
                @click="login()"
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
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "home",
  components: {
    VueRecaptcha
  },
  methods: {
    onVerify: function(response) {
      //chỗ này là hiện cái nút lên nè
    },
    login() {
        //call api login
        this.$router.replace('/');
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