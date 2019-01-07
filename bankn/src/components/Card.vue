<template>
  <div class="parent" id="1">
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
                placeholder="Nhập số tiền muốn nạp"
                v-model="amount"
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
                @click="AddMoney(user, accountNumber)"
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
        <img
          id="card-remove"
          src="/icons/delete.png"
          style="float: right"
          v-if="type == 'remove'"
          @click="ModalDeleteAccount(accountNumber, balance)"
        >
      </div>
      <div style="position: absolute; bottom: 0">
        <div class="card-num card-num-format">{{accountNumber}}</div>
        <div class="card-balance">
          Số dư:
          <b>{{ balance | currency}}</b>
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
    };
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
      this.$jQuery(event.target)
        .parents(".parent")
        .find(".modal-backdrop")
        .fadeIn("fast");
    },
    CancelAddMoney() {
      this.$jQuery(event.target)
        .parents(".parent")
        .find(".modal-backdrop")
        .fadeOut("fast");
    },
    AddMoney(user, accountNumber) {
      var accessinfo = {
        user: user,
        id: this.$route.params.id
      };
      var newAmount = {
        accountNumber: accountNumber,
        amount: this.amount
      };
      var obj = event.target;
      axios
        .put("http://192.168.0.130:3000/accounts/balance", newAmount, {
          headers: {
            "x-access-token": this.$session.get("access_token")
          }
        })
        .then(ponse => {
          // alert(JSON.stringify(ponse));
          if (ponse.data.msg == "success!") {
            this.$jQuery(obj)
              .parents(".parent")
              .find(".modal-backdrop")
              .fadeOut("fast");

            this.$store.dispatch("UpdateListAccount", accessinfo);
          }
        });
    },
    ModalDeleteAccount(accountNumber, balance) {
      this.$emit("deleteAccount", accountNumber, balance);
    }
  }
};
</script>
