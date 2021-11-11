// Fecha O Modal Usado Para Dar Nome Aos Vértices
function fecharModalAdicionarNomeVertice() {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "none";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "none";

    document.getElementById("ModalAdicionarNomeVerticeInput").value = "";
    estadoAtual.trocaEscolha(ultimoEstado);
}

// Abre O Modal Usado Para Dar Nome Aos Vértices
function abrirModalAdicionarNomeVertice(posicao,grafo) {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "block";
    document.getElementById("ModalAdicionarNomeVertice").style.display = "block";

    document.getElementById("ModalAdicionarNomeVerticeInput").focus();


    document.getElementById("ModalAdicionarNomeVerticeBotao").onclick = () => {
        vertice = new Vertice(document.getElementById("ModalAdicionarNomeVerticeInput").value,posicao);
        grafo.adicionarVertice(vertice);

        fecharModalAdicionarNomeVertice();
    }
}

// Restora A Aparencia Dos Botões Do Cabeçalho
function resetarCorDosBotoes(referencia) {
    referencia.parentElement.children.forEach(elementoFilho => {
        if (elementoFilho.tagName == "BUTTON") {
            elementoFilho.classList.remove("Botao-Selecionado");
        }
    });
}

// Troca O Estado Atual Para "AdicionarVertice" E As Cores Dos Botões
function botaoAdicionarVertice(referencia) {
    estadoAtual.trocaEscolha("AdicionarVertice");
    resetarCorDosBotoes(referencia);
    referencia.classList.add("Botao-Selecionado");
}

// Troca O Estado Atual Para "AdicionarAresta" E As Cores Dos Botões
function botaoAdicionarAresta(referencia) {
    estadoAtual.trocaEscolha("AdicionarAresta");
    resetarCorDosBotoes(referencia);
    referencia.classList.add("Botao-Selecionado");
}

// Troca O Estado Atual Para "MoverVertice" E As Cores Dos Botões
function botaoMoverVertice(referencia) {
    estadoAtual.trocaEscolha("MoverVertice");
    resetarCorDosBotoes(referencia);
    referencia.classList.add("Botao-Selecionado");
}

// Troca O Estado Atual Para "ExcluirObjetos" E As Cores Dos Botões
function botaoExcluirObjetos(referencia) {
    estadoAtual.trocaEscolha("ExcluirObjetos");
    resetarCorDosBotoes(referencia);
    referencia.classList.add("Botao-Selecionado");
}