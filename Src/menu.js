function fecharModalAdicionarNomeVertice() {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "none";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "none";

    document.getElementById("ModalAdicionarNomeVerticeInput").value = "";
}

function abrirModalAdicionarNomeVertice(posicao,grafo) {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "block";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "block";

    document.getElementById("ModalAdicionarNomeVerticeBotao").onclick = () => {
        vertice = new Vertice(document.getElementById("ModalAdicionarNomeVerticeInput").value,posicao);
        grafo.adicionarVertice(vertice);

        fecharModalAdicionarNomeVertice();
        estadoAtual.trocaEscolha(ultimoEstado);
    }
}

function botaoAdicionarVertice() {
    estadoAtual.trocaEscolha("AdicionarVertice");
}

function botaoAdicionarAresta() {
    estadoAtual.trocaEscolha("AdicionarAresta");
}