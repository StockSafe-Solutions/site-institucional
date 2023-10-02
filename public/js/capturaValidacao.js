 //  address.style.display = "none"

 infos.style.display = "block"
 address.style.opacity = "0"
 function trocar() {
     address.style.transition = "all 0.3s linear"
     infos.style.opacity = "0"
     tituloCad.innerHTML = "Qual seu endereço?"
     setTimeout(() => {
         infos.style.display = "none"
         // address.style.display = "block"
         address.style.opacity = "1"
         address.style.position = "relative"
     }, 500)
 }

 function catchAddress() {
     fetch(`https://viacep.com.br/ws/${iptCEP.value}/json`)
         .then(data => {
             return data.json();
         })
         .then(post => {
             if (post.logradouro == undefined || post.bairro == undefined || post.localidade == undefined) {

                 console.error("cep nao encontrado")
             }
             else {
                 iptRua.value = post.logradouro
                 iptBairro.value = post.bairro
                 iptCidade.value = post.localidade
             }

         })
         .catch(error => {
             console.log("cep nao encontrado")
         })

 }

 function catchCNPJ() {
     fetch(`https://publica.cnpj.ws/cnpj/${iptCNPJ.value}`)
         .then(data => {
             return data.json();
         })
         .then(post => {
             if (post.razao_social == undefined) {

                 console.error("CNPJ nao encontrado")
             }
             else {
                 iptRazao.value = post.razao_social

             }

         })
         .catch(error => {
             console.log("cnpj nao encontrado")
         })

 }
