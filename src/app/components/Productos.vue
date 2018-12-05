<template>
  <div id="Products" class="Cont">
    <div id="navmen" class="navmen">
      <button  class="closebtn" v-on:click="showNav(false)">&times;</button>
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
    <div id="DisplayB" class="DisplayB" v-on:click="showNav(false)">
    </div>
    <div id="prodivC" class="DisplayB">
      <div class="Product" style="display:block;">
        <div class="row">
          <div class="col-12">
            <input class="input" type="text" v-model="product.NOMBRE" placeholder="Nombre">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <input class="input" type="number" v-model="product.PRECIO" placeholder="Precio">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="select">
              <div class="selectbtn-content" v-on:click="drop('uni')" v-on:focusout="drop('uni')">
                <button class="selectbtn">{{product.UNIDAD}}</button>
                <img src="/img/DropDown30px.png">
              </div>
              <div id="uni" class="select-content" style="min-width: 316px;">
                <button v-on:click="setUnidad('Botella','uni')">Botella</button>
                <button v-on:click="setUnidad('Pzs','uni')">Pzs</button>
                <button v-on:click="setUnidad('Kg','uni')">Kg</button>
                <button v-on:click="setUnidad('Lt','uni')">Lt</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="!this.edit">
          <div class="col-12">
            <input class="input" type="number" v-model="product.STOCK" placeholder="Stock">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="select">
              <div class="selectbtn-content" v-on:click="drop('mos')" v-on:focusout="drop('mos')">
                <button class="selectbtn">{{product.MOSTRAR}}</button>
                <img src="/img/DropDown30px.png">
              </div>
              <div id="mos" class="select-content" style="min-width: 316px;">
                <button v-on:click="setMostrar('Descontinuado','mos')">Descontinuado</button>
                <button v-on:click="setMostrar('En uso','mos')">En uso</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <button class="btnNormal" v-on:click="showProdivC(false)">Cancelar</button>
          </div>
          <div class="col-6" v-if="this.edit">
            <button class="btnNormal" v-on:click="setProduct">Actualizar</button>
          </div>
          <div class="col-6" v-else>
            <button class="btnNormal" v-on:click="setProduct">Guardar</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div id="Error" class="Error">
              {{this.msgError}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="display:flex;">
      <span>
        <button v-on:click="showNav(true)" id="btnMenu"><img src="/img/icono-menu.png"></button>
      </span>
      <span style="display:flex;margin: auto 0;">
        <input style="height:30px;padding:5px;" class="input" placeholder="Buscar" v-model="search" v-on:keyup="findProducts">
      </span>
      <span style="display:flex;margin: auto 10px;">
        <button v-on:click="showProdivC(true)" class="btnNormal">Agregar producto</button>
      </span>
      <div v-on:click="checked" style="display:flex;margin: auto 0;">
        <div style="margin-left:5px;display:inline-block;position:absolute;top:43px;" class="checkbox">
          <img id="checkmark">
        </div>
        <label style="margin: auto 0 auto 31px;">Mostrar productos descontinuados</label>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="scroll" style="margin: 0 15px">
          <tr>
            <td style="padding:0;">
              <table class="ProductL">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>En Stock</th>
                    <th>Unidad</th>
                    <th>Precio</th>
                    <th></th>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <div style="height:65vh;width:100%;overflow-y:auto;overflow-x:hidden;">
                <table class="ProductL">
                  <tbody>
                    <tr v-for="product of products">
                        <td v-bind:class="[product.MOSTRAR]">{{product.ID_PROD}}</td>
                        <td v-bind:class="[product.MOSTRAR]">{{product.NOMBRE}}</td>
                        <td v-bind:class="[product.MOSTRAR]">{{product.STOCK}}</td>
                        <td v-bind:class="[product.MOSTRAR]">{{product.UNIDAD}}</td>
                        <td v-bind:class="[product.MOSTRAR]">{{product.PRECIO}}</td>
                        <td v-bind:class="[product.MOSTRAR]"><button class="btnNormal" v-on:click="getProduct(product.ID_PROD)">Editar</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  class Product {
    constructor(name,price,unity,stock,show) {
      this.NOMBRE = name;
      this.PRECIO = price;
      this.UNIDAD = unity;
      this.STOCK = stock;
      this.MOSTRAR = show;
    }
  }

  export default {
    data(){
      return {
        products: [],
        product: new Product('','','Botella','','En uso'),
        edit: false,
        productToEdit: 0,
        showUsless: false,
        search: '',
        searched: false,
        msgError: 'Error div'
      }
    },
    created(){
      this.getProducts(false);
    },
    methods: {
      showNav(ok){
        if (ok) {
          document.getElementById('DisplayB').style.display="flex";
          document.getElementById("navmen").style.width = "250px";
        }else{
          document.getElementById('DisplayB').style.display="none";
          document.getElementById("navmen").style.width = "0";
        }
      },
      getProduct(id){
        fetch('/api/products/findId/' + id)
        .then(res => res.json())
        .then(data => {
          console.log(data[0][0]);
          this.product = new Product(data[0][0].NOMBRE,  data[0][0].PRECIO, data[0][0].UNIDAD, data[0][0].STOCK, data[0][0].MOSTRAR);
          this.edit=true;
          this.productToEdit = data[0][0].ID_PROD;
        })
        this.showProdivC(true);
      },
      showProdivC(show){
        if (show) {
          document.getElementById('prodivC').style.display = 'flex';
        } else {
          document.getElementById('prodivC').style.display = 'none';
          this.edit = false;
          this.product = new Product('','','Botella','','En uso');
        }
        if (this.serached)
          this.findProducts();
        else
          this.getProducts(this.showUsless)
      },
      getProducts(all){
        if (all) {
          fetch('/api/products/1')
          .then(res => res.json())
          .then(data => {
            this.products = data[0];
            console.log(data);
          })
        } else {
          fetch('/api/products/0')
          .then(res => res.json())
          .then(data => {
            this.products = data[0];
            console.log(data);
          })
        }
      },
      checked(){
        if (!this.showUsless) {
          document.getElementById('checkmark').src = "/img/Checkmark-20px.png";
        }else {
          document.getElementById('checkmark').src = "";
        }
        this.showUsless = !this.showUsless;
        if (this.searched)
          findProducts()
        else
          this.getProducts(this.showUsless);
      },
      findProducts(){
        if (this.search=='') {
          this.getProducts(this.showUsless);
          this.searched = false;
        } else {
          if (this.showUsless) {
            fetch('/api/products/findName/'+this.search+'/1')
            .then(res => res.json())
            .then(data => {
              this.products = data[0];
            })
          } else {
            fetch('/api/products/findName/'+this.search+'/0')
            .then(res => res.json())
            .then(data => {
              this.products = data[0];
            })
          }
          this.searched = true;
        }
      },
      setProduct(){
        if (this.edit) {
          fetch(`/api/products/findId/`+this.productToEdit,{
            method: 'PUT',
            body: JSON.stringify(this.product),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            if(data.isError)
              console.log(data.err);
            else
              this.showProdivC(false);
          })
        } else {
          fetch(`/api/products/`,{
            method: 'POST',
            body: JSON.stringify(this.product),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            if(data.isError)
              console.log(data.err);
            else
              this.showProdivC(false);
          })
        }
      },
      drop(id){
        let divS = document.getElementById(id);
        if (divS.style.display == 'block') {
          divS.style.display = 'none';
        } else {
          divS.style.display = 'block';
        }

      },
      setMostrar(cont, id){
        this.product.MOSTRAR = cont;
        document.getElementById(id).style.display = 'none';
      },
      setUnidad(cont, id){
        this.product.UNIDAD = cont;
        document.getElementById(id).style.display = 'none';
      }
    }
  }
</script>
