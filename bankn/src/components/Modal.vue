<template>
  <div id="modal-general" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5)">
    <div class="modal" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document" style="width: 400px;">
        <div
          class="modal-content modal-style"
          style="border: none !important; border-radius: 10px;"
        >
          <!-- success -->
          <div v-if="title == 'success'">
            <div style="text-align: center; margin-bottom: 15px;">
              <img src="/icons/modal-success.png" width="58px">
            </div>
            <div class="modal-title">Thành công</div>
          </div>
          <!-- Notify -->
          <div v-if="title == 'notify'" class="modal-title">Thông báo</div>

          <!-- fail -->
          <div v-if="title == 'fail'">
            <div style="text-align: center; margin-bottom: 15px;">
              <img src="/icons/modal-failure.png" width="58px">
            </div>
            <div class="modal-title">Thất bại</div>
          </div>

          <div
            class="modal-notif"
          >{{notify}}</div>
          <div style="text-align: center;">
            <button
              id="min-close"
              class="button-med bn-close button-modal"
              style="width: 324px;"
              @click="CloseModal()"
            >ĐÓNG</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    notify: String
  },
  methods: {
    CloseModal() {
       this.$jQuery("#modal-general").hide();
    }
  }
};
</script>
