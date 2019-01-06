<template>
  <div>

    <Modal v-if="successAdd == true" title="success" notify="Tạo thẻ thất bại!!" />

    <!--Add Acc Modal-->
    <div
      id="add-acc-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Tạo tài khoản</div>
            <div class="modal-des">Nhập các thông tin cần thiết</div>
            <div style="margin: 20px 0px 10px 0px">
              <label class="input-normal-label">Tên đăng nhập</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập tên đăng nhập"
                v-model="dataUser.username"
              >
            </div>
            <div style="margin-bottom: 10px;">
              <label class="input-normal-label">Mật khẩu</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập mật khẩu"
                v-model="dataUser.password"
              >
            </div>
            <div style="margin-bottom: 10px;">
              <label class="input-normal-label">Họ tên</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập họ tên"
                v-model="dataUser.fullname"
              >
            </div>
            <div style="margin-bottom: 10px;">
              <label class="input-normal-label">Email</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập email"
                v-model="dataUser.email"
              >
            </div>
            <div style="margin-bottom: 30px;">
              <label class="input-normal-label">Số điện thoại</label>
              <input
                type="number"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập số điện thoại"
                v-model="dataUser.phone"
              >
            </div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="add-acc-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelAddUser()"
              >Hủy</button>
              <button
                id="add-acc-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="AcceptAddUser(user)"
              >Tạo</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="page-content" class="container" style="padding-top: 15px;">
      <div id="cards" style="display: block;">
        <div class="page-title" style="width: 100%; margin-bottom: 70px;">
          Danh sách tài khoản
          <button
            id="add-acc-btn"
            class="button-small"
            style="float: right"
            @click="AddUser()"
          >Thêm</button>
        </div>
        <div class="container">
          <div class="acc-container">
            <div v-for="user in allAccounts" :key="user.id">
              <router-link :to="`/staff-account/${user.id}`">
                <Contact :nameSug="user.fullname" :account="null"/>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Contact from "@/components/Contact.vue";
import Modal from "@/components/Modal.vue";

import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      dataUser: {},
      successAdd: false
    };
  },
  components: {
    Contact, 
    Modal
  },
  computed: {
    ...mapState(["allAccounts"]),
    ...mapState(["user"])
  },
  created() {
    axios
      .get("http://192.168.0.130:3000/users", {
        headers: {
          "x-access-token": this.$session.get('access_token')
        }
      })
      .then(response => {
        // alert(JSON.stringify(response));
        this.$store.dispatch("SetAllAccount", response.data.accounts);
      });
  },
  methods: {
    AddUser() {
      this.$jQuery("#add-acc-modal").show();
    },
    CancelAddUser() {
      this.$jQuery("#add-acc-modal").fadeOut();
    },
    AcceptAddUser(user) {
      axios
        .post("http://192.168.0.130:3000/users", this.dataUser, {
          headers: {
            "x-access-token": this.$session.get('access_token')
          }
        })
        .then(response => {
          if (response.data.msg == "success!") {
            this.$jQuery("#add-acc-modal").hide();
            this.$store.dispatch("UpdateListUser", user);
            this.successAdd = true;
          } else {
            alert("Lỗi");
          }
        });
    },
  }
};
</script>