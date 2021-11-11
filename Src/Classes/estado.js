class Estado {
    constructor(escolha) {
        this.possibilidades = {
            "AdicionarVertice" : 0,
            "AdicionarAresta" : 1,
            "MoverVertice" : 2,
            "ExcluirObjetos" : 3,
            "NoMenu": 4
        }

        this.escolhas = [
            "AdicionarVertice",
            "AdicionarAresta",
            "MoverVertice",
            "ExcluirObjetos",
            "NoMenu"
        ]

        this.escolhaAtual = this.possibilidades[escolha];
    }

    trocaEscolha(escolha) {
        setTimeout(
            () => {this.escolhaAtual = this.possibilidades[escolha];},
            100
        );
    }

    compararEscolha(escolha) {
        return this.escolhaAtual == this.possibilidades[escolha];
    }

    pegarEscolha() {
        return this.escolhas[this.escolhaAtual];
    }
}