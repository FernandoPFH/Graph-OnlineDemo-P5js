function fecharModalAdicionarNomeVertice() {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "none";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "none";

    document.getElementById("ModalAdicionarNomeVerticeInput").value = "";
    estadoAtual.trocaEscolha(ultimoEstado);
}

function abrirModalAdicionarNomeVertice(posicao,grafo) {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "block";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "block";

    document.getElementById("ModalAdicionarNomeVerticeBotao").onclick = () => {
        vertice = new Vertice(document.getElementById("ModalAdicionarNomeVerticeInput").value,posicao);
        grafo.adicionarVertice(vertice);

        fecharModalAdicionarNomeVertice();
    }
}

function botaoAdicionarVertice() {
    estadoAtual.trocaEscolha("AdicionarVertice");
}

function botaoAdicionarAresta() {
    estadoAtual.trocaEscolha("AdicionarAresta");
}

function botaoMoverVertice() {
    estadoAtual.trocaEscolha("MoverVertice");
}