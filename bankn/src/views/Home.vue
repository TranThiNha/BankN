<template>
  <div>
    <!--Edit Modal-->
    <div
      id="edit-modal"
      class="edit-modal modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Chỉnh sửa người nhận</div>
            <div style="margin: 20px 0px 10px 0px">
              <label class="input-normal-label">Số tài khoản</label>
              <input
                v-model="editAccount"
                type="number"
                disabled
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập số tài khoản"
              >
            </div>
            <div style="margin-bottom: 30px;">
              <label class="input-normal-label">Tên gợi nhớ</label>
              <input
                v-model="editName"
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập tên gợi nhớ"
              >
            </div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="edit-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelEdit()"
              >Hủy</button>
              <button
                id="edit-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="AddEdit()"
              >Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Delete Modal-->
    <div
      id="delete-modal"
      class="edit-modal modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div class="modal-title">Xóa tài khoản</div>
            <div class="modal-des">Bạn có muốn xóa người nhận này khỏi danh bạ?</div>
            <div style="text-align: center; padding-left: 0px; margin-top: 20px;">
              <button
                id="delete-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CancelEditDelete"
              >Hủy</button>
              <button
                id="delete-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="AcceptEditDelete"
              >Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <OTPModal
      v-if="getOTP == true"
      :sendAccount="accountNumber"
      type="0"
      typeTransfer="internal"
      :receiAccount="selected.accountNumber"
      :amount="balance"
      description
      @InternalSuccess="HandleInternalSuccess"
    />

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

    <!--Choose card Modal-->
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
            <div style="position: relative; overflow: hidden; margin-bottom: 20px;">
              <div
                style="margin-top: 25px; max-height: 380px; margin-right: -20px; overflow-y: scroll; padding: 0px 7px;"
              >
                <div v-for="acc in accounts" :key="acc.id">
                  <div
                    class="transfer-method choose-card"
                    style="margin-bottom: 15px; padding: 10px 20px;"
                    @click="Select(acc)"
                  >
                    <div>{{acc.accountNumber}}</div>
                    <div
                      style="font-size: 14px; font-weight: 300 !important;"
                    >{{acc.balance|currency}} VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="hasSelected == true"
              style="color: red; text-align:center"
            >Hãy chọn 1 tài khoản!</div>
            <div style="text-align: center; padding-left: 0px;">
              <button
                id="choose-card-neg"
                class="button-med neg button-modal"
                style="width: 324px; float: left"
                @click="CloseRepModal()"
              >Hủy</button>
              <button
                id="choose-card-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                @click="TransferMoney(selected)"
              >Chọn</button>
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
    <div id="page-content" class="container" style="margin-top: 60px">
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
              <Contact
                :nameSug="contact.nameSug"
                :account="contact.account"
                :nameBank="contact.nameBank"
                @Update="HandelUpdate"
                @Delete="HandleDelete"
              />
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
            <div v-for="trans in transactions" :key="trans.sendAccount">
              <TransactionHistory :info="trans"/>
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
import OTPModal from "@/components/OTPModal.vue";
import TransactionHistory from "@/components/TransactionHistory.vue";

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
      otpflag: false,
      editAccount: ""
    };
  },
  components: {
    Card,
    Contact,
    Modal,
    OTPModal,
    TransactionHistory
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["contacts"]),
    ...mapState(["user"]),
    ...mapState(["transactions"]),

    getOTP() {
      return this.$store.state.getOTP;
    }
    // ...mapState(["getOTP"])
  },
  created() {
    this.$store.dispatch("Reset");
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
      var addData = {
        accountNumber: this.contactadd.accountNumber,
        nameSug: this.contactadd.nameSug,
        bankName: "BankN"
      };
      axios
        .post("http://192.168.0.130:3000/contacts", addData, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
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
          "http://192.168.0.130:3000/accounts/remove",
          { accountNumber: this.accountNumber },
          {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          }
        )
        .then(response => {
          // alert(JSON.stringify(response));
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
      // alert(JSON.stringify(selected));
      if (selected == null) {
        this.hasSelected = true;
      } else {
        this.$store.dispatch("GetOTP");
      }
    },
    HandleInternalSuccess() {
      this.DeleteAccount();
    },
    Select(acc) {
      this.selected = acc;
      this.$jQuery(".choose-card").removeClass("chosen");
      var target = this.$jQuery(event.target);
      if (!this.$jQuery(event.target).hasClass("choose-card")) target = this.$jQuery(event.target).parents(".choose-card");
      target.addClass("chosen");
    },
    HandelUpdate(account, name) {
      this.$jQuery("#edit-modal").fadeIn("fast");
      this.editAccount = account;
      this.editName = name;
    },
    CancelEdit() {
      this.$jQuery("#edit-modal").fadeOut("fast");
    },
    AddEdit() {
      axios
        .put(
          "http://192.168.0.130:3000/contacts/nameSug",
          {
            accountNumber: this.editAccount,
            nameSug: this.editName
          },
          {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          }
        )
        .then(response => {
          alert(JSON.stringify(response));
          if (response.data.msg == "success") {
            this.$jQuery("#edit-modal").fadeOut("fast");
             this.$store.dispatch("UpdateListContact");
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    HandleDelete(account, nameSug) {
      this.editAccount = account;
      this.editName = name;
      this.$jQuery("#delete-modal").fadeIn("fast");
    },
    CancelEditDelete() {
      this.$jQuery("#delete-modal").fadeOut("fast");
    },
    AcceptEditDelete() {
      axios
        .post(
          "http://192.168.0.130:3000/contacts/remove",
          {
            accountNumber: this.editAccount,
          },
          {
            headers: {
              "x-access-token": this.$store.state.user.access_token
            }
          }
        )
        .then(response => {
          alert(JSON.stringify(response));
          if (response.data.msg=="success!") {
            this.$jQuery("#delete-modal").fadeOut("fast");
             this.$store.dispatch("UpdateListContact");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  watch: {
    getOTP: function(_new) {
      if (_new == true) {
        this.$jQuery("#rep-search-modal").hide();
      }
      getOTP = _new;
    }
  }
};
</script>
