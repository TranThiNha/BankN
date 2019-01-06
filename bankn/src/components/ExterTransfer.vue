<template>
  <div>
    <OTPModal
      v-if="getOTP == true"
      :type="type" typeTransfer="external"
      :sendAccount="sendAccountNumber"
      :receiAccount="receiAccountNumber"
      :amount="dataReceive.amount"
      :description="dataReceive.description"
      @InternalSuccess="HandleInternalSuccess"
    />

    <div id="cards" class="tab-content" style="display: block;">
      <div class="page-title" style="width: 100%; text-align: center">Chuyển khoản liên ngân hàng</div>
      <div class="container" style="padding: 0px 100px">
        <div class="row">
          <div class="col-sm-6 transfer-col-padding">
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Tài khoản nguồn</label>
              <div>
                <select class="select-custom" id="orig">
                  <option v-for="acc in accounts" :key="acc.id">{{acc.accountNumber}}</option>
                </select>
              </div>
            </div>
            <div class="row" style="margin-bottom: 20px;">
              <div class="col-sm-6">
                <label class="input-normal-label">Ngân hàng đích</label>
                <div>
                  <select class="select-custom short" id="bank">
                    <option v-for="bank in banks" :key="bank.id">{{bank.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <label class="input-normal-label">Số tài khoản đích</label>
                <div class="input-group" style="width: 100%">
                  <input
                    v-on:keyup.enter="submit(receiAccountNumber)"
                    v-model="receiAccountNumber"
                    type="number"
                    class="input-normal no-spin"
                    placeholder="Tài khoản đích"
                    style="width: 90%; margin-top: -3px; height:90%; margin-left: -5px;"
                  >
                  <img
                    @click="Search()"
                    id="rep-search-btn"
                    src="/icons/search.png"
                    style="float: right"
                  >
                </div>
              </div>
              <button
                v-if="isNew == true"
                class="button-small"
                @click="AddContact()"
                style="height: 36px; width: 91.5%; margin-top: 5px;margin-left: 14px; text-transform: none; font-size: 14px; background: #61667D"
              >+ Thêm vào danh sách người nhận</button>
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Họ tên người nhận</label>
              <input
                v-model="dataReceive.full_name"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Họ tên người nhận"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Email</label>
              <input
                v-model="dataReceive.email"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Email người nhận"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Số điện thoại</label>
              <input
                v-model="dataReceive.phoneNumber"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Số điện thoại người nhận"
              >
            </div>
          </div>
          <div class="col-sm-6 transfer-col-padding col-line">
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Số tiền chuyển</label>
              <div class="input-group" style="width: 100%">
                <input
                  v-model="dataReceive.amount"
                  class="money-input"
                  type="number"
                  placeholder="Nhập số tiền muốn chuyển"
                  style="width: 90%"
                >
                <span style="float: right; margin-top: -3px;">VNĐ</span>
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Nội dung chuyển</label>
              <input
                v-model="dataReceive.discription"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập nội dung chuyển"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Hình thức thanh toán phí</label>
              <div class="input-normal">
                <div>Người gửi trả phí </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 15px; text-align: center">
          <button
            id="otp-veri"
            type="submit"
            class="button-med"
            style="width: 324px;"
            @click="ExterTransfer()"
          >
            Chuyển
            khoản
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import OTPModal from "@/components/OTPModal.vue";

export default {
  data() {
    return {
      isNew: false,
      sendAccountNumber: "",
      receiAccountNumber: "",
      receiBank: "",
      dataReceive: {
        full_name: "",
        email: "",
        phoneNumber: "",
        amount: Number,
        description: ""
      },
      type: 0
    };
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["banks"]),
    getOTP() {
      return this.$store.state.getOTP;
    }
  },
  components:{
    OTPModal
  },
  created() {
    this.$store.dispatch("AnotherBanks");
  },
  methods: {
    Search() {},
    submit(receiAccountNumber) {
      var flag = false;
      this.$store.state.contacts.forEach(element => {
        if (element.account == receiAccountNumber) {
          flag = true;
        }
      });
      if (flag == false) {
        this.isNew = true;
      }

      this.sendAccountNumber = this.$jQuery("#orig option:selected").val();
      this.receiBank = this.$jQuery("#bank option:selected").val();

      var tmpbanks = this.$store.state.banks;
      var rsBank;
      tmpbanks.forEach(element => {
        if (element.name == this.receiBank) {
          rsBank = element;
        }
      });

      alert(JSON.stringify(rsBank));

      axios
        .get(
          `http://${rsBank.domain}/account/accountNumber/${receiAccountNumber}`
        )
        .then(response => {
          alert(JSON.stringify(response));
          if (response.status == 200) {
            this.$store.dispatch("SetSelectedBank", rsBank);
            this.receiAccountNumber = receiAccountNumber;
            this.dataReceive.full_name = response.data[0].displayname;
            this.dataReceive.email = response.data[0].email;
            this.dataReceive.phoneNumber = response.data[0].phone;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    AddContact() {},
    ExterTransfer() {
      this.$store.dispatch("GetOTP");
    }
  },
  watch: {
    getOTP: function(_new) {
      getOTP = _new;
    }
  }
};
</script>