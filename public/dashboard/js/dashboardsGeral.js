function uptime() {
    var select = `SELECT uptime FROM vw_uptime`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var dados = document.getElementById("uptime");

                dados.textContent = JSON.stringify(json);

            })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }

uptime()

function bandaLarga() {
    var select = `SELECT * FROM vw_banda_larga`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var dados = document.getElementById("bandaLarga");

                dados.textContent = JSON.stringify(json);
                
            })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }
    
bandaLarga()

function pacotesEnviados() {
    var select = `SELECT * FROM vw_media_pacotes_semana`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var dados = document.getElementById("pacotesEnviados");

                dados.textContent = JSON.stringify(json);

            })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }
    
pacotesEnviados()


function espacoUsado() {
    var select = `SELECT * FROM vw_armz_usado`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var dados = document.getElementById("espacoUsado");
                
                dados.textContent = JSON.stringify(json);

            })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }
    
espacoUsado()


function usoRam() {
    var select = `SELECT * FROM vw_ram`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var labels = json.map(item => item.fk_servidor);
                var data = json.map(item => item.uso_ram);

                var canvas = document.getElementById("ramChart");

                var ramChart = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Uso de RAM',
                            data: data,
                            borderColor: 'blue',
                            fill: false,
                        }],
                    },
                 options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
            })
        })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }
    
usoRam()


function usoCpu() {
    var select = `SELECT * FROM vw_cpu`

    fetch("/dashboard/listarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer: select
        }),
    }).then(function (resposta) {
        console.log("Entrando no then")

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json)

                var labels = json.map(item => item.fk_servidor);
                var data = json.map(item => item.uso_cpu);

                var canvas = document.getElementById("cpuChart");

                // Crie um gráfico usando Chart.js.
                var cpuChart = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Uso de CPU',
                            data: data,
                            borderColor: 'blue',
                            fill: false,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
            })
        })
        } else {
            console.log("Erro ao realizar busca")
        
            resposta.text().then((texto) => {
                console.log(texto)
            })
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    }
    
usoCpu()
    
