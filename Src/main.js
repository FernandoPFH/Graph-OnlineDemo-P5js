// Variável Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

// Variável Para A Estrutura Geral Do Grafo
var grafo;

// Variáveis Para Configuração Do Grafos
var tamanhoDoCirculoDoVertice;
var corDoCirculoDoVertice;
var tamanhoDoTextoDoVertice;
var corDoTextoDoVertice;
var corDaLinhaDaAresta;
var grossuraDaLinhaDaAresta;

// Variáveis Para Compreensão De Estado
var estadoAtual;
var ultimoEstado;

// Variáveis Para Guardar O Ponto Clicado Para Criar Aresta
var pontoClicadoParaCriacaoDeAresta;

// Variáveis Para Uso Durante Movimento Dos Pontos
var pontoMexido;
var offsetPontoMexido;

// Atualiza Os Campos De Mostra Dos Valores Do Menu De Configurações
function atualizarValoresDasMostragemDoMenu() {
    // Vértices
    document.getElementById("VerticeTamanhoMostragem").innerHTML = document.getElementById("VerticeTamanho").value;

    document.getElementById("VerticeTamanhoTextoMostragem").innerHTML = document.getElementById("VerticeTamanhoTexto").value;

    // Arestas
    document.getElementById("ArestaGrossuraMostragem").innerHTML = document.getElementById("ArestaGrossura").value;
}

// Converte Um Código Hexadecimal De Cor Para Tres Valores RGB
function textoHexParaValoresRGB(textoHex) {
    if (textoHex.length < 7) {
        return;
    }

    let textoVermelho = textoHex.substring(1,3);
    valorVermelho = parseInt(textoVermelho[0].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15")) * 16;
    valorVermelho += parseInt(textoVermelho[1].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15"));

    let textoVerde = textoHex.substring(3,5);
    valorVerde = parseInt(textoVerde[0].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15")) * 16;
    valorVerde += parseInt(textoVerde[1].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15"));

    let textoAzul = textoHex.substring(5,7);
    valorAzul = parseInt(textoAzul[0].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15")) * 16;
    valorAzul += parseInt(textoAzul[1].replace("a","10").replace("b","11").replace("c","12").replace("d","13").replace("e","14").replace("f","15"));

    return {"r":valorVermelho,"g":valorVerde,"b":valorAzul};
}

// Mudar Os Valores Do Objetos Do Canvas Baseado Nos Valores Do Menu
function mudarValoresDoCanvasBaseadoNoMenu() {
    // Vértice
    tamanhoDoCirculoDoVertice = parseInt(document.getElementById("VerticeTamanho").value);
    tamanhoDoTextoDoVertice = parseInt(document.getElementById("VerticeTamanhoTexto").value);

    let corDoCirculoDoVertice_temp = textoHexParaValoresRGB(document.getElementById("VerticeCor").value);
    corDoCirculoDoVertice = color(corDoCirculoDoVertice_temp.r,corDoCirculoDoVertice_temp.g,corDoCirculoDoVertice_temp.b);
    
    let corDoTextoDoVertice_temp = textoHexParaValoresRGB(document.getElementById("VerticeCorTexto").value);
    corDoTextoDoVertice = color(corDoTextoDoVertice_temp.r,corDoTextoDoVertice_temp.g,corDoTextoDoVertice_temp.b);

    // Arestas
    grossuraDaLinhaDaAresta = document.getElementById("ArestaGrossura").value;

    let corDaLinhaDaAresta_temp = textoHexParaValoresRGB(document.getElementById("ArestaCor").value);
    corDaLinhaDaAresta = color(corDaLinhaDaAresta_temp.r,corDaLinhaDaAresta_temp.g,corDaLinhaDaAresta_temp.b);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    tamanhoDoCirculoDoVertice=25;
    corDoCirculoDoVertice=color(255);
    tamanhoDoTextoDoVertice=15;
    corDoTextoDoVertice=color(0);
    corDaLinhaDaAresta=color(0);
    grossuraDaLinhaDaAresta=1;

    document.getElementsByClassName("p5Canvas")[0].onclick = () => {mouseClicadoNoCanvas();}

    document.getElementsByClassName("Modal").forEach(elemento => {
        elemento.onclick = (event) => {
            event.stopPropagation();
        }
    });

    grafo = new Grafo("Grafo",[],[]);

    estadoAtual = new Estado("NoMenu");
}

function draw() {
    background(51);

    atualizarValoresDasMostragemDoMenu();
    mudarValoresDoCanvasBaseadoNoMenu();

    grafo.desenhar(tamanhoDoCirculoDoVertice,corDoCirculoDoVertice,corDoTextoDoVertice,tamanhoDoTextoDoVertice,corDaLinhaDaAresta,grossuraDaLinhaDaAresta);

    // Troca O Ponteiro Do Mouse Se Ele Estiver Em Cima De Um Ponto
    if (grafo.vertices.some(vertice => vertice.mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculoDoVertice)) && estadoAtual.compararEscolha("MoverVertice")) {
        document.body.style.cursor = "move";
    } else {
        document.body.style.cursor = "default";
    }

    if (!estadoAtual.compararEscolha("AdicionarAresta") && pontoClicadoParaCriacaoDeAresta) {
        pontoClicadoParaCriacaoDeAresta.selecionado = false;
        pontoClicadoParaCriacaoDeAresta = null;
    }
}

// Função Chamada Quando Um Botão Do Mouse É Clicado No canvas
function mouseClicadoNoCanvas() {
    if (estadoAtual.compararEscolha("AdicionarVertice")) {
        ultimoEstado = estadoAtual.pegarEscolha();
        estadoAtual.trocaEscolha("NoMenu");
        abrirModalAdicionarNomeVertice(createVector(mouseX,mouseY),grafo);
    } else if (estadoAtual.compararEscolha("ExcluirObjetos")) {
        grafo.vertices.forEach(vertice => {
            if (vertice.mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculoDoVertice)) {
                grafo.removerVertice(vertice);
            }
        });
        
        grafo.arestas.forEach(aresta => {
            if (aresta.mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculoDoVertice)) {
                grafo.removerAresta(aresta);
            }
        });
    } else if (estadoAtual.compararEscolha("AdicionarAresta")) {
        grafo.vertices.forEach(vertice => {
            if (vertice.mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculoDoVertice)) {
                if (!pontoClicadoParaCriacaoDeAresta) {
                    vertice.selecionado = true;
                    pontoClicadoParaCriacaoDeAresta = vertice;
                } else {
                    ultimoEstado = estadoAtual.pegarEscolha();
                    estadoAtual.trocaEscolha("NoMenu");
                    abrirModalAdicionarAresta(pontoClicadoParaCriacaoDeAresta,vertice,grafo);
                }
            }
        });
    }
}

// Função Chamada Quando Um Botão Do Mouse É Pressionado E O Mouse É Mexido
function mouseDragged() {
    if (estadoAtual.compararEscolha("MoverVertice")) {
        if (!pontoMexido) {
            grafo.vertices.forEach(vertice => {
                if (vertice.mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculoDoVertice)) {
                    pontoMexido = vertice;
                    offsetPontoMexido = createVector(mouseX - vertice.posicao.x,mouseY - vertice.posicao.y)
                    pontoMexido.posicao = createVector(mouseX - offsetPontoMexido.x,mouseY - offsetPontoMexido.y);
                }
            })
        } else {
            pontoMexido.posicao = createVector(mouseX - offsetPontoMexido.x,mouseY - offsetPontoMexido.y);
        }
    }
}

// Função Chamada Quando Um Botão Do Mouse É Solto
function mouseReleased() {
    pontoMexido = null;
    offsetPontoMexido = null;
}

// Tira O Ponto Selecionado Se O Botão ESC É Precionado
function keyPressed() {
    if (keyCode === ESCAPE) {
        if (pontoClicadoParaCriacaoDeAresta) {
            pontoClicadoParaCriacaoDeAresta.selecionado = false;
            pontoClicadoParaCriacaoDeAresta = null;
        }
    }
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    grafo.vertices.forEach(vertice => {
        let novaPosicaoXDoVertice = (vertice.posicao.x - 0) * (windowWidth - 0) / (tamanhoAtualCanvas.x - 0) + 0;
        let novaPosicaoYDoVertice = (vertice.posicao.y - 0) * (windowHeight - 0) / (tamanhoAtualCanvas.y - 0) + 0;

        vertice.posicao = createVector(novaPosicaoXDoVertice,novaPosicaoYDoVertice);
    });

    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}