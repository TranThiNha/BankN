<template>
  <div>
    <div style="position: fixed; width: 100%; z-index: 15;">
      <NavBarUser/>
      <TabBar/>
    </div>
    <div id="page-content" class="container">
      <div id="cards" class="tab-content" style="display: block;">
        <div class="page-title" style="width: 100%; text-align: center">Danh sách thẻ của bạn</div>
        <div class="container" style="padding: 0px 100px">
          <div class="card-container">
            <Card/>
            <Card/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBarUser from "@/components/NavBarUser.vue";
import TabBar from "@/components/TabBar.vue";
import Card from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    NavBarUser,
    TabBar,
    Card
  }
};
</script>
