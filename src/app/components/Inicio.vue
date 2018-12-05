<template>
  <div id="Movment" class="Cont">
    <div id="navmen" class="navmen">
      <button  class="closebtn" v-on:click="closeNav">&times;</button>
      <div class="linkmen">
        <router-link to="/Productos"><span><img src="/img/icono-inicio.png" alt="Inicio"></span><span><button>Productos</button></span></router-link>
      </div>
      <div class="linkmen">
        <router-link to="/Entries"><span><img src="/img/icono-inventario.png" alt="Inicio"></span><span><button>Inventario</button></span></router-link>
      </div>
      <div class="linkmen">
        <router-link to="/Sesion"><span><img src="/img/icono-mantenimiento.png" alt="Inicio"></span><span><button> Mantenimiento</button></span></router-link>
      </div>
      <div class="linkmen">
        <router-link to="/Sesion"><span><img src="/img/icono-inicio.png" alt="Inicio"></span><span><button>Cerrar sesión</button></span></router-link>
      </div>
    </div>
    <div class="row" >
        <span>
          <button v-on:click="openNav" id="btnMenu"><img src="/img/icono-menu.png"></button>
        </span>
        <span style="display: inline;margin-left: 40px;">
          <label>No.Factura</label>
          <input style="width: 70px;height: 25px;" class="input" type="numbre">
          <span>{{date.getDate()}}/{{date.getMonth()+1}}/{{date.getFullYear()}}</span>
        </span>
        <span style="margin-left:7vw;">
          <button style="padding:3px 10px;" class="btnNormal" v-on:click="showAdd(true)">Agregar</button>
        </span>
    </div>
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-10">
        <table class="scroll">
          <tr>
            <td style="padding:0;">
              <table class="entries">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Unidad</th>
                    <th>Cantidad</th>
                    <th>En Stock</th>
                    <th>Precio</th>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <div style="height:65vh;width:100%;overflow-y:auto;overflow-x:hidden;">
                <table class="entries">
                  <tbody>
                    <tr v-on:dblclick="prueba(1)">
                      <td>3</td>
                      <td>3</td>
                      <td>3</td>
                      <td>3</td>
                      <td>3</td>
                      <td>3</td>
                    </tr>
                    <tr v-for="product of Entries">
                      <td>{{product.codigo}}</td>
                      <td>{{product.nombre}}</td>
                      <td>{{product.medida}}</td>
                      <td>{{product.cantidad}}</td>
                      <td>{{product.cantidadA}}</td>
                      <td>{{product.precio}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-1">
      </div>
    </div>
    <div class="DisplayB" id="AddEntry" v-on:click="closeNav">
      <div id="Product" class="Product" style="display:block;">
        <div class="row">
          <div class="col-12" style="display:flex;">
            <input type="text" style="width:30%;height:30px;" class="input" placeholder="Codigo" readonly>
            <input type="text" style="margin-left:1vw;width:40%;height:30px;" class="input" placeholder="Producto" readonly>
            <button style="margin:auto 0 auto 1vw;" class="btnNormal">Buscar</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <input type="number" style="width:100%;height:30px;" class="input" placeholder="Precio" v-model="Entrada.PRECIO">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <input type="number" style="width:100%;height:30px;" class="input" placeholder="Cantidad" v-model="Entrada.CANTIDAD">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="btnNormal" v-on:click="showAdd(false)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  class Entrada {
    constructor(code, name, price, quantity) {
      this.CODIGO = code;
      this.NOMBRE = name;
      this.PRECIO = price;
      this.CANTIDAD = quantity;
    }
  }

  export default {
    data(){
      return {
        products: [],
        Entries: [],
        Entrada: new Entrada(),
        date: '',
        nav:false
      }
    },
    created(){
      this.date = new Date();
    },
    methods: {
      openNav() {
        document.getElementById("navmen").style.width = "250px";
        document.getElementById("Product").style.display = "none";
        this.showAdd(true);
        this.nav=true;
      },
      closeNav() {
        if (this.nav) {
          document.getElementById("navmen").style.width = "0";
          this.showAdd(false);
          document.getElementById("Product").style.display = "flex";
          this.nav=false;
        }
      },
      getEntries() {
        fetch(`/api/inventory/entries`)
        .then(res => res.json())
        .then(data => {
          this.Entries = data;
        })
      },
      showAdd(ok){
        if (ok) {
          document.getElementById('AddEntry').style.display="flex";
        }else{
          document.getElementById('AddEntry').style.display="none";
          this.reset();
        }
      },
      reset(){
        this.Entrada = new Entrada();
      },
      showDiv(id){
        divS = document.getElementById(id);
        if (divS.style.display=="block") {
          divS.style.display="none";
        } else {
          divS.style.display="block";
        }
      }
    }
  }
</script>
