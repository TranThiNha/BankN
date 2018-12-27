<template>
  <div id="app">
    <NavBarUser/>
    <router-view/>
  </div>
</template>

<script>
import NavBarUser from "@/components/NavBarUser.vue";

export default {
  components:{
        NavBarUser
    }
}
</script>


