<template>
    <div>
    <!--Rep Search Modal-->
    <div id="rep-search-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5); display: none;">
        <div class="modal" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document" style="width: 400px;">
                <div class="modal-content modal-style" style="border: none !important; border-radius: 10px;">
                    <div class="modal-title">
                        Tìm kiếm người nhận
                    </div>
                    <div class="input-group" style="width: 100%">
                        <input placeholder="Họ tên người nhận" style="width: 95%">
                        <img src="/icons/search.png" style="float: right">
                    </div>
                    <div class="rep-list">
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                        <div class="rep-item ver">
                            <div class="rep-ava" style="float: left"></div>
                            <div>
                                <div class="rep-name">Trần Lê Nguyễn Hoàng Minh</div>
                                <div class="rep-num">0297 8927 2828</div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <button id="rep-search-close" class="button-med bn-close button-modal" style="width: 324px;">ĐÓNG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--OTP Modal-->
    <div id="otp-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5); display: none;">
        <div class="modal" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document" style="width: 400px;">
                <div class="modal-content modal-style" style="border: none !important; border-radius: 10px;">
                    <div class="modal-title">
                        Xác nhận
                    </div>
                    <div class="modal-des">
                        Kiểm tra e-mail để nhận mã OTP để xác nhận thanh toán.
                        <a id="otp-end" href="#" class="bn-link">
                            Gửi lại mã
                            (<span id="otp-time">30</span>).
                        </a>
                    </div>
                    <div style="margin: 20px 0px">
                        <label class="input-normal-label">Mã OTP</label>
                        <input type="number" class="input-normal" style="width: 100%" placeholder="Nhập mã OTP">
                    </div>
                    <div style="text-align: center; padding-left: 0px;">
                        <button id="otp-neg" class="button-med neg button-modal" style="width: 324px; float: left">HỦY</button>
                        <button id="otp-pos" class="button-med button-modal" style="width: 324px; float: right">XÁC
                            NHẬN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Success Modal-->
    <div id="success-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5); display: none;">
        <div class="modal" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document" style="width: 400px;">
                <div class="modal-content modal-style" style="border: none !important; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <img src="/icons/modal-success.png" width="58px">
                    </div>
                    <div class="modal-title">
                        Thành công
                    </div>
                    <div class="modal-des">
                        Chuyển khoản thành công
                    </div>
                    <div style="text-align: center; margin-top: 25px">
                        <button id="smodal-close" class="button-med bn-close button-modal" style="width: 324px;">ĐÓNG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Failure Modal-->
    <div id="failure-modal" class="modal-backdrop" style="background-color: rgba(0,0,0,0.5); display: none;">
        <div class="modal" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document" style="width: 400px;">
                <div class="modal-content modal-style" style="border: none !important; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <img src="/icons/modal-failure.png" width="58px">
                    </div>
                    <div class="modal-title">
                        Thất bại
                    </div>
                    <div class="modal-des">
                        Chuyển khoản thất bại
                    </div>
                    <div style="text-align: center; margin-top: 25px">
                        <button id="fmodal-close" class="button-med bn-close button-modal" style="width: 324px;">ĐÓNG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

     <div id="page-content" class="container" style="padding-top: 80px;">

        <div id="cards" class="tab-content" style="display: block;">

            <div class="page-title" style="width: 100%; text-align: center">
                Nhập thông tin chuyển khoản
            </div>
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
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Số tài khoản đích</label>
                            <div class="input-group" style="width: 100%">
                                <input type="number" placeholder="Nhập số tài khoản đích" style="width: 95%">
                                <img id="rep-search-btn" src="/icons/search.png" style="float: right">
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Họ tên người nhận</label>
                            <input type="number" class="input-normal" style="width: 100%" disabled placeholder="Họ tên người nhận">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Email</label>
                            <input type="text" class="input-normal" style="width: 100%" disabled placeholder="Email người nhận">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Số điện thoại</label>
                            <input type="number" class="input-normal" style="width: 100%" disabled placeholder="Số điện thoại người nhận">
                        </div>
                    </div>
                    <div class="col-sm-6 transfer-col-padding col-line">
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Số tiền chuyển</label>
                            <div class="input-group" style="width: 100%">
                                <input type="number" placeholder="Nhập tên người nhận" style="width: 90%">
                                <span style="float: right; margin-top: -3px;">VNĐ</span>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label class="input-normal-label">Nội dung chuyển</label>
                            <input type="text" class="input-normal" style="width: 100%" placeholder="Nhập nội dung chuyển">
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
                    <button id="otp-veri" type="submit" class="button-med" style="width: 324px;">Chuyển
                        khoản</button>
                </div>
            </div>

        </div>

    </div>

    </div>
</template>

<script>
export default {
}
</script>
