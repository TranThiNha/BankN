<template>
  <div>
    <OTPModal
      v-if="getOTP == true"
      :type="type" typeTransfer="internal"
      :sendAccount="sendAccountNumber"
      :receiAccount="receiAccountNumber"
      :amount="dataReceive.amount"
      :description="dataReceive.description"
      @InternalSuccess="HandleInternalSuccess"
    />

    <Modal v-if="transferSuccess == true" title="success" notify="Chuyển khoản thành công"/>
    <Modal v-if="transferFail == true" title="fail" notify="Chuyển khoản thất bại!!!"/>

    <!--Rep Search Modal-->
    <div
      id="rep-search-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Tìm kiếm người nhận</div>
            <div class="input-group" style="width: 100%">
              <input placeholder="Họ tên người nhận" style="width: 95%">
              <img src="/icons/search.png" style="float: right">
            </div>
            <div class="rep-list">
              <div v-for="contact in contacts" :key="contact.id">
                <div @click="LoadContact(contact)">
                  <Contact :nameSug="contact.nameSug" :account="contact.account"/>
                </div>
              </div>
            </div>
            <div style="text-align: center;">
              <button
                @click="CloseSearch()"
                id="rep-search-close"
                class="button-med bn-close button-modal"
                style="width: 324px;"
              >ĐÓNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="cards" class="tab-content" style="display: block;">
      <div class="page-title" style="width: 100%; text-align: center">Nhập thông tin chuyển khoản</div>
      <div class="container" style="padding: 0px 100px">
        <div class="row">
          <div class="col-sm-6 transfer-col-padding">
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Tài khoản nguồn</label>
              <div>
                <select class="select-custom" id="orig">
                  <option
                    v-for="acc in accounts"
                    :key="acc.id"
                  >{{acc.accountNumber}}</option>
                </select>
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Số tài khoản đích</label>
              <div class="input-group" style="width: 100%">
                <input
                  v-on:keyup.enter="submit(receiAccountNumber)"
                  v-model="receiAccountNumber"
                  type="number"
                  placeholder="Nhập số tài khoản đích"
                  style="width: 95%"
                >
                <img
                  @click="Search()"
                  id="rep-search-btn"
                  src="/icons/search.png"
                  style="float: right"
                >
              </div>
              <button
                v-if="isNew == true"
                class="button-small" @click="AddContact()"
                style="height: 36px; width: 100%; margin-top: 5px; text-transform: none; font-size: 14px; background: #61667D"
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
                type="number"
                class="input-normal"
                style="width: 100%"
                placeholder="Số điện thoại người nhận"
              >
            </div>
          </div>
          <div class="col-sm-6 transfer-col-padding col-line">
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Số tiền chuyển</label>
              <!-- <label style="color:red" v-if="dataReceive.">Nhập số tiền chuyển</label> -->
              <div class="input-group" style="width: 100%">
                <input
                  type="number"
                  placeholder="Số tiền chuyển"
                  style="width: 90%"
                  v-model="dataReceive.amount"
                >
                <span style="float: right; margin-top: -3px;">VNĐ</span>
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Nội dung chuyển</label>
              <input
                v-model="dataReceive.description"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập nội dung chuyển"
              >
            </div>
            <div style="margin-bottom: 20px;">
              <label class="input-normal-label">Hình thức thanh toán phí</label>
              <div>
                <select class="select-custom" id="fee">
                  <option value="0">Người gửi trả phí</option>
                  <option value="1">Người nhận trả phí</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 15px; text-align: center">
          <button
            id="otp-veri"
            @click="IntenalTransfer()"
            class="button-med"
            style="width: 324px;"
          >Chuyển khoản</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import OTPModal from "@/components/OTPModal.vue";
import Contact from "@/components/Contact.vue";

import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      sendAccountNumber: "",
      receiAccountNumber: "",
      transferSuccess: false,
      transferFail: false,
      dataReceive: {
        full_name: "",
        phoneNumber: "",
        email: "",
        amount: Number,
        description: "",
      },
      isNew: false,
      type: 0
    };
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["contacts"]),
    getOTP() {
      return this.$store.state.getOTP;
    }
  },
  components: {
    Modal,
    OTPModal,
    Contact
  },
  methods: {
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
      axios
        .get(`http://192.168.0.130:3000/users/${receiAccountNumber}`, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          if (response.status == 200) {
            this.receiAccountNumber = receiAccountNumber;
            this.dataReceive.full_name = response.data.account.full_name;
            this.dataReceive.email = response.data.account.email;
            this.dataReceive.phoneNumber = response.data.account.phoneNumber;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    IntenalTransfer() {
      this.sendAccountNumber = this.$jQuery("#orig option:selected").val();
      this.type = this.$jQuery("#fee option:selected").val();

      this.$store.dispatch("GetOTP");
    },
    Search() {
      this.$jQuery("#rep-search-modal").fadeIn("fast");
    },
    CloseSearch() {
      this.$jQuery("#rep-search-modal").fadeOut("fast");
    },
    LoadContact(contact) {
      this.$jQuery("#rep-search-modal").fadeOut("fast");
      this.submit(contact.account);
    },
    HandleInternalSuccess() {
      this.transferSuccess = true;
    },
   AddContact(){
     var addData={
       accountNumber: this.receiAccountNumber,
       nameSug: this.dataReceive.full_name,
     };
     axios
        .post("http://192.168.0.130:3000/contacts", addData, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          alert(JSON.stringify(response));
          if (response.data.msg == "success!") {
            this.$store.dispatch("UpdateListContact");
          } else {
            alert("fail");
          }
        })
        .catch(err => {
          alert(err);
        });
   }
  },
  watch: {
    dataReceive: function(_newdata) {
      dataReceive = _newdata;
    },
    getOTP: function(_new) {
      getOTP = _new;
    }
  }
};
</script>