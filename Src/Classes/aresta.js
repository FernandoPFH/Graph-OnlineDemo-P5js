class Aresta {
    constructor(primeiroVertice,segundoVertice,eDirecional) {
        this.extremidades = [primeiroVertice,segundoVertice];
        this.eDirecional = eDirecional;
        this.eLoop = primeiroVertice == segundoVertice;

        if (primeiroVertice != segundoVertice) {
            this.extremidades.forEach(extremidade => {
                extremidade.adicionarAresta(this);
            });
        } else {
            primeiroVertice.adicionarAresta(this);
        }
    }

    eVizinho(primeiroVertice,segundoVertice) {
        return this.extremidades.includes(primeiroVertice) && this.extremidades.includes(segundoVertice);
    }

    // Calcula A Área De Um Triangulo Usando Os Seus 3 Pontos
    areaDoTriangulo(A,B,C) {
        return Math.abs((A.x*B.y + A.y*C.x + B.x*C.y - (A.y*B.x + A.x*C.y + B.y*C.x))) / 2;
    }

    // Calcula A Área De Um Retangulo Usando Os 3 Dos Seus 4 Pontos
    areaDoRetangulo(A,B,C) {
        return Math.sqrt((A.x - B.x)**2 + (A.y - B.y)**2) * Math.sqrt((B.x - C.x)**2 + (B.y - C.y)**2);
    }

    // Gera Um Retangulo Para Interação
    retanguloDeInteracao(tamanhoDoCirculo=25) {
        let verticesDoRetangulo = [];

        let vetorEntreOsPontos = createVector(
            this.extremidades[1].posicao.x-this.extremidades[0].posicao.x,
            this.extremidades[1].posicao.y-this.extremidades[0].posicao.y
        );

        let tamanhoVetor = Math.sqrt(vetorEntreOsPontos.x**2 + vetorEntreOsPontos.y**2);

        let anguloVetor = Math.asin(vetorEntreOsPontos.x/tamanhoVetor);

        let pontoInicialDaAresta;
        let pontoFinalDaAresta;

        if (this.extremidades[0].posicao.y <= this.extremidades[1].posicao.y) {
            pontoInicialDaAresta = createVector(
                this.extremidades[0].posicao.x + Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                this.extremidades[0].posicao.y + Math.cos(anguloVetor)*tamanhoDoCirculo/2
            );
    
            pontoFinalDaAresta = createVector(
                this.extremidades[1].posicao.x - Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                this.extremidades[1].posicao.y - Math.cos(anguloVetor)*tamanhoDoCirculo/2
            );
        } else {
            pontoInicialDaAresta = createVector(
                this.extremidades[0].posicao.x + Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                this.extremidades[0].posicao.y - Math.cos(anguloVetor)*tamanhoDoCirculo/2
            );
    
            pontoFinalDaAresta = createVector(
                this.extremidades[1].posicao.x - Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                this.extremidades[1].posicao.y + Math.cos(anguloVetor)*tamanhoDoCirculo/2
            );
        }

        let anguloPerpendicularAoVetor = anguloVetor + Math.PI/2;

        for (let indice = 1; indice >= -1; indice-=2) {
            verticesDoRetangulo.push(
                createVector(
                    pontoInicialDaAresta.x + Math.sin(anguloPerpendicularAoVetor) * 9 * indice, 
                    pontoInicialDaAresta.y + Math.cos(anguloPerpendicularAoVetor) * 9 * indice
                )
            );
        }

        for (let indice = -1; indice <= 1; indice+=2) {
            verticesDoRetangulo.push(
                createVector(
                    pontoFinalDaAresta.x + Math.sin(anguloPerpendicularAoVetor) * 9 * indice, 
                    pontoFinalDaAresta.y + Math.cos(anguloPerpendicularAoVetor) * 9 * indice
                )
            );
        }

        return verticesDoRetangulo;
    }

    // Checa Se O Mouse Está Em Cima Do Vertice
    mouseEstaEmCima(mouseX,mouseY,tamanhoDoCirculo=25) {
        let verticesDoRetanguloDeInteracao = this.retanguloDeInteracao(tamanhoDoCirculo);
        let pontoDoMouse = createVector(mouseX,mouseY);

        let areasEmRelacaoAoPontoDoMouse = [];

        for (let indice = 0; indice < verticesDoRetanguloDeInteracao.length; indice++) {
            if (indice != verticesDoRetanguloDeInteracao.length - 1) {
                areasEmRelacaoAoPontoDoMouse.push(this.areaDoTriangulo(verticesDoRetanguloDeInteracao[indice],verticesDoRetanguloDeInteracao[indice+1],pontoDoMouse));
            } else {
                areasEmRelacaoAoPontoDoMouse.push(this.areaDoTriangulo(verticesDoRetanguloDeInteracao[indice],verticesDoRetanguloDeInteracao[0],pontoDoMouse));
            }
        }

        let areaDoRetanguloDeInteracao = this.areaDoRetangulo(verticesDoRetanguloDeInteracao[0],verticesDoRetanguloDeInteracao[1],verticesDoRetanguloDeInteracao[2]);

        return areasEmRelacaoAoPontoDoMouse.reduce((a, b) => a + b, 0).toFixed(2) == areaDoRetanguloDeInteracao.toFixed(2);
    }

    // Desenhar A Aresta
    desenhar(tamanhoDoCirculo=25,corDaLinha=color(0),grossuraDaLinha=1) {
        if (!this.eLoop) {
            let vetorEntreOsPontos = createVector(
                this.extremidades[1].posicao.x-this.extremidades[0].posicao.x,
                this.extremidades[1].posicao.y-this.extremidades[0].posicao.y
            );
    
            let tamanhoVetor = Math.sqrt(vetorEntreOsPontos.x**2 + vetorEntreOsPontos.y**2);
    
            let anguloVetor = Math.asin(vetorEntreOsPontos.x/tamanhoVetor);
    
            let pontoInicialDaAresta;
            let pontoFinalDaAresta;
    
            if (this.extremidades[0].posicao.y <= this.extremidades[1].posicao.y) {
                pontoInicialDaAresta = createVector(
                    this.extremidades[0].posicao.x + Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                    this.extremidades[0].posicao.y + Math.cos(anguloVetor)*tamanhoDoCirculo/2
                );
        
                pontoFinalDaAresta = createVector(
                    this.extremidades[1].posicao.x - Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                    this.extremidades[1].posicao.y - Math.cos(anguloVetor)*tamanhoDoCirculo/2
                );
            } else {
                pontoInicialDaAresta = createVector(
                    this.extremidades[0].posicao.x + Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                    this.extremidades[0].posicao.y - Math.cos(anguloVetor)*tamanhoDoCirculo/2
                );
        
                pontoFinalDaAresta = createVector(
                    this.extremidades[1].posicao.x - Math.sin(anguloVetor)*tamanhoDoCirculo/2,
                    this.extremidades[1].posicao.y + Math.cos(anguloVetor)*tamanhoDoCirculo/2
                );
            }
    
            stroke(corDaLinha);
            fill(corDaLinha);
            strokeWeight(grossuraDaLinha);
    
            line(
                pontoInicialDaAresta.x,
                pontoInicialDaAresta.y,
                pontoFinalDaAresta.x,
                pontoFinalDaAresta.y
            );
    
            if (this.eDirecional) {
                let anguloPerpendicularAoVetor = anguloVetor + Math.PI/2;
                
                let pontoUmDeBaseDoTriangulo;
                let pontoDoisDeBaseDoTriangulo;
    
                if (this.extremidades[0].posicao.y <= this.extremidades[1].posicao.y) {
                    pontoUmDeBaseDoTriangulo = createVector(
                        pontoFinalDaAresta.x - Math.sin(anguloVetor) * 9 + Math.sin(anguloPerpendicularAoVetor) * 9,
                        pontoFinalDaAresta.y - Math.cos(anguloVetor) * 9 + Math.cos(anguloPerpendicularAoVetor) * 9
                    );
                    
                    pontoDoisDeBaseDoTriangulo = createVector(
                        pontoFinalDaAresta.x - Math.sin(anguloVetor) * 9 - Math.sin(anguloPerpendicularAoVetor) * 9,
                        pontoFinalDaAresta.y - Math.cos(anguloVetor) * 9 - Math.cos(anguloPerpendicularAoVetor) * 9
                    );
                } else {
                    pontoUmDeBaseDoTriangulo = createVector(
                        pontoFinalDaAresta.x + Math.sin(-anguloVetor) * 9 + Math.sin(anguloPerpendicularAoVetor) * 9,
                        pontoFinalDaAresta.y + Math.cos(-anguloVetor) * 9 - Math.cos(anguloPerpendicularAoVetor) * 9
                    );
                    
                    pontoDoisDeBaseDoTriangulo = createVector(
                        pontoFinalDaAresta.x + Math.sin(-anguloVetor) * 9 - Math.sin(anguloPerpendicularAoVetor) * 9,
                        pontoFinalDaAresta.y + Math.cos(-anguloVetor) * 9 + Math.cos(anguloPerpendicularAoVetor) * 9
                    );
                }
    
                triangle(
                    pontoFinalDaAresta.x,
                    pontoFinalDaAresta.y,
                    pontoDoisDeBaseDoTriangulo.x,
                    pontoDoisDeBaseDoTriangulo.y,
                    pontoUmDeBaseDoTriangulo.x,
                    pontoUmDeBaseDoTriangulo.y
                );
            }
        } else {
            noFill();
            strokeWeight(1);
            bezier(
                this.extremidades[0].posicao.x,
                this.extremidades[0].posicao.y,
                this.extremidades[0].posicao.x + 40,
                this.extremidades[0].posicao.y - 80,
                this.extremidades[0].posicao.x - 40,
                this.extremidades[0].posicao.y - 80,
                this.extremidades[0].posicao.x,
                this.extremidades[0].posicao.y,
            );
        }
    }
}