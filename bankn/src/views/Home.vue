<template>
  <div>
    <!--Add Rep Modal-->
    <div
      id="add-rep-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Thêm người nhận</div>
            <div class="modal-des">Thêm người nhận để dễ dàng chuyển khoản</div>
            <form v-on:submit.prevent="AddContact(user)">
              <div style="margin: 20px 0px 10px 0px">
                <label class="input-normal-label">Số tài khoản</label>
                <input
                  required
                  type="number"
                  class="input-normal"
                  style="width: 100%"
                  placeholder="Nhập số tài khoản"
                  v-model="contactadd.accountNumber"
                >
              </div>
              <div style="margin-bottom: 30px;">
                <label class="input-normal-label">Tên gợi nhớ</label>
                <input
                  type="text"
                  class="input-normal"
                  style="width: 100%"
                  placeholder="Nhập tên gợi nhớ"
                  v-model="contactadd.nameSug"
                >
              </div>
              <div style="text-align: center; padding-left: 0px;">
                <button
                  id="add-rep-neg"
                  class="button-med neg button-modal"
                  style="width: 324px; float: left"
                  v-on:click="Cancelcontact()"
                >Hủy</button>
                <button
                  type="submit"
                  id="add-rep-pos"
                  class="button-med button-modal"
                  style="width: 324px; float: right"
                >Thêm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--OTP Modal-->
    <div
      id="otp-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
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
              <input v-model="otp"
                type="number"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập mã OTP"
              >
            </div>
            <div style="text-align: center; padding-left: 0px;">
              <button @click="CancelOTP()"
                id="otp-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
              >HỦY</button>
              <button
                id="otp-pos" @click="sendOTP()"
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

    <Modal
      v-if="minModal == true"
      title="notify"
      notify="Quý khách phải duy trì ít nhất một tài-khoản-thanh-toán trong tài khoản"
    />

    <Modal
      v-if="successModal == true"
      title="success"
      notify="Xóa tài khoản thanh toán thành công"
    />

    <Modal
      v-if="failAddContact == true"
      title="fail"
      notify="Thêm người nhận không thành công do mã thẻ không đúng"
    />

    <!-- Empty Modal -->
    <div
      id="empty-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Thông báo</div>
            <div class="modal-notif">Tài-khoản-thanh-toán này vẫn còn tiền.
              <br>Hãy chuyển hết tiền sang tài-khoản-thanh-toán khác để giữ lại số tiền của mình.
            </div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="empty-close"
                class="button-med neg button-modal"
                style="width: 324px;"
                @click="CloseEmptyModal()"
              >ĐÓNG</button>
              <button
                id="empty-close"
                class="button-med btn-success button-modal"
                style="width: 324px; float: right"
                @click="OpenAccountModal()"
              >CHUYỂN TIỀN</button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <div class="modal-title">Chọn thẻ của bạn</div>
            <div class="rep-list">
              <div v-for="acc in accounts" :key="acc.id">
                <div class="rep-item ver" @click="selected = acc">
                  <div>
                    <div class="rep-name">{{acc.accountNumber}}</div>
                    <div class="rep-num">{{acc.balance}} VNĐ</div>
                  </div>
                </div>
              </div>
              <div v-if="hasSelected == true" style="color: red">Hãy chọn 1 tài khoản!</div>
            </div>
            <div style="text-align: center;">
              <button
                id="rep-search-close"
                @click="CloseRepModal()"
                class="button-med bn-close button-modal"
                style="width: 324px;"
              >ĐÓNG</button>
              <button
                class="button-med button-modal"
                @click="TransferMoney(selected)"
                style="width: 324px; float:right"
              >XÁC NHẬN</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Card Remove Modal-->
    <div
      id="cremove-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Đóng tài-khoản</div>
            <div class="modal-notif">Bạn có chắc chắn muốn đóng tài-khoản-thanh-toán này không?</div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="cremove-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelDeleteAccount()"
              >Hủy</button>
              <button
                id="cremove-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="DeleteAccount()"
              >
                Xác
                nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="position: fixed; width: 100%; z-index: 15;">
      <div class="tab-bar" style="width: 100%;">
        <div class="container">
          <div class="row tab-group">
            <div id="cards-tab" class="col-sm-4 tab tab-in" v-on:click="ListAccount()">
              <img src="/icons/tabs/cards.png">
              Danh sách tài khoản
            </div>
            <div id="reps-tab" class="col-sm-4 tab tab-out" v-on:click="ReceiveContact()">
              <img src="/icons/tabs/recipients.png">
              Danh sách người nhận
            </div>
            <div id="trans-tab" class="col-sm-4 tab tab-out" v-on:click="TransactionHistory()">
              <img src="/icons/tabs/transaction.png">
              Lịch sử giao dịch
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="page-content" class="container">
      <div id="cards" class="tab-content" style="display: block;">
        <div class="page-title" style="width: 100%; text-align: center">Danh sách thẻ của bạn</div>
        <div class="container" style="padding: 0px 100px">
          <div class="card-container">
            <div v-for="account in accounts" :key="account.id">
              <Card
                :accountNumber="account.accountNumber"
                :balance="account.balance"
                @deleteAccount="HandleDeleteAccount"
                :type="'remove'"
              />
            </div>
          </div>
        </div>
      </div>

      <!--Reps-->
      <div id="reps" class="tab-content" style="display: none;">
        <div class="page-title" style="width: 100%; text-align: center">Danh sách người nhận của bạn</div>
        <div class="container">
          <div class="rep-container">
            <div v-for="contact in contacts" :key="contact.id">
              <Contact :nameSug="contact.nameSug" :account="contact.account"/>
            </div>
          </div>
        </div>
        <div style="margin-top: 80px; text-align: center">
          <button
            @click="contactReceive()"
            id="add-rep-btn"
            type="submit"
            class="button-med"
            style="width: 324px;"
          >Thêm người nhận</button>
        </div>
      </div>

      <!--Trans-->
      <div id="trans" class="tab-content" style="display: none;">
        <div
          class="page-title"
          style="width: 100%; text-align: center"
        >Danh sách các giao dịch của bạn</div>
        <div class="container">
          <div class="trans-container">
            <div class="trans-item">
              <div class="row" style="width: 100%;">
                <div class="col-sm-7">
                  <div class="trans-from">9182 2928 9282</div>
                  <div class="trans-to">
                    <img src="/icons/trans-to.png">
                    9182 2928 9282
                  </div>
                </div>
                <div class="col-sm-5 text-right trans-date">12:30 AM, 17/08/2018</div>
              </div>
              <div class="text-right" style="width: 100%;">
                <span class="trans-amount">2,200,500</span>
              </div>
            </div>
            <div class="trans-item">
              <div class="row" style="width: 100%;">
                <div class="col-sm-7">
                  <div class="trans-from">9182 2928 9282</div>
                  <div class="trans-to">
                    <img src="/icons/trans-to.png">
                    9182 2928 9282
                  </div>
                </div>
                <div class="col-sm-5 text-right trans-date">12:30 AM, 17/08/2018</div>
              </div>
              <div class="text-right" style="width: 100%;">
                <span class="trans-amount">2,200,500</span>
              </div>
            </div>
            <div class="trans-item">
              <div class="row" style="width: 100%;">
                <div class="col-sm-7">
                  <div class="trans-from">9182 2928 9282</div>
                  <div class="trans-to">
                    <img src="/icons/trans-to.png">
                    9182 2928 9282
                  </div>
                </div>
                <div class="col-sm-5 text-right trans-date">12:30 AM, 17/08/2018</div>
              </div>
              <div class="text-right" style="width: 100%;">
                <span class="trans-amount">2,200,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Contact from "@/components/Contact.vue";
import Modal from "@/components/Modal.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      contactadd: {},
      accountNumber: "",
      balance: "",
      minModal: false,
      successModal: false,
      failAddContact: false,
      selected: null,
      hasSelected: false,
      otp: ""
    };
  },
  components: {
    Card,
    Contact,
    Modal
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["contacts"]),
    ...mapState(["user"])
  },
  created() {
    this.$store.dispatch("SetListAccount");
  },
  methods: {
    ChangeTab() {
      var id = this.$jQuery(event.target)
        .attr("id")
        .replace("-tab", "");
      this.$jQuery(".tab").removeClass("tab-in");
      this.$jQuery(".tab").addClass("tab-out");
      this.$jQuery(event.target).addClass("tab-in");
      this.$jQuery(event.target).removeClass("tab-out");
      this.$jQuery(".tab-content").hide();
      this.$jQuery("#" + id).show();
    },
    ListAccount() {
      this.ChangeTab();
    },
    ReceiveContact() {
      this.ChangeTab();
      this.$store.dispatch("SetListContact");
    },
    TransactionHistory() {
      this.ChangeTab();
      this.$store.dispatch("SetTransactionHistory");
    },
    contactReceive() {
      this.$jQuery("#add-rep-modal").show();
    },
    Cancelcontact() {
      this.$jQuery("#add-rep-modal").hide();
    },
    AddContact(user) {
      axios
        .post("http://192.168.0.5:3000/contacts", this.contactadd, {
          headers: {
            "x-access-token": this.$session.state.user.access_token
          }
        })
        .then(response => {
          // alert(JSON.stringify(response));
          this.$jQuery("#add-rep-modal").hide();
          if (response.data.msg == "success!") {
            this.contactadd = {};
            this.$store.dispatch("UpdateListContact");
          } else {
            this.failAddContact = true;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    HandleDeleteAccount(accountNumber, balance) {
      this.$jQuery("#cremove-modal").fadeIn("fast");
      this.accountNumber = accountNumber;
      this.balance = balance;
    },
    CancelDeleteAccount() {
      this.$jQuery("#cremove-modal").fadeOut("fast");
    },
    DeleteAccount() {
      this.$jQuery("#cremove-modal").hide();
      axios
        .put(
          "http://192.168.0.5:3000/accounts/remove",
          { accountNumber: this.accountNumber },
          {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          }
        )
        .then(response => {
          alert(JSON.stringify(response));
          if (response.data.granted == 0) {
            this.minModal = true;
          } else if (response.data.granted == 1) {
            this.$jQuery("#empty-modal").fadeIn();
          } else if (response.data.granted == 2) {
            this.successModal = true;
            this.$store.dispatch("UpdateListAccount");
          } else {
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    CloseEmptyModal() {
      this.$jQuery("#empty-modal").hide();
    },
    OpenAccountModal() {
      this.$jQuery("#empty-modal").hide();
      this.$jQuery("#rep-search-modal").fadeIn("fast");
    },
    CloseRepModal() {
      this.$jQuery("#rep-search-modal").fadeOut("fast");
    },
    TransferMoney(selected) {
      alert(JSON.stringify(selected));
      if (selected == null) {
        this.hasSelected = true;
      } else {
        axios
          .get("http://192.168.0.5:3000/transactions/otp", {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          })
          .then(response => {
            // alert(JSON.stringify(response));
            if (response.data.msg == "success") {
              this.$jQuery("#rep-search-modal").hide();
              this.$jQuery("#otp-modal").fadeIn();
            }
          })
          .catch(err => {
            alert(err);
          });

      }
    },
    sendAgain() {
      var counter = 30;
      var self = this;
      axios
        .get("http://192.168.0.5:3000/transactions/otp", {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
        })
        .catch(err => {
          alert(err);
        });
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
    CancelOTP(){
      this.$jQuery("#otp-modal").hide();
    },
    sendOTP(){
       axios
        .post("http://192.168.0.5:3000/transactions/otp", this.otp, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          alert(JSON.stringify(response));
          if (response.status == 200){
            this.TransactionInternal();
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    TransactionInternal(){
        axios
          .post("http://192.168.0.5:3000/transactions/internal",
          {
            sendAccount: this.accountNumber,
            receiAccount: this.selected.accountNumber,
            amount: +this.balance -  1000,
            description: ""
          }, {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          })
          .then(response => {
            if (response.data.msg == "success"){
              this.otp = "";
              this.$jQuery("#otp-modal").hide();
              this.DeleteAccount();
            }
            else{
              alert(response.data.msg);
            }
          })
          .catch(err => {
            alert(err);
          });
    }
  }
};
</script>
