function guardar() {

    let ip = document.getElementById("IdPlato").value
    let ig = document.getElementById("Ingrediente").value
    let cant = document.getElementById("Cantidad").value
    

    let ingredientes = {
        IdPlato:ip,
        Ingrediente: ig,
        Cantidad: cant,
        
    }
    let url = "http://localhost:5000/ingredientes"
    var options = {
        body: JSON.stringify(ingredientes),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")

            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}

