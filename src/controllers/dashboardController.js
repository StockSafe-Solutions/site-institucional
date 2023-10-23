var dashboardModel = require("../models/dashboardModel");

function info(nome_funcao) {
  console.log(`\n[Dashboard Controller] ${nome_funcao}`)
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


module.exports = {
    buscarDados
}