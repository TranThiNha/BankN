<template>
<div class="body-admin" style="height:100vh; margin-top:-0px; padding-top:100px">
  <div class="container">
    <div class="logo">
      <img src="/icons/logo-white.png">
    </div>
    <div>
      <div class="title">Số dư ví hiện tại là</div>
      <div class="balance">{{balance}}</div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      balance: ""
    };
  },
  created() {
    axios
      .get("http://192.168.0.130:3001/balance", {
        headers: {
          "x-access-token": this.$store.state.user.access_token
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.balance = response.data.balance;
        }
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>