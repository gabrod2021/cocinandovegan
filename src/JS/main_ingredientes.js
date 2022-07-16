if (document.getElementById("app1")) {
    const app1 = new Vue({
        el: "#app1",
        data: {
            errored: false,
            loading: true,
            ingrediente_receta: [],
            codReceta: localStorage.getItem('codigoReceta')
        },
        created() {
            var url = 'http://localhost:5000/ingredientes'
            this.fetchData(url)

            this.codReceta = localStorage.getItem('codigoReceta')

        },
        methods: {
            cerrar(){
                console.log('hola');
                document.getElementById('app1').reload()
            },
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.ingredientes = data;
                        console.log(data)
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(ingrediente) {
                const url = 'http://localhost:5000/ingrediente/' + ingrediente;
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




