function copiarEmail() {
    navigator.clipboard
        .writeText('contato@stocksafe.com')
        .then(() => {
            alert('Email copiado para área de transferência!');
        })
        .catch(() => {
            alert('Algo deu errado');
        });
}

function scrollFaleNos() {
    window.scrollTo(0, 687);
}

function scrollSobreNos() {
    // const body = document.getElementById("a")
    window.scrollTo(0, 1615);
}

function scrollVoltarTopo() {
    window.scrollTo(0, 0);
}