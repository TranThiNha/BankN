<template>
  <div>
    <!--Success Modal-->
    <div
      id="success-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;">
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div style="text-align: center; margin-bottom: 15px;">
              <img src="/icons/modal-success.png" width="58px">
            </div>
            <div class="modal-title">Thành công</div>
            <div class="modal-des">Tạo thẻ thành công
              <br>
              Mã thẻ mới của bạn là: {{newAccNumber}}
            </div>
            <div style="text-align: center; margin-top: 25px"  @click="CloseAddSucessModal(user)">
              <button
                id="smodal-close"
                class="button-med bn-close button-modal"
                style="width: 324px;"
              >ĐÓNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            @click="CreateAccount()"
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
      fullname: "",
      newAccNumber: "",
      userId: {}
    };
  },
  components: {
    Card
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["user"])
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
  methods: {
    CreateAccount() {
      this.userId = {
        userId: this.$route.params.id
      };
      axios
        .post(`http://192.168.0.35:3000/accounts`, this.userId, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          if (response.data.msg == "success!") {
            this.$jQuery("#success-modal").show();
            this.newAccNumber = response.data.accountNumber;
          } else {
            alert("Loi");
          }
        });
    },
    CloseAddSucessModal(user) {
      var accessinfo = {
        user: user,
        id: this.$route.params.id
      };
      this.$store.dispatch("UpdateListAccount", accessinfo);
      this.$jQuery("#success-modal").hide();
    }
  }
};
</script>
