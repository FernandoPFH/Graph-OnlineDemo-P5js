class Vertice {
    constructor(nome, posicao) {
        this.nome = nome;
        this.posicao = posicao;
        this.arestas = [];
        this.grau;
        this.ePar;
        this.eIsolado;
        this.temLoop;
        this.temArestasAdjacentesParalelas;
        this.vizinhanca;
    }

    // Adiciona Uma Aresta
    adicionarAresta(aresta) {
        this.arestas.push(aresta);
        atualizarArestas();
    }

    // Atualiza As Informações Sobre As Arestas
    atualizarArestas() {
        this.grau = this.arestas.length;
        this.ePar = this.grau % 2 == 0;
        this.eIsolado = this.grau == 0;

        this.vizinhanca = new Set();

        this.temLoop = false;
        let indiceDeLoop = 0;
        this.temArestasAdjacentesParalelas = false;
        this.arestas.forEach(aresta => {
            if (aresta.eLoop) {
                this.temLoop = true;
            }

            if (this.arestas.indexOf(aresta) != indiceDeLoop && this.arestas.indexOf(aresta) > -1) {
                this.temArestasAdjacentesParalelas = true;
            }

            aresta.extremidades.forEach(extremidade => {
                if (extremidade != self) {
                    this.vizinhanca.add(extremidade);
                }
            });
            indiceDeLoop++;
        });
    }

    // Desenhar O Vertice
    desenhar(corDoCirculo=color(255),tamanhoDoCirculo=25,corDoTexto=color(0),tamanhoDoTexto=15) {
        // Volta A Grossura Das Linhas Para O Padrão
        strokeWeight();

        // Desenha O Circulo Do Vertice
        stroke(corDoCirculo);
        fill(corDoCirculo);
        circle(
            this.posicao.x,
            this.posicao.y,
            tamanhoDoCirculo
        );

        stroke(corDoTexto);
        fill(corDoTexto);
        textSize(tamanhoDoTexto);
        // Checar Se Deve Desenhar Texto
        if (textWidth(this.nome) < tamanhoDoCirculo) {
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