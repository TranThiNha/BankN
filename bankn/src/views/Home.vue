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
            <div style="margin: 20px 0px 10px 0px">
              <label class="input-normal-label">Số tài khoản</label>
              <input
                type="number"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập số tài khoản"
                v-model="contact.accountNumber"
              >
            </div>
            <div style="margin-bottom: 30px;">
              <label class="input-normal-label">Tên gợi nhớ</label>
              <input
                type="text"
                class="input-normal"
                style="width: 100%"
                placeholder="Nhập tên gợi nhớ"
                v-model="contact.nameSug"
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
                id="add-rep-pos"
                class="button-med button-modal"
                style="width: 324px; float: right"
                v-on:click="AddContact(user)"
              >Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Min Modal-->
    <div
      id="min-modal"
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
            <div
              class="modal-notif"
            >Quý khách phải duy trì ít nhất một tài-khoản-thanh-toán trong tài khoản.</div>
            <div style="text-align: center;">
              <button
                id="min-close"
                class="button-med bn-close button-modal"
                style="width: 324px;" @click="CloseMinModal()"
              >ĐÓNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Empty Modal-->
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
            <div style="text-align: center;">
              <button
                id="empty-close"
                class="button-med bn-close button-modal"
                style="width: 324px;"
              >ĐÓNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Success Modal-->
    <div
      id="success-modal"
      class="modal-backdrop"
      style="background-color: rgba(0,0,0,0.5); display: none;"
    >
      <div class="modal" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document" style="width: 400px;">
          <div
            class="modal-content modal-style"
            style="border: none !important; border-radius: 10px;"
          >
            <div style="text-align: center; margin-bottom: 15px;">
              <img src="/icons/modal-success.png" width="58px">
            </div>
            <div class="modal-title">Thành công</div>
            <div class="modal-des">Xóa tài khoản thanh toán thành công</div>
            <div style="text-align: center; margin-top: 25px" @click="CloseSucessModal()">
              <button
                id="smodal-close"
                class="button-med bn-close button-modal"
                style="width: 324px;"
              >ĐÓNG</button>
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
            <div class="modal-notif">Bạn có chắc chắn muốn đóng tài-khoản-thanh-toán ngày không?</div>
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
                @click="DeleteAccount(user)"
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
            <div v-for="account in accounts" :key="account">
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
            <div v-for="contact in contacts" :key="contact">
              <Contact :nameSug="contact.nameSug" :account="contact.account"/>
            </div>
          </div>
        </div>
        <div style="margin-top: 80px; text-align: center" v-on:click="contactReceive()">
          <button
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
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      contact: {},
      accountNumber: ""
    };
  },
  components: {
    Card,
    Contact
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapState(["contacts"]),
    ...mapState(["user"])
  },
  created() {
    axios
      .get("http://192.168.0.35:3000/accounts", {
        headers: {
          "x-access-token": this.$store.state.user.access_token
        }
      })
      .then(response => {
        // alert(JSON.stringify(response));
        this.$store.dispatch("SetListAccount", response.data.accounts);
      });
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
      axios
        .get("http://192.168.0.35:3000/contacts", {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          // alert(JSON.stringify(response));
          this.$store.dispatch("SetListContact", response.data.contacts);
        })
        .catch(err => {
          alert(err);
        });
    },
    TransactionHistory() {
      this.ChangeTab();
    },
    contactReceive() {
      this.$jQuery("#add-rep-modal").show();
    },
    Cancelcontact() {
      this.$jQuery("#add-rep-modal").fadeOut();
    },
    AddContact(user) {
      // alert(JSON.stringify(this.contact));
      axios
        .post("http://192.168.0.35:3000/contacts", this.contact, {
          headers: {
            "x-access-token": this.$store.state.user.access_token
          }
        })
        .then(response => {
          // alert(JSON.stringify(response));
          if (response.data.msg == "success!") {
            this.$jQuery("#add-rep-modal").hide();
            this.$store.dispatch("UpdateListContact", user);
          }
        });
    },
    HandleDeleteAccount(accountNumber) {
      this.$jQuery("#cremove-modal").fadeIn("fast");
      this.accountNumber = accountNumber;
    },
    CancelDeleteAccount() {
      this.$jQuery("#cremove-modal").fadeOut("fast");
    },
    DeleteAccount(user) {
      this.$jQuery("#cremove-modal").fadeOut("fast");
      axios
        .put(
          "http://192.168.0.35:3000/accounts/remove",
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
            this.$jQuery("#min-modal").show();
          } else if (response.data.granted == 1) {
            this.$jQuery("#empty-modal").show();
          } else if (response.data.granted == 2) {
            this.$jQuery("#success-modal").show();
            var accessinfo = {
              user: user,
              id: user.id
            };
            this.$store.dispatch("UpdateListAccount", accessinfo);
          } else {
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    CloseSucessModal() {
      this.$jQuery("#success-modal").hide();
    },
    CloseMinModal(){
      this.$jQuery("#min-modal").hide();
    }
  }
};
</script>
