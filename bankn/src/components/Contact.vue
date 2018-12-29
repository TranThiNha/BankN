<template>
  <div>
    <div class="rep-item" v-if="account != null ">
      <div class="rep-ava" style="float: left">{{letter}}</div>
      <div>
        <div class="rep-name">{{nameSug}}</div>
        <div class="rep-num" >{{account}}</div>
      </div>
    </div>

    <div class="acc-item" v-if="account == null ">
      <div class="acc-ava" style="float: left">{{letter}}</div>
      <div>
        <div class="acc-name">{{nameSug}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letter: ""
    };
  },
  props: {
    nameSug: String,
    account: String
  },
  created() {
    this.letter = this.nameSug.slice(0, 1);
  }
};
</script>