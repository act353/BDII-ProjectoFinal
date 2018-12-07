<template>
  <div id="Movment" class="Cont">
    <div id="navmen" class="navmen">
      <button  class="closebtn" v-on:click="closeNav">&times;</button>
      <div class="linkmen">
        <router-link to="/Productos"><span><img src="/img/icono-productos.png" alt="Inicio"></span><span><button>Productos</button></span></router-link>
      </div>
      <div class="linkmen">
        <router-link to="/Entries"><span><img src="/img/icono-inventario.png" alt="Inicio"></span><span><button>Inventario</button></span></router-link>
      </div>
      <!--div class="linkmen">
        <router-link to="/Sesion"><span><img src="/img/icono-mantenimiento.png" alt="Inicio"></span><span><button> Mantenimiento</button></span></router-link>
      </div-->
      <div class="linkmen">
        <router-link to="/Sesion"><span><img src="/img/icono-inicio.png" alt="Inicio"></span><span><button>Cerrar sesión</button></span></router-link>
      </div>
    </div>
    <div class="row" >
        <span>
          <button v-on:click="openNav" id="btnMenu"><img src="/img/icono-menu.png"></button>
        </span>
        <span style="display: inline;margin-left: 40px;">
          <label>No.Mov.</label>
          <input id="MovCode" style="width: 70px;height: 25px;" class="input" type="text" v-model="code" v-on:keyup.enter="setMov()" maxlength="10">
          <span>{{date.getDate()}}/{{date.getMonth()+1}}/{{date.getFullYear()}}</span>
        </span>
        <span style="margin-left:7vw;">
          <button style="padding:3px 10px;" class="btnNormal" v-on:click="showAdd(true)">Agregar</button>
        </span>
        <span id="ErrMov" class="error" style="margin-left:7vw;">
          {{this.Error}}
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
                <table class="entries">
                  <tbody>
                    <tr v-for="product of Entries">
                      <td>{{product.PRODUCTO}}</td>
                      <td>{{product.NOMBRE}}</td>
                      <td>{{product.UNIDAD}}</td>
                      <td>{{product.CANTIDAD}}</td>
                      <td>{{product.PRECIO}}</td>
                      <td>
                        <button type="button" class="btnNormal" v-on:click="deleteEntry(product.PRODUCTO)">Quitar</button>
                      </td>
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
    <div id="searchP" class="DisplayC" style="z-index:3;">
      <div class="Product" style="display:block;width:450px;">
        <div class="row">
          <div class="col-12">
            <input type="text" class="input" v-model="search" v-on:keyup="findProducts" placeholder="Ingresar nombre del producto a buscar">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <table class="scroll" style="margin: 0;">
              <tr>
                <td style="padding:0;">
                  <table class="ProductL">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Producto</th>
                        <th>En Stock</th>
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
                            <td>{{product.ID_PROD}}</td>
                            <td>{{product.NOMBRE}}</td>
                            <td>{{product.STOCK}}</td>
                            <td><button class="btnNormal" v-on:click="getProduct(product.ID_PROD)">Seleccionar</button></td>
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
    </div>
    <div class="DisplayB" id="AddEntry" v-on:click="closeNav">
      <div id="Product" class="Product" style="display:block;">
        <div class="row">
          <div class="col-12" style="display:flex;">
            <input type="text" style="width:30%;height:30px;" class="input" placeholder="Codigo" readonly v-model="Entrada.PRODUCTO">
            <input type="text" style="margin-left:1vw;width:40%;height:30px;" class="input" placeholder="Producto" readonly v-model="Entrada.NOMBRE">
            <button style="margin:auto 0 auto 1vw;" class="btnNormal" v-on:click="showDiv('searchP')">Buscar</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <input type="number" class="input" v-model="stockEntry" readonly>
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
            <div class="select">
              <div class="selectbtn-content" v-on:click="drop('ES')">
                <button class="selectbtn">{{Entrada.ESTADO}}</button>
                <img src="/img/DropDown30px.png">
              </div>
              <div id="ES" class="select-content" style="min-width: 316px;">
                <button v-on:click="setEstado('Entrada','ES')">Entrada</button>
                <button v-on:click="setEstado('Salida','ES')">Salida</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <button class="btnNormal" v-on:click="showAdd(false)">Cancelar</button>
          </div>
          <div class="col-6">
            <button class="btnNormal" v-on:click="addEntry">Agregar</button>
          </div>
        </div>
        <div id="ErrAdd" class="row error">
          {{this.Error}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  class Entrada {
    constructor(code, name, estado, price, quantity, entrada) {
      this.PRODUCTO = code;
      this.NOMBRE = name;
      this.PRECIO = price;
      this.CANTIDAD = quantity;
      this.ENTRADA = entrada;
      this.ESTADO = estado;
    }
  }
  class Movimiento{
    constructor(fecha,usuario){
      this.DATE = fecha;
      this.USER = usuario;
    }
  }

  export default {
    data(){
      return {
        products: [],
        Entries: [],
        Entrada: new Entrada(),
        date: '',
        code: '',
        setMovment: false,
        nav: false,
        search: '',
        Error: 'Error Div',
        stockEntry: 0,
        Mov: new Movimiento()
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
      getProdToEntries() {
        fetch(`/api/inventory/entries`)
        .then(res => res.json())
        .then(data => {
          this.products = data;
          console.log(data);
        })
      },
      getEntries() {
        fetch(`api/inventory/`+this.code)
        .then(res => res.json())
        .then(data => {
          if (data.hasError) {
            console.log(data.ErrorMsg);
          } else {
            this.Entries = data.rows;
            console.log(data);
          }
        })
      },
      showAdd(ok){
        //Muestra/Oculta el panel para agregar una entrada
        if (ok) {
          document.getElementById('AddEntry').style.display="flex";
        }else{
          document.getElementById('AddEntry').style.display="none";
          this.reset();
        }
      },
      reset(){
        //Resetea los valores de la variable Entrada
        this.Entrada = new Entrada();
        document.getElementById('ErrAdd').style.visibility = 'hidden';
        this.stockEntry = 0;
      },
      showDiv(id){
        //Muestra/Oculta un elemento html con el Id
        //indicado
        let divS = document.getElementById(id);
        if (divS.style.display=="block") {
          divS.style.display="none";
        } else {
          divS.style.display="block";
          if (id=='searchP') {
            this.getProdToEntries();
          }
        }
      },
      findProducts(){
        //Busca los productos que coincidan con la
        //descripcion escrita en el cuadro de busqueda
        if (this.search=='') {
          this.getProdToEntries();
        } else {
            fetch('/api/products/findName/'+this.search+'/0')
            .then(res => res.json())
            .then(data => {
              this.products = data[0];
            })
        }
      },
      getProduct(id){
        //Retorna un producto con el Id indicado
        fetch('/api/products/findId/' + id)
        .then(res => res.json())
        .then(data => {
          console.log(data[0][0]);
          this.Entrada = new Entrada(data[0][0].ID_PROD,  data[0][0].NOMBRE,'','','');
          this.stockEntry = data[0][0].STOCK;
          this.unidad = data[0][0].UNIDAD;
        })
        document.getElementById('searchP').style.display = "none";
      },
      addEntry(){
        //Función para agregar una entrada a la base
        //de datos
        if (setMovment) {
          this.Entrada.ENTRADA = this.code.trim();
        }
        fetch('api/inventory/entries',{
          method: 'POST',
          body: JSON.stringify(this.Entrada),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          if(data.hasError){
            this.Error = data.ErrorMsg;
            document.getElementById('ErrAdd').style.visibility = 'visible';
          }else{
            document.getElementById('ErrAdd').style.visibility = 'hidden';
            this.Error = "Error Div";
            this.showAdd(false);
            this.reset();
            this.getEntries();
          }
        })
      },
      setMov() {
        this.code = this.code.trim();
        this.setFecha();
        fetch(`api/inventory/`+this.code,{
          method: 'POST',
          body: JSON.stringify(this.Mov),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.hasError) {
            this.Error = data.ErrorMsg;
            document.getElementById('ErrMov').visibility = 'visible';
          } else {
            this.setMovment = true;
            document.getElementById('MovCode').readonly = true;
            document.getElementById('ErrMov').visibility = 'hidden';
          }
        })
      },
      setFecha(){
        let fecha = this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate();
        this.Mov = new Movimiento(fecha, 1);
        console.log(this.Mov);
      },
      drop(id){
        let divS = document.getElementById(id);
        if (divS.style.display == 'block') {
          divS.style.display = 'none';
        } else {
          divS.style.display = 'block';
        }

      },
      setEstado(cont, id){
        this.Entrada.ESTADO = cont;
        document.getElementById(id).style.display = 'none';
      }
    }
  }
</script>
