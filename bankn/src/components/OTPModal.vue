<template>
  <!--OTP Modal-->
  <div id="otp-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5)">
    <div class="modal" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document" style="width: 400px;">
        <div
          class="modal-content modal-style"
          style="border: none !important; border-radius: 10px;"
        >
          <div class="modal-title">Xác nhận</div>
          <div class="modal-des">
            Kiểm tra e-mail để nhận mã OTP để xác nhận thanh toán.
            <a
              @click="sendAgain()"
              id="otp-resend"
              href="#"
              class="bn-link"
            >
              Gửi lại mã
              (
              <span id="otp-time">30</span>).
            </a>
          </div>
          <div style="margin: 20px 0px">
            <label class="input-normal-label">Mã OTP</label>
            <input
              v-model="otp"
              type="number"
              class="input-normal"
              style="width: 100%"
              placeholder="Nhập mã OTP"
            >
          </div>
          <div style="text-align: center; padding-left: 0px;">
            <button
              @click="CancelOTP()"
              id="otp-neg"
              class="button-med neg button-modal"
              style="width: 324px; float: left"
            >HỦY</button>
            <button
              id="otp-pos"
              @click="sendOTP()"
              class="button-med button-modal"
              style="width: 324px; float: right"
            >
              XÁC
              NHẬN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: "",
      dataSend: {}
    };
  },
  props: {
    sendAccount: String,
    receiAccount: String,
    amount: String,
    description: String,
    type: String,
    typeTransfer: String
  },
  created() {
    this.dataSend = {
      sendAccount : this.sendAccount,
      receiAccount : this.receiAccount,
      amount : this.amount,
      description : this.description,
      type: this.type
    };
   
  },
  computed: {
    postOtp() {
      return this.$store.state.postOTP;
    },
    successInternal(){
      return this.$store.state.successInternal;
    }
  },
  methods: {
    sendAgain() {
      var counter = 30;
      var self = this;

      this.$store.dispatch("PostOTP");

      var interval = setInterval(function() {
        counter--;
        if (counter >= 0) {
          self.$jQuery("#otp-time").html(counter);
          self.$jQuery("#otp-resend").css("pointer-events", "none");
        }
        if (counter === 0) {
          self.$jQuery("#otp-resend").css("pointer-events", "auto");
          self.$jQuery("#otp-time").html(30);
          clearInterval(counter);
        }
      }, 1000);
    },
    CancelOTP() {
      this.$jQuery("#otp-modal").hide();
      this.$store.dispatch("Reset");
    },
    sendOTP() {
      this.$store.dispatch("PostOTP", this.otp);
    }
  },
  watch: {
    postOtp: function(_new) {
      if (_new == true) {
        this.otp = "";
        this.$jQuery("#otp-modal").hide();
        alert(this.typeTransfer);
        if (this.typeTransfer == "internal"){
        this.$store.dispatch("TransactionInternal", this.dataSend);
        }
        else if (this.typeTransfer == "external")
        {
          this.$store.dispatch("TransactionExternal", this.dataSend);
        }
      }
      postOtp = _new;
    },
    successInternal: function(_new){
      if (_new == true){
        this.$emit("InternalSuccess");
      }
    }
  }
};
</script>
