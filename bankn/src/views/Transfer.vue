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

     <div id="page-content" class="container" style="padding-top: 80px;">
         <router-view/>
    </div>

    </div>
</template>


