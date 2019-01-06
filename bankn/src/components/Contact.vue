<template>
  <div>
    <div class="rep-item" v-if="account != null">
      <div class="rep-ava" style="float: left" @click="ClickAva()">{{letter}}</div>
      <div class="crud" style="display: none; position: absolute; margin-left: 68px;">
        <button
          id="add-acc-btn"
          class="button-outline edit-btn"
          style="margin-top: 5px; width: auto"
        >SỬA</button>
        <button
          id="add-acc-btn"
          class="button-outline delete-btn"
          style="margin-top: 5px; width: auto"
        >XÓA</button>
      </div>
      <div class="rep-info" style="position: relative; margin-left: 68px;">
        <div class="transfer" style="display: none; position: absolute;" 
        @mouseleave="Mouseleave" @click="ClickTransfer()">
          <button id="add-acc-btn" class="button-small" style="margin-top: 5px;">Chuyển khoản</button>
        </div>
        <div class="info" @mouseenter="Mouseenter" style="display: block; position: absolute; cursor: pointer;">
          <div class="rep-name">{{nameSug}}</div>
          <div class="rep-num">{{account}} - 
            <span style="font-weight: 900">{{nameBank}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="acc-item ver" v-if="account == null ">
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
    account: String,
    nameBank: String
  },
  created() {
    this.letter = this.nameSug.slice(0, 1);
  },
  methods: {
    Mouseenter(){
      this.$jQuery(event.target).parent().find(".transfer").fadeIn(200);
      this.$jQuery(event.target).fadeOut(200);
    },
    Mouseleave(){
       this.$jQuery(event.target).parent().find(".info").fadeIn(200);
         this.$jQuery(event.target).fadeOut(200);
    },
    ClickTransfer(){
       this.$jQuery(event.target).parents(".rep-info").find(".info").fadeIn(200);
       this.$jQuery(event.target).fadeOut(200);
       this.$router.replace("/internal");
    },
    ClickAva(){

    }
  },
};
</script>

 