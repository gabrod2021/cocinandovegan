function guardar() {

    let c = document.getElementById("CodPlato").value
    let p = document.getElementById("Plato").value
    let d = document.getElementById("Descripcion").value
    let i = document.getElementById("Instrucciones").value

    let recetario = {
        CodPlato:c,
        Plato: p,
        Descripcion: d,
        Instrucciones: i
    }
    let url = "http://localhost:5000/recetario"
    var options = {
        body: JSON.stringify(recetario),
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

