<template>
  <div class="Sesion" >
    <div class="row">
      <div class="col-12">
        <img id="IconS" src="/img/Icon.png" alt="Icon">
      </div>
    </div>
    <form v-on:submit.prevent="startSesion(user.username,user.password)">
      <div class="row">
        <div class="col-12">
          <input id="user"  class="text" v-model="user.username" type="text" placeholder="Nombre de usuario" autofocus>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <input v-on:focus="reset" class="text" v-model="user.password" type="password" placeholder="Contraseña">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button id="btnSesion">Iniciar sesi&oacute;n</button>
          <br>
          <div v-bind:class="Error">{{this.msg}}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
class User {
  constructor(username,password) {
    this.username = username;
    this.password = password;
  }
}

export default {
  data() {
    return {
      user: new User(),
      Error: {
        hiden: true,
        err: false
      },
      msg: ''
    }
  },
  created() {
  },
  methods: {
    startSesion(username,password) {
      fetch(`/api/user`, {
            method: 'POST',
            body: JSON.stringify(this.user),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status) {
          this.$router.push('/Entries');
        }else{
          this.msg = data.err;
          this.Error.err = true;
          this.Error.hiden = false;
          document.getElementById("user").focus();
          console.log(data.err);
          console.log(this.msg);
        }
      });
      this.user = new User();
    },
    reset() {
      this.msg = '';
      this.Error.err = false;
      this.Error.hiden = true;
    }
  }
}
</script>
