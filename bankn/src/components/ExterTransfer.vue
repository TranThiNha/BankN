<template>
  <div id="cards" class="tab-content" style="display: block;">
    <div class="page-title" style="width: 100%; text-align: center">Chuyển khoản liên ngân hàng</div>
    <div class="container" style="padding: 0px 100px">
      <div class="row">
        <div class="col-sm-6 transfer-col-padding">
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Tài khoản nguồn</label>
            <div>
              <select class="select-custom">
                <option value="0">9282 9282 9192</option>
                <option value="1">0293 9182 2621</option>
                <option value="2">1389 1204 2892</option>
                <option value="3">2389 1093 5783</option>
                <option value="4">2352 0489 1278</option>
              </select>
            </div>
          </div>
          <div class="row" style="margin-bottom: 20px;">
            <div class="col-sm-6">
              <label class="input-normal-label">Ngân hàng đích</label>
              <div>
                <select class="select-custom short">
                  <option value="0">VietinBank</option>
                  <option value="1">Agribank</option>
                  <option value="2">Vietcombank</option>
                  <option value="3">Ocean bank</option>
                  <option value="4">VP Bank</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <label class="input-normal-label">Số tài khoản đích</label>
              <input
                type="number"
                class="input-normal no-spin"
                placeholder="Nhập số tài khoản đích"
                style="width: 95%"
              >
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Họ tên người nhận</label>
            <input
              type="number"
              class="input-normal"
              style="width: 100%"
              disabled
              placeholder="Họ tên người nhận"
            >
          </div>
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Email</label>
            <input
              type="text"
              class="input-normal"
              style="width: 100%"
              disabled
              placeholder="Email người nhận"
            >
          </div>
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Số điện thoại</label>
            <input
              type="number"
              class="input-normal"
              style="width: 100%"
              disabled
              placeholder="Số điện thoại người nhận"
            >
          </div>
        </div>
        <div class="col-sm-6 transfer-col-padding col-line">
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Số tiền chuyển</label>
            <div class="input-group" style="width: 100%">
              <input
                class="money-input"
                type="number"
                placeholder="Nhập số tiền muốn chuyển"
                style="width: 90%"
              >
              <span style="float: right; margin-top: -3px;">VNĐ</span>
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Nội dung chuyển</label>
            <input
              type="text"
              class="input-normal"
              style="width: 100%"
              placeholder="Nhập nội dung chuyển"
            >
          </div>
          <div style="margin-bottom: 20px;">
            <label class="input-normal-label">Hình thức thanh toán phí</label>
            <div>
              <select class="select-custom">
                <option value="0">Người gửi trả phí</option>
                <option value="1">Người nhận trả phí</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px; text-align: center">
        <button id="otp-veri" type="submit" class="button-med" style="width: 324px;">
          Chuyển
          khoản
        </button>
      </div>
    </div>
  </div>
</template>