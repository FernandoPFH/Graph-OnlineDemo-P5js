// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var grafo;

// Variaveis Para Compreensão De Estado
var estadoAtual;
var ultimoEstado;

// Variaveis Para Uso Durante Movimento Dos Pontos
var pontoMexido;
var offsetPontoMexido;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    document.getElementsByClassName("p5Canvas")[0].onclick = () => {mouseClicadoNoCanvas();}

    grafo = new Grafo("",[],[]);

    estadoAtual = new Estado("AdicionarVertice");
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
}

// Função Chamada Quando Um Botão Do Mouse É Clicado No canvas
function mouseClicadoNoCanvas() {
    if (estadoAtual.compararEscolha("AdicionarVertice")) {
        abrirModalAdicionarNomeVertice(createVector(mouseX,mouseY),grafo);
        ultimoEstado = estadoAtual.pegarEscolha();
        estadoAtual.trocaEscolha("NoMenu");
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

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}