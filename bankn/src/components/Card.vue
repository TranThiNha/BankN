<template>
  <div>
    <!--Top-up Modal-->
    <div
      id="topup-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Nạp tiền vào tài khoản</div>
            <div style="margin: 20px 0px">
              <label class="input-normal-label">Số tiền muốn nạp</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập số tiền muốn nạp" v-model="amount"
              >
            </div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="topup-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelAddMoney()"
              >HỦY</button>
              <button
                id="topup-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="AddMoney(user)"
              >NẠP</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-item">
      <div>
        <img src="/icons/logo-lite.png">
        <img
          id="card-topup"
          src="/icons/top-up.png"
          style="float: right"
          v-if="type == 'add'"
          @click="ModalAddMoney()"
        >
        <img id="card-remove" src="/icons/delete.png" style="float: right" v-if="type == 'remove'">
      </div>
      <div style="position: absolute; bottom: 0">
        <div class="card-num">{{accountNumber}}</div>
        <div class="card-balance">
          Số dư:
          <b>{{balance}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      amount: ""
    }
  },
  computed: {
    ...mapState(["user"])
  },
  props: {
    type: String,
    accountNumber: String,
    balance: Number
  },
  methods: {
    ModalAddMoney() {
      this.$jQuery("#topup-modal").show();
    },
    CancelAddMoney() {
      this.$jQuery("#topup-modal").fadeOut();
    },
    AddMoney(user) {
      var accessinfo = {
        user: user,
        id : this.$route.params.id,
      }; 
      var newAmount = {
        accountNumber : this.accountNumber,
        amount : this.amount
      };
       axios
      .put("http://192.168.0.35:3000/accounts/balance", newAmount, {
        headers: {
          "x-access-token": this.$store.state.user.access_token,
        }
      })
      .then(response => {
        // alert(JSON.stringify(response));
        if (response.data.msg == "success!")
        {
          this.$jQuery("#topup-modal").hide();
          this.$store.dispatch("UpdateListAccount", accessinfo);
        }
      });
    }
  }
};
</script>
