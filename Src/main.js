// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var grafo;

var estadoAtual;
var ultimoEstado;

var pontoMexido

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    grafo = new Grafo("",[],[]);

    estadoAtual = new Estado("AdicionarVertice");
}

function draw() {
    background(51);

    grafo.desenhar();
}

function mouseClicked() {
    if (estadoAtual.compararEscolha("AdicionarVertice")) {
        abrirModalAdicionarNomeVertice(createVector(mouseX,mouseY),grafo);
        ultimoEstado = estadoAtual.pegarEscolha();
        estadoAtual.trocaEscolha("NoMenu");
    }
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}