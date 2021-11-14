// Fecha O Modal Usado Para Dar Nome Aos Vértices
function fecharModalAdicionarNomeVertice() {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "none";

    document.getElementById("ModalAdicionarNomeVerticeInput").value = "";
    estadoAtual.trocaEscolha(ultimoEstado);
}

// Abre O Modal Usado Para Dar Nome Aos Vértices
function abrirModalAdicionarNomeVertice(posicao,grafo) {
    document.getElementById("ModalBackgroundAdicionarNomeVertice").style.display = "flex";

    document.getElementById("ModalAdicionarNomeVerticeInput").focus();

    document.getElementById("ModalAdicionarNomeVerticeBotao").onclick = () => {
        if (document.getElementById("ModalAdicionarNomeVerticeInput").value.length > 0) {
            vertice = new Vertice(document.getElementById("ModalAdicionarNomeVerticeInput").value,posicao);
            grafo.adicionarVertice(vertice);
    
            fecharModalAdicionarNomeVertice();
        }
    }

    document.getElementById("ModalAdicionarNomeVerticeInput").onkeyup = () => {
        if (key === "Enter" && document.getElementById("ModalAdicionarNomeVerticeInput").value.length > 0) {
            vertice = new Vertice(document.getElementById("ModalAdicionarNomeVerticeInput").value,posicao);
            grafo.adicionarVertice(vertice);
    
            fecharModalAdicionarNomeVertice();
        }
    }
}

// Fecha O Modal Usado Para Dar Direção A Aresta
function fecharModalAdicionarAresta() {
    document.getElementById("ModalBackgroundAdicionarAresta").style.display = "none";

    if (pontoClicadoParaCriacaoDeAresta) {
        pontoClicadoParaCriacaoDeAresta.selecionado = false;
        pontoClicadoParaCriacaoDeAresta = null;
    }

    estadoAtual.trocaEscolha(ultimoEstado);
}

// Abre O Modal Usado Para Dar Direção A Aresta
function abrirModalAdicionarAresta(verticeInicial,verticeFinal,grafo) {
    document.getElementById("ModalBackgroundAdicionarAresta").style.display = "flex";


    document.getElementById("ModalAdicionarArestaBotao").onclick = () => {
        grafo.adicionarAresta(new Aresta(verticeInicial,verticeFinal,document.getElementById("ModalAdicionarArestaCheckBox").checked));

        verticeInicial.selecionado = false;
        verticeInicial = null;

        fecharModalAdicionarAresta();
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

// Aumentar A Área Para Interagir Com Um CheckBox
function selecionarCheckBox(elemento) {
    elemento.getElementsByTagName('input')[0].checked = !elemento.getElementsByTagName('input')[0].checked;
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

// Abre O Menu Lateral De Informações
function abrirMenuLateral() {
    document.getElementById("MenuLateral").style.display = "flex";
}

// Fecha O Menu Lateral De Informações
function fecharMenuLateral() {
    document.getElementById("MenuLateral").style.display = "none";
}

// Abrir Menu De Informações Do Grafo
function abrirMenuDeInformacoesDeGrafo(elemento) {
    elemento.classList.add("Selecionado");
    elemento.parentElement.children[1].classList.remove("Selecionado");

    document.getElementById("Informacoes-Vertice").classList.remove("Informacao-Selecinada");
    document.getElementById("Informacoes-Grafo").classList.add("Informacao-Selecinada");
}

// Abrir Menu De Informações De Vértice
function abrirMenuDeInformacoesDeVertice(elemento) {
    elemento.classList.add("Selecionado");
    elemento.parentElement.children[0].classList.remove("Selecionado");

    document.getElementById("Informacoes-Grafo").classList.remove("Informacao-Selecinada");
    document.getElementById("Informacoes-Vertice").classList.add("Informacao-Selecinada");

    grafo.vertices[0].atualizarMenuDeInformacoes();
}

// Mudança De Escolha De Vértice No Menu De Informacao
function mudancaDeEscolhaDeVerticeNoMenuDeInformacao(valor=null) {
    if (!valor) {
        grafo.vertices[parseInt(document.getElementById("ListaDeVerticesParaSelecionar").value)].atualizarMenuDeInformacoes();
    } else {
        grafo.vertices[valor].atualizarMenuDeInformacoes();
    }
}

// Encaminha O Usuário Para A Página De Informações Do Vértice Para Um Vértice Específico
function encaminharParaInformacaoDoVertice(posicaoDoVertice) {
    abrirMenuDeInformacoesDeVertice(document.getElementById("Escolha-De-Informacao-Vertice"));

    document.getElementById("ListaDeVerticesParaSelecionar").value = posicaoDoVertice;

    grafo.vertices[posicaoDoVertice].atualizarMenuDeInformacoes();
}