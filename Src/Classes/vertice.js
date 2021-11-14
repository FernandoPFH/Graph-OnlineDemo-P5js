class Vertice {
    constructor(nome, posicao) {
        this.nome = nome;
        this.posicao = posicao;
        this.selecionado = false;
        this.arestas = [];
        this.grau;
        this.ePar;
        this.eIsolado;
        this.temLoop;
        this.temArestasAdjacentesParalelas;
        this.vizinhanca;

        this.atualizarArestas();
    }

    // Adiciona Uma Aresta
    adicionarAresta(aresta) {
        this.arestas.push(aresta);
        this.atualizarArestas();
    }

    // Remover Uma Aresta
    removerAresta(aresta) {
        let posicaoArestaParaRetirar = this.arestas.indexOf(aresta);
        if (posicaoArestaParaRetirar > -1) {
            this.arestas.splice(posicaoArestaParaRetirar, 1);
        }
        this.atualizarArestas();
    }

    // Atualiza As Informações Sobre As Arestas
    atualizarArestas() {
        this.grau = this.arestas.length;
        this.ePar = this.grau % 2 == 0;
        this.eIsolado = this.grau == 0;

        this.vizinhanca = new Set();

        this.temLoop = false;

        this.temArestasAdjacentesParalelas = false;
        this.arestas.forEach(aresta => {
            if (aresta.eLoop) {
                this.temLoop = true;
            }

            aresta.extremidades.forEach(extremidade => {
                if (extremidade != this) {
                    if (this.vizinhanca.has(extremidade)) {
                        this.temArestasAdjacentesParalelas = true;
                    }

                    this.vizinhanca.add(extremidade);
                }
            });
        });
    }

    // Atualiza As Informações Do Grafo No Menu Lateral De Informações
    atualizarMenuDeInformacoes() {
        document.getElementById("Vertice-Informacao-Posicao-X").innerHTML = parseInt(this.posicao.x);
        document.getElementById("Vertice-Informacao-Posicao-Y").innerHTML = parseInt(this.posicao.y);

        document.getElementById("Vertice-Informacao-Arestas").innerHTML = this.arestas.length;

        document.getElementById("Vertice-Informacao-Grau").innerHTML = this.grau;

        if (this.ePar) {
            document.getElementById("Vertice-Informacao-Par").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Vertice-Informacao-Par").classList.add("Esconder-CheckMark");
        }

        if (this.eIsolado) {
            document.getElementById("Vertice-Informacao-Isolado").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Vertice-Informacao-Isolado").classList.add("Esconder-CheckMark");
        }

        if (this.temLoop) {
            document.getElementById("Vertice-Informacao-Loop").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Vertice-Informacao-Loop").classList.add("Esconder-CheckMark");
        }

        if (this.temArestasAdjacentesParalelas) {
            document.getElementById("Vertice-Informacao-Arestas-Paralelas").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Vertice-Informacao-Arestas-Paralelas").classList.add("Esconder-CheckMark");
        }

        document.getElementById("ListaDaVizinhanca").innerHTML = "";
        this.vizinhanca.forEach(vizinho => {
            let elementoParaAdicionar = document.createElement("li");

            elementoParaAdicionar.onclick = () => {encaminharParaInformacaoDoVertice(grafo.vertices.indexOf(vizinho))}

            let pTag = document.createElement("p");
            pTag.classList.add("Vertice-Para-Pegar-Informacao");
            pTag.innerHTML = vizinho.nome;

            elementoParaAdicionar.appendChild(pTag);

            document.getElementById("ListaDaVizinhanca").appendChild(elementoParaAdicionar);
        });
    }

    // Checa Se O Mouse Está Em Cima Do Vertice
    mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculo=25) {
        return Math.abs(mouseX - this.posicao.x) < tamanhoDoCirculo/2 && Math.abs(mouseY - this.posicao.y) < tamanhoDoCirculo/2;
    }

    // Desenhar O Vertice
    desenhar(corDoCirculo=color(255),tamanhoDoCirculo=25,corDoTexto=color(0),tamanhoDoTexto=15) {
        // Volta A Grossura Das Linhas Para O Padrão
        strokeWeight();

        let corDoCirculoASerUsado;

        // Desenha O Circulo Do Vertice
        if (this.selecionado) {
            corDoCirculoASerUsado = color(0,0,250);
        } else {
            corDoCirculoASerUsado = corDoCirculo;
        }
        stroke(corDoCirculoASerUsado);
        fill(corDoCirculoASerUsado);
        circle(
            this.posicao.x,
            this.posicao.y,
            tamanhoDoCirculo
        );

        stroke(corDoTexto);
        fill(corDoTexto);
        textSize(tamanhoDoTexto);
        // Checar Se Deve Desenhar Texto
        if (textWidth(this.nome) < tamanhoDoCirculo - 1) {
            // Desenha O Texto Do Vertice
            text(
                this.nome,
                this.posicao.x-tamanhoDoTexto*this.nome.length/3,
                this.posicao.y+tamanhoDoTexto/3
            );
        } else {
            // Desenha O Texto Do Vertice
            text(
                "...",
                this.posicao.x-tamanhoDoTexto/3,
                this.posicao.y+tamanhoDoTexto/3
            );
        }
    }
}