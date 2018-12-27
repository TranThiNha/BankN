<template>
<div>
  <div class="navbar" style="width: 100%; top: 0;">
    <div class="container">
      <div class="row" style="width: 100%; height: 100%;">
        <div class="col-sm-6">
          <img src="/icons/logo-white.png">
        </div>
        <div class="col-sm-6 text-right">
          <button id="transfer-act" class="nav-button-hili" v-on:click="Transfer()">CHUYỂN KHOẢN</button>
          <button id="sign-out-btn" class="nav-button-nobg">ĐĂNG XUẤT</button>
        </div>
      </div>
    </div>
  </div>

   <!-- Choose transfer type -->
    <div id="type-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5); display: none;">
        <div class="modal" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document" style="width: 400px;">
                <div class="modal-content modal-style" style="border: none !important; border-radius: 10px;">
                    <div class="modal-title">
                        Chọn hình thức
                    </div>
                    <div class="modal-des">
                        <router-link to="/internal-transfer">
                          Cùng ngân hàng
                        </router-link>
                         <div>
                          Liên ngân hàng
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 25px">
                        <button id="fmodal-close" class="button-med bn-close button-modal" style="width: 324px;">ĐÓNG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarUser",
  methods: {
    Transfer(){
      this.$jQuery("#type-modal").show();
    }
  },
};
</script>
