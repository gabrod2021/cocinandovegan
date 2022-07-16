if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            recetario: [],
            errored: false,
            loading: true,
        },
        created() {
            var url = 'http://localhost:5000/recetario'
            this.fetchData(url)
        },
        methods: {
            ver_ingredientes(codigo) {
                localStorage.setItem('codigoReceta', codigo)
                console.log("hola")
                // window.location.assign("./abm_ingredientes.html")
            },
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.recetario = data;
                        console.log(data);
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(receta) {
                const url = 'http://localhost:5000/receta/' + receta;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            },


        }
    })
}
const app1 = new Vue({
    el: "#app1"
})