<template>
  <div>

    <div id="page-content" class="container">
      <div id="cards" style="display: block;">
        <div class="page-title" style="width: 100%; margin-bottom: 35px;">
          <span class="home-dir">
            <router-link to="/staff-home">Trang chủ</router-link>
          </span>
          Tài khoản {{fullname}}
          <button
            id="add-acc-btn"
            class="button-small"
            style="float: right"
          >TẠO THẺ</button>
        </div>
        <div class="container" style="padding: 0px 100px">
          <div class="card-container">
            <div v-for="account in accounts" :key="account.id">
              <Card
                :accountNumber="account.accountNumber"
                :balance="account.balance"
                :type="'add'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Card from "@/components/Card.vue";

export default {
  data() {
    return {
      fullname: ""
    };
  },
  components: {
    Card
  },
  computed: {
    ...mapState(["accounts"])
  },
  created() {
    var id = this.$route.params.id;
    axios
      .get(`http://192.168.0.35:3000/accounts/${id}`, {
        headers: {
          "x-access-token": this.$store.state.user.access_token
        }
      })
      .then(response => {
        // alert(JSON.stringify(response));
        if (response.data.msg == "success!") {
          this.fullname = response.data.user.fullname;
          this.$store.dispatch("SetListAccount", response.data.accounts);
        }
      });
  },
};
</script>
