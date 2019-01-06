<template>
  <div class="trans-item">
    <div class="row" style="width: 100%; margin: 0px !important;">
      <div class="col-sm-8">
        <div class="trans-from">
          {{info.sendAccount}}
          <span class="name">{{info.sendName}}</span>
        </div>
        <div class="trans-to">
          <img src="/icons/trans-from.png">
          {{info.receiAccount}}
          <span class="name">{{info.receiName}}</span>
        </div>
      </div>
      <div class="col-sm-4 text-right trans-date">{{info.date}}</div>
    </div>
    <div
      class="row"
      style="width: 100%; display: flex; align-items: flex-end; margin: 0px !important;"
    >
      <div class="col-sm-5" style="vertical-align: text-bottom; padding-bottom: 5px;" v-if="info.idbankfrom==info.idbankto">
        Cùng ngân hàng
      </div>
      <div class="col-sm-5" style="vertical-align: text-bottom; padding-bottom: 5px;" v-if="info.idbankfrom!=info.idbankto">
        Khác ngân hàng
      </div>
      <div class="col-sm-7 text-right trans-amount from" style="float: right;">{{info.amount |currency}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {}
  }
};
</script>
