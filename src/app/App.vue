<template>
  <div id="app">
    <div class="titlebar">
      <button id="salir" v-on:click="Close"><img src="/img/exit20px.png" alt="Imagen de fondo"></button>
      <button id="M" v-on:click="Max"><img src="/img/Max20px.png" alt="Imagen de fondo"></button>
    </div>
    <hr class="vista">
    <img class="bg" src="/img/palmeraF.png" alt="Imagen de fondo">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        max: false,
        screenX: 0,
        screenY: 0,
        width: 0,
        height: 0
      }
    },
    created() {
      this.$router.push('/Sesion');
    },
    methods: {
      Max() {
        if (this.max) {
          window.resizeTo(this.width, this.height);
          window.moveTo(this.screenX, this.screenY);
        } else {
          this.width = window.innerWidth;
          this.height = window.innerHeight;
          this.screenX = window.screenX;
          console.log(window.screenX);
          this.screenY = window.screenY;
          console.log(window.screenY);
          window.moveTo(0,0);
          window.resizeTo(screen.availWidth, screen.availHeight);
        }
        this.max = !this.max;
      },
      Close() {
        window.close();
      }
    }
  }
</script>

<style lang="css">
</style>
