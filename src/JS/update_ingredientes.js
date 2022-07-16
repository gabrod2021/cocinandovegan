var args = location.search.substr(1).split('&');
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(args)
const app = new Vue({
    el: "#app1",
    data: {
        ingredientes: [],
        errored: false,
        loading: true
    },
    created() {
        var url = 'http://localhost:5000/ingrediente/'+ parts[0][1]
        this.fetchData(url)
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.ingredientes = data;
                    this.loading = false;
                    console.log(this.ingredientes)
                })
                .catch(err => {
                    this.errored = true
                })
        },
        
           
}
})


document.getElementById("IdIngredientes").value = parts[0][1]

                        
function modificar() {
    let ii = document.getElementById("IdIngredientes").value
    let ip = document.getElementById("IdPlato").value
    let ig = document.getElementById("Ingrediente").value
    let cant = document.getElementById("Cantidad").value
    

    let ingredientes = {
        IdIngredientes: ii,
        IdPlato: ip,
        Ingrediente: ig,
        Cantidad: cant,
    }
    let url = "http://localhost:5000/ingrediente/" + ii
    var options = {
        body: JSON.stringify(ingredientes),
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

