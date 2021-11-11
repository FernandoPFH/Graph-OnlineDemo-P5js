class Grafo {
    constructor(nome,vertices,arestas) {
        this.nome = nome;
        this.vertices = vertices;
        this.arestas = arestas;

        this.atualizarOsAtributos();
    }

    // Adiciona Um Vértice
    adicionarVertice(vertice) {
        this.vertices.push(vertice);
        this.atualizarOsAtributos();
    }

    // Adiciona Uma Aresta
    adicionarAresta(aresta) {
        this.arestas.push(aresta);
        this.atualizarOsAtributos();
    }

    // Pode Ser Usado Para Os Tributos Dessa Classe
    atualizarOsAtributos() {
        this.nulo = this.arestas.length == 0;

        if (!this.nulo) {
            this.simples = true;
            this.regular = true;
            this.completo = true;
            this.euleriano = true;
    
            let grauParaChecarSeERegular = 0;
    
            this.vertices.forEach(vertice => {
                if (vertice.temLoop || vertice.temArestasAdjacentesParalelas) {
                    this.simples = false;
                }
    
                if (this.vertices.indexOf(vertice) == 0) {
                    grauParaChecarSeERegular = vertice.grau;
                } else if (grauParaChecarSeERegular != vertice.grau) {
                    this.regular = false;
                }
    
                if (vertice.vizinhanca.length != this.vertices.length - 1) {
                    this.completo = false;
                }
    
                if (vertice.ePar) {
                    this.euleriano = false;
                }
            });
        } else {
            this.simples = false;
            this.regular = false;
            this.completo = false;
            this.euleriano = false;
        }
    }

    // Desenhar O Grafo
    desenhar() {
        this.arestas.forEach(aresta => {
            aresta.desenhar();
        });

        this.vertices.forEach(vertice => {
            vertice.desenhar();
        });
    }
}