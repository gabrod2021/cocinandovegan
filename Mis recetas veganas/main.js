var cad= ` 
<div class="row">
          <div class="col">
            <h1 class="estilo-x">Cocinando Vegan</h1>
          </div>
        </div>
        <nav class=" nav navright ">
          <a href="./Index.html" class="indexboton">Home</a>
          <a href="./Contact.html" class="contactboton">Contacto</a>
          <a href="./Acerca.html" class="aboutboton">Nosotros</a>
          <a href="./Registro.html" class="regboton">Registrarse</a>
        </nav>

`
document.getElementById("idheader").innerHTML=cad

var cad= ` 
<br />
<nav class="navfooter">
  <a href="https://www.facebook.com/" target="blank"
    ><i class="fa fa-facebook-square fa-2x"></i
  ></a>
  <a href="https://www.instagram.com/" target="blank"
    ><i class="fa fa-instagram fa-2x"></i>
  </a>
  <a href="https://twitter.com/" target="blank"
    ><i class="fa fa-twitter-square fa-2x"></i
  ></a>
</nav>

<h5>Copyright © 2021.Todos los derechos reservados.</h5>
<br />


`
document.getElementById("idfooter").innerHTML=cad



cad= `
<table border 1 class="tablabig tdtemp">
  <tr class="th">
    <th>CODIGO</th>
    <th>NOMBRE</th>
    <th>DESCRIPCION</th>
    <th>INGREDIENTES</th>
    <th>INSTRUCCIONES</th>
    <th>Link</th>
`  
for(let i in data){
  cad=cad+`<tr>
            
            <td 
                    id="${data[i].ancla}" >${data[i].Codigo}
           </td> 
            <td><h4>${data[i].Nombre}<h4></td>
            <td>${data[i].Descripcion}</td>
            <td>`

            for(let j in data[i].Ingredientes){
              cad+=`<li>${data[i].Ingredientes[j]}</li>`
            }
            
            cad+=`</td>
                  <td>${data[i].Instrucciones}</td>
                  <td>
                      <a href="${data[i].link}">${data[i].Nombre}</a> 
                  </td>
            </tr>
           `
  }
       cad=cad+ `<table/>`
       console.log(cad)
       document.getElementById("tabla").innerHTML=cad