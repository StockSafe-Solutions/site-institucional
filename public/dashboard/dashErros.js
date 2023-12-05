
function carregarDados(){
    
    nomePagina.innerText = "Dashboard - Erros"
    carregarMenu("erro",true)



// ERROS USO DO DISCO
var select = `SELECT COUNT(*) as contagem FROM tb_servidor WHERE ((armazenamento_usado * 100) / armazenamento_total) <= 15 or ((armazenamento_usado * 100) / armazenamento_total) >= 75;`

fetch(`../../dash/listarDados/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        selectServer : select,
    }),
    
}).then(function (resposta) {
    console.log(resposta)

    if (resposta.status == 200) {
        resposta.json().then((json) => {
            console.log(json[0].contagem)

            var dados = document.getElementById("valorKPI4");
            dados.textContent = json[0].contagem;

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

    // ERROS USO DA CPU
    var select = `select SUM(uso_da_cpu <= 30 or uso_da_cpu >= 80) as contagem from vw_cpu_geral where dataDados - interval 30 day;`

fetch(`../../dash/listarDados/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        selectServer : select,
    }),
    
}).then(function (resposta) {
    console.log(resposta)

    if (resposta.status == 200) {
        resposta.json().then((json) => {
            console.log(json[0].contagem)

            var dados = document.getElementById("valorKPI2");
            dados.textContent = json[0].contagem;

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

    
    // ERROS USO DA RAM
var select = `select SUM(uso_da_ram <= 30 or uso_da_ram >= 80) as contagem from vw_ram_geral where dataDados - interval 30 day;`

fetch(`../../dash/listarDados/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        selectServer : select,
    }),
    
}).then(function (resposta) {
    console.log(resposta)

    if (resposta.status == 200) {
        resposta.json().then((json) => {
            console.log(json[0].contagem)

            var dados = document.getElementById("valorKPI3");
            dados.textContent = json[0].contagem;

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

    // ERROS UPTIME
    var select = `CALL kpi_uptime_erro(1);`

    fetch(`../../dash/listarDados/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectServer : select,
        }),
        
    }).then(function (resposta) {
        console.log(resposta)

        if (resposta.status == 200) {
            resposta.json().then((json) => {
                console.log(json[0][0].contagem)

                var dados = document.getElementById("valorKPI1");
                dados.textContent = json[0][0].contagem;

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

        
        
        

        const labels = []
        const dataValues = []

    
        var data = {
            labels: labels,
            datasets: [{
              label: 'Erros',
              data: dataValues,
              borderWidth: 1,
            }]
          };

        const config = {
          type: 'line',
          data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                }
            },
            scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Dias'
                  },
                  beginAtZero: true
                },
              y: {
                title: {
                    display: true,
                    text: 'Erros'
                },
                beginAtZero: true
              }
            }
          }
        }
        ;        
        
          const myChart = new Chart( document.getElementById('graficoErros'), config);

        fetch(`../../dash/listarGraficos/`).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);

                console.log(novoRegistro)

                for (let i = 0; i < novoRegistro[0].length; i++) {

                    console.log(novoRegistro[0][i])
                    
                    labels.push(novoRegistro[0][i].dia)
                    dataValues.push(novoRegistro[0][i].contagem_total)


                }
                
                console.log("Labels:", labels);
                console.log("Data Values:", dataValues);
                
                myChart.update()
            }) 
        }
    })


now = new Date()
dataAtual = 
now.getFullYear()+
"-"+(now.getMonth()+1)+
"-"+now.getDate()

}


function reloadDashboard(){
textoReload.innerText = "Atualizando"
iconReload.style = "animation-name: girar; animation-duration: 2250ms; pointer-events: none"
let i = 0
let animacaoTexto = setInterval(()=>{
    if(i == 2){
        clearInterval(animacaoTexto)
    }
    textoReload.innerText += "."
    i++
},1000)

setTimeout(()=>{
    let now = new Date()
    textoReload.innerText = "Atualizado pela ultima vez às "+now.getHours()+":"+
        (String(now.getMinutes()).length == 1 ? "0"+now.getMinutes() : now.getMinutes())
    iconReload.style = ""
},4500)

carregarDados()
}
setInterval(reloadDashboard,sessionStorage.intervalo_atualizacao)