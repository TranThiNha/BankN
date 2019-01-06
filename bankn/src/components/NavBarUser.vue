<template>
  <div>
    <div class="navbar" style="width: 100%; top: 0; position: fixed; z-index: 100">
      <div class="container">
        <div class="row" style="width: 100%; height: 100%;">
          <div class="col-sm-6">
            <router-link to="/home">
              <img v-if="user.role == 1" src="/icons/logo-white.png">
            </router-link>
            <router-link to="/staff-home">
              <img v-if="user.role == 2" src="/staff/icons/logo-white.png">
            </router-link>
          </div>

          <div class="col-sm-6 text-right" v-if="user.role == 2">
            <button id="sign-out-btn" class="nav-button-nobg" v-on:click="LogOut()">ĐĂNG XUẤT</button>
          </div>
          <div class="col-sm-6 text-right" v-if="user.role == 1">
            <button id="transfer-act" class="nav-button-hili" v-on:click="Transfer()">CHUYỂN KHOẢN</button>
            <button id="sign-out-btn" class="nav-button-nobg" v-on:click="LogOut()">ĐĂNG XUẤT</button>
          </div>
        </div>
      </div>
    </div>

    <!--Transfer Modal-->
    <div
      id="transfer-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Chọn hình thức</div>
            <div style="margin-top: 25px;">
              <div class="transfer-method" style="margin-bottom: 25px;">
                <router-link to="/exter">
                  <img src="/icons/exter-transfer.png" class="icon">
                  <span>Liên ngân hàng</span>
                  <img src="/icons/transfer-goto.png" class="goto">
                </router-link>
              </div>
              <div class="transfer-method" style="margin-bottom: 35px;">
                <router-link to="/internal">
                  <img src="/icons/inter-transfer.png" class="icon">
                  <span>Cùng ngân hàng</span>
                  <img src="/icons/transfer-goto.png" class="goto">
                </router-link>
              </div>
            </div>
            <div style="text-align: center;">
              <button
                id="transfer-close"
                class="button-med bn-close button-modal"
                @click="CloseModal()"
                style="width: 324px;"
              >ĐÓNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Log Out Modal-->
    <div
      id="sout-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Đăng xuất</div>
            <div class="modal-notif">Bạn muốn đăng xuất?</div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="sout-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelLogOut()"
              >Hủy</button>
              <router-link to="/login">
                <button
                  id="sout-pos"
                  class="button-med button-modal"
                  style="width: 324px; float: right"
                  @click="AcceptLogOut()"
                >Đăng xuất</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBarUser",
  computed: {
    ...mapState(["user"])
  },
  methods: {
    Transfer() {
      this.$jQuery("#transfer-modal").show();
    },
    CloseModal() {
      this.$jQuery("#transfer-modal").fadeOut();
    },
    LogOut() {
      this.$jQuery("#sout-modal").show();
    },
    CancelLogOut() {
      this.$jQuery("#sout-modal").fadeOut();
    },
    AcceptLogOut() {
      this.$store.dispatch("LogOut");
      this.$jQuery("#sout-modal").hide();
    }
  },
  watch: {
    $route(to, from) {
      this.$jQuery("#transfer-modal").hide();
    }
  }
};
</script>
