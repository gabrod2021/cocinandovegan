var args = location.search.substr(1).split('&');
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(args)
const app = new Vue({
    el: "#app",
    data: {
        recetario: [],
        errored: false,
        loading: true
    },
    created() {
        var url = 'http://localhost:5000/receta/'+ parts[0][1]
        this.fetchData(url)
    },

    methods: {
        ver_ingredientes() {
           localStorage.setItem('codigoReceta', parts[0][1] )
            console.log(parts[0][1])
            // window.location.assign("./abm_ingredientes.html")
        },
    
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.recetario = data;
                    this.loading = false;
                    console.log(this.recetario)
                })
                .catch(err => {
                    this.errored = true
                })
        },
        
           
    }
})




                        
function modificar() {
    let c = document.getElementById("CodPlato").value
    let p = document.getElementById("Plato").value
    let d = document.getElementById("Descripcion").value
    let i = document.getElementById("Instrucciones").value

    let recetario = {
        CodPlato: c,
        Plato: p,
        Descripcion: d,
        Instrucciones: i
    }
    let url = "http://localhost:5000/receta/" + c
    var options = {
        body: JSON.stringify(recetario),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })      
}
 