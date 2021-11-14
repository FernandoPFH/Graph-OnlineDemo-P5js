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
        let arestaNaoExisteNoGrafo = true;

        this.arestas.forEach(arestaDoGrafo => {
            if (arestaDoGrafo.extremidades[0] == aresta.extremidades[0] && arestaDoGrafo.extremidades[1] == aresta.extremidades[1]) {
                arestaNaoExisteNoGrafo = false;
            }
        });

        if (arestaNaoExisteNoGrafo) {
            this.arestas.push(aresta);
            this.atualizarOsAtributos();
        }
    }

    // Remove Um Vértice
    removerVertice(vertice) {
        let posicaoVerticeParaRetirar = this.vertices.indexOf(vertice);
        if (posicaoVerticeParaRetirar > -1) {
            this.vertices.splice(posicaoVerticeParaRetirar, 1);
        }

        let arestasParaRemover = [];
        this.arestas.forEach(aresta => {
            if (aresta.extremidades.includes(vertice)) {
                arestasParaRemover.push(aresta);
            }
        });

        arestasParaRemover.forEach(arestaparaRemover => {
            let posicaoArestaParaRetirar = this.arestas.indexOf(arestaparaRemover);
            if (posicaoArestaParaRetirar > -1) {
                this.arestas.splice(posicaoArestaParaRetirar, 1);
            }
        });

        this.atualizarOsAtributos();
    }

    // Remove Uma Aresta
    removerAresta(aresta) {
        let posicaoArestaParaRetirar = this.arestas.indexOf(aresta);
        if (posicaoArestaParaRetirar > -1) {
            this.arestas.splice(posicaoArestaParaRetirar, 1);
        }

        aresta.extremidades.forEach(extremidade => {
            extremidade.removerAresta(aresta)
        });

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
    
                if (vertice.vizinhanca.size != this.vertices.length - 1) {
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

        this.atualizarMenuDeInformacoes();

        if (document.getElementById("ListaDeVerticesParaSelecionar").value != "") {
            grafo.vertices[parseInt(document.getElementById("ListaDeVerticesParaSelecionar").value)].atualizarMenuDeInformacoes();
        }
    }

    // Atualiza As Informações Do Grafo No Menu Lateral De Informações
    atualizarMenuDeInformacoes() {
        if (this.nulo) {
            document.getElementById("Grafo-Informacao-Nulo").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Grafo-Informacao-Nulo").classList.add("Esconder-CheckMark");
        }

        if (this.simples) {
            document.getElementById("Grafo-Informacao-Simples").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Grafo-Informacao-Simples").classList.add("Esconder-CheckMark");
        }

        if (this.regular) {
            document.getElementById("Grafo-Informacao-Regular").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Grafo-Informacao-Regular").classList.add("Esconder-CheckMark");
        }

        if (this.completo) {
            document.getElementById("Grafo-Informacao-Completo").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Grafo-Informacao-Completo").classList.add("Esconder-CheckMark");
        }

        if (this.euleriano) {
            document.getElementById("Grafo-Informacao-Euleriano").classList.remove("Esconder-CheckMark");
        } else {
            document.getElementById("Grafo-Informacao-Euleriano").classList.add("Esconder-CheckMark");
        }

        document.getElementById("Grafo-Informacao-Arestas").innerHTML = this.arestas.length;

        document.getElementById("ListaDeVertices").innerHTML = "";
        document.getElementById("ListaDeVerticesParaSelecionar").innerHTML = "";

        this.vertices.forEach(vertice => {
            let elementoParaAdicionar = document.createElement("li");

            elementoParaAdicionar.onclick = () => {encaminharParaInformacaoDoVertice(this.vertices.indexOf(vertice))}

            let pTag = document.createElement("p");
            pTag.classList.add("Vertice-Para-Pegar-Informacao");
            pTag.innerHTML = vertice.nome;

            elementoParaAdicionar.appendChild(pTag);

            document.getElementById("ListaDeVertices").appendChild(elementoParaAdicionar);

            let elementoParaAdicionarALista = document.createElement("option");
            elementoParaAdicionarALista.value = this.vertices.indexOf(vertice);
            elementoParaAdicionarALista.text = vertice.nome;

            document.getElementById("ListaDeVerticesParaSelecionar").appendChild(elementoParaAdicionarALista);
        });
    }

    // Desenhar O Grafo
    desenhar(tamanhoDoCirculo=25,corDoCirculo=color(255),corDoTexto=color(0),tamanhoDoTexto=15,corDaLinha=color(0),grossuraDaLinha=1) {
        this.arestas.forEach(aresta => {
            aresta.desenhar(tamanhoDoCirculo,corDaLinha,grossuraDaLinha);
        });

        this.vertices.forEach(vertice => {
            vertice.tamanhoDoTexto = tamanhoDoTexto;
            vertice.desenhar(corDoCirculo,tamanhoDoCirculo,corDoTexto,tamanhoDoTexto);
        });
    }
}

function removerItemDoArray(array, item) { 
    
    return array.filter(function(elemento){ 
        return elemento != item; 
    });
}