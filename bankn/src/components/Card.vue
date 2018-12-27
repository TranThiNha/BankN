<template>
  <div class="card-item">
    <div>
      <img src="/icons/logo-lite.png">
      <img id="card-remove" src="/icons/delete.png" style="float: right">
    </div>
    <div style="position: absolute; bottom: 0">
      <div class="card-num">{{accountNumber}}</div>
      <div class="card-balance">
        Số dư:
        <b>{{balance}}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accountNumber: String,
    balance: String
  }
}
</script>
