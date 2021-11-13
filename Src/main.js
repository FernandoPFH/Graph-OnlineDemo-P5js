// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var grafo;

// Variaveis Para Compreensão De Estado
var estadoAtual;
var ultimoEstado;

// Variaveis Para Guardar O Ponto Clicado Para Criar Aresta
var pontoClicadoParaCriacaoDeAresta;

// Variaveis Para Uso Durante Movimento Dos Pontos
var pontoMexido;
var offsetPontoMexido;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    document.getElementsByClassName("p5Canvas")[0].onclick = () => {mouseClicadoNoCanvas();}

    grafo = new Grafo("",[],[]);

    estadoAtual = new Estado("NoMenu");
}

function draw() {
    background(51);

    grafo.desenhar();

    // Troca O Ponteiro Do Mouse Se Ele Estiver Em Cima De Um Ponto
    if (grafo.vertices.some(vertice => vertice.mouseEstaEmCima(mouseX,mouseY)) && estadoAtual.compararEscolha("MoverVertice")) {
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
        abrirModalAdicionarNomeVertice(createVector(mouseX,mouseY),grafo);
        ultimoEstado = estadoAtual.pegarEscolha();
        estadoAtual.trocaEscolha("NoMenu");
    } else if (estadoAtual.compararEscolha("ExcluirObjetos")) {
        grafo.vertices.forEach(vertice => {
            if (vertice.mouseEstaEmCima(mouseX,mouseY)) {
                grafo.removerVertice(vertice);
            }
        });
        
        grafo.arestas.forEach(aresta => {
            if (aresta.mouseEstaEmCima(mouseX,mouseY)) {
                grafo.removerAresta(aresta);
            }
        });
    } else if (estadoAtual.compararEscolha("AdicionarAresta")) {
        grafo.vertices.forEach(vertice => {
            if (vertice.mouseEstaEmCima(mouseX,mouseY)) {
                if (!pontoClicadoParaCriacaoDeAresta) {
                    vertice.selecionado = true;
                    pontoClicadoParaCriacaoDeAresta = vertice;
                } else {
                    grafo.adicionarAresta(new Aresta(pontoClicadoParaCriacaoDeAresta,vertice,true));

                    pontoClicadoParaCriacaoDeAresta.selecionado = false;
                    pontoClicadoParaCriacaoDeAresta = null;
                }
            }
        })
    }
}

// Função Chamada Quando Um Botão Do Mouse É Pressionado E O Mouse É Mexido
function mouseDragged() {
    if (estadoAtual.compararEscolha("MoverVertice")) {
        if (!pontoMexido) {
            grafo.vertices.forEach(vertice => {
                if (vertice.mouseEstaEmCima(mouseX,mouseY)) {
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
        pontoClicadoParaCriacaoDeAresta.selecionado = false;
        pontoClicadoParaCriacaoDeAresta = null;
    }
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}