<template>
  <div>
    <div class="navbar" style="width: 100%; top: 0;">
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

    <!-- Choose transfer type -->
    <div
      id="type-modal"
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
            <div class="modal-des">
              <router-link to="/internal">Cùng ngân hàng</router-link>
              <div>Liên ngân hàng</div>
            </div>
            <div style="text-align: center; margin-top: 25px">
              <button
                id="modal-close"
                v-on:click="CloseModal()"
                class="button-med bn-close button-modal"
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
      this.$jQuery("#type-modal").show();
    },
    CloseModal() {
      this.$jQuery("#type-modal").fadeOut();
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
      this.$jQuery("#type-modal").hide();
    }
  }
};
</script>
