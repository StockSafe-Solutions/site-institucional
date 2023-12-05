var dashboardModel = require("../models/dashModel");

function info(nome_funcao) {
  console.log(`\n[Kpi Controller] ${nome_funcao}`)
}

function buscarDados(req, res) {
    info("/buscarDados")
  
    var select = req.body.selectServer
    console.log(req.body)
  
    if (select == undefined) {
      res.status(400).send("Undefined")
    }
  
    dashboardModel.buscarDados(select).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(200).json(resultado)
      } else {
        res.status(204).json(resultado)
      }
    }
    ).catch((error) => {
      console.log(error)
      console.log("Erro nas Dashboards\n", erro.sqlMessage)
    }
    )
  }

  function buscarGraficos(req, res) {
    dashboardModel.buscarGraficos().then(function (novoRegistro) {
        if (novoRegistro.length > 0) {
            res.status(200).json(novoRegistro);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    });
}

function kpiEspecifica(req, res) {
  var codServidor = req.params.codServidor

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardModel.kpiEspecifica(codServidor).then((resultado) => {
    if (resultado.length > 0) {
      console.log(resultado)
      res.status(200).json(resultado[0])
    } else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function listarRegistrosData(req, res){
  const data = req.params.data;
  console.log(data)
  if(data == undefined){
    res.status(400).send("Data vazia.");
  }else{
    dashboardModel.listarRegistrosData(data).then(
      function(resultado){
        res.json(resultado);
      }
    ).catch(
      function(erro){
        console.log(erro);
        console.log(
          `\n houve um erro ao listar registro!`, erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    )
  }
}

function listarRegistrosDataEspeficico(req, res){
  const data = req.params.data;
  const codServidor = req.params.codServidor;
  if(data == undefined || codServidor == undefined){
    res.status(400).send("Vazio");
  }else{
    dashboardModel.listarRegistrosDataEspeficico(codServidor,data).then(
      function(resultado){
        res.json(resultado);
      }
    ).catch(
      function(erro){
        console.log(erro);
        console.log(
          `\n houve um erro ao listar registro!`, erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    )
  }
}

function csvRam(req, res) {
	const data = req.params.data;
	const codServidor = req.params.codServidor;
	if (data == undefined || codServidor == undefined) {
		res.status(400).send("Vazio");
	} else {
		dashboardModel
			.csvRam(codServidor, data)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					`\n houve um erro ao listar registro!`,
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function ramLivreEspeficico(req, res) {
	const codServidor = req.params.codServidor;
	if ( codServidor == undefined) {
		res.status(400).send("Vazio");
	} else {
		dashboardModel.ramLivreEspeficico(codServidor)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					`\n houve um erro ao ver livre registro!`,
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}
function ramUsadoEspeficico(req, res) {
	const codServidor = req.params.codServidor;
	if (codServidor == undefined) {
		res.status(400).send("Vazio");
	} else {
		dashboardModel
			.ramUsadaEspeficico(codServidor)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					`\n houve um erro ao ver usado registro!`,
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function graficosEspecificos(req, res) {
  var codServidor = req.params.codServidor

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardModel.cpuEspecifico(codServidor).then((resultado1) => {
    if (resultado1.length > 0) {
      dashboardModel.ramEspecifico(codServidor).then((resultado2) => {
        if (resultado2.length > 0) {
          res.status(200).json([resultado1,resultado2])
        } else {
          res.status(404).send()
        }}).catch((error) => {
        console.log(error)
        console.log("Erro nas Dashboards\n", error.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function kpiGeral(req, res) {

  dashboardModel.kpiGeral().then((resultado) => {
    if (resultado.length > 0) {
      console.log(resultado)
      res.status(200).json(resultado[0])
    } else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function graficosGerais(req, res) {

  dashboardModel.cpuGeral().then((resultado1) => {
    if (resultado1.length > 0) {
      dashboardModel.ramGeral().then((resultado2) => {
        if (resultado2.length > 0) {
          res.status(200).json([resultado1,resultado2])
        } else {
          res.status(404).send()
        }}).catch((error) => {
        console.log(error)
        console.log("Erro nas Dashboards\n", erro.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })

}

function horaRam(req, res){
  const codServidor = req.params.codServidor;
  	if (codServidor == undefined) {
		res.status(400).send("Vazio");
	} else {
		dashboardModel.horaRam(codServidor)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					`\n houve um erro ao ver hora RAM registro!`,
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function kpiRam(req, res) {
	const codServidor = req.params.codServidor;
	if (codServidor == undefined) {
		res.status(400).send("Vazio");
	} else {
		dashboardModel
			.kpiRam(codServidor)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					`\n houve um erro ao ver hora RAM registro!`,
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
<<<<<<< HEAD
    buscarGraficos,
    buscarDados,
    kpiEspecifica,
    graficosEspecificos,
    kpiGeral,
    graficosGerais
}
=======
	kpiEspecifica,
	graficosEspecificos,
	kpiGeral,
	graficosGerais,
	listarRegistrosData,
	listarRegistrosDataEspeficico,
	ramLivreEspeficico,
	ramUsadoEspeficico,
	horaRam,
	kpiRam,
  csvRam
};
>>>>>>> gusJulia
