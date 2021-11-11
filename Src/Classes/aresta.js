class Aresta {
    constructor(primeiroVertice,segundoVertice,eDirecional) {
        this.extremidades = [primeiroVertice,segundoVertice];
        this.eDirecional = eDirecional;
        this.eLoop = primeiroVertice == segundoVertice;

        console.log(this.extremidades);

        this.extremidades.forEach(extremidade => {
            extremidade.adicionarAresta(this);
        });
    }

    eVizinho(primeiroVertice,segundoVertice) {
        return this.extremidades.includes(primeiroVertice) && this.extremidades.includes(segundoVertice);
    }

    // Desenhar A Aresta
    desenhar(tamanhoDoCirculo=25,corDaLinha=0,grossuraDaLinha=1) {

        let vetorEntreOsPontos = createVector(
            this.extremidades[1].posicao.x-this.extremidades[0].posicao.x,
            this.extremidades[1].posicao.y-this.extremidades[0].posicao.y
        );

        let tamanhoVetor = Math.sqrt(vetorEntreOsPontos.x**2 + vetorEntreOsPontos.y**2);

        let anguloVetor = Math.asin(vetorEntreOsPontos.x/tamanhoVetor);

        let pontoInicialDaAresta = createVector(
            this.extremidades[0].posicao.x + Math.sin(anguloVetor)*tamanhoDoCirculo/2,
            this.extremidades[0].posicao.y + Math.cos(anguloVetor)*tamanhoDoCirculo/2
        );

        let pontoFinalDaAresta = createVector(
            this.extremidades[1].posicao.x - Math.sin(anguloVetor)*tamanhoDoCirculo/2,
            this.extremidades[1].posicao.y - Math.cos(anguloVetor)*tamanhoDoCirculo/2
        );

        stroke(corDaLinha);
        strokeWeight(grossuraDaLinha);

        line(
            pontoInicialDaAresta.x,
            pontoInicialDaAresta.y,
            pontoFinalDaAresta.x,
            pontoFinalDaAresta.y
        );

        if (this.eDirecional) {
            let anguloPerpendicularAoVetor = anguloVetor + Math.PI/2;

            let pontoUmDeBaseDoTriangulo = createVector(
                pontoFinalDaAresta.x - Math.sin(anguloVetor) * (0.03 * tamanhoVetor) + Math.sin(anguloPerpendicularAoVetor) * 9,
                pontoFinalDaAresta.y - Math.cos(anguloVetor) * (0.03 * tamanhoVetor) + Math.cos(anguloPerpendicularAoVetor) * 9
            );
            
            let pontoDoisDeBaseDoTriangulo = createVector(
                pontoFinalDaAresta.x - Math.sin(anguloVetor) * (0.03 * tamanhoVetor) - Math.sin(anguloPerpendicularAoVetor) * 9,
                pontoFinalDaAresta.y - Math.cos(anguloVetor) * (0.03 * tamanhoVetor) - Math.cos(anguloPerpendicularAoVetor) * 9
                );

            triangle(
                pontoFinalDaAresta.x,
                pontoFinalDaAresta.y,
                pontoDoisDeBaseDoTriangulo.x,
                pontoDoisDeBaseDoTriangulo.y,
                pontoUmDeBaseDoTriangulo.x,
                pontoUmDeBaseDoTriangulo.y
            );
        }
    }
}