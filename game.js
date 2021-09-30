let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
    cards: null,
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]
        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            card.flipped = true
            return true
        } else {
            this.secondCard = card
            this.lockMode = true
            card.flipped = true
            return true
        }
    },

    check: function () {
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function () {
        if (!this.check()) {
            this.firstCard.flipped = false
            this.secondCard.flipped = false
        }
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    createCards: function () {
        this.cards = []
        for (let tech of this.techs) {
            this.cards.push(this.createPairCard(tech))
        }

        // Utilize arrayPrincipal.flatMap(função onde vai passar cada elemento do array) para usar uma função para todos os arrays de dentro de um array principal
        this.cards = this.cards.flatMap(card => card)
        this.embaralharCartas()
    },

    createPairCard: function (tech) {
        return [
            {
                id: this.createIdCard(tech),
                icon: tech,
                flipped: false
            },
            {
                id: this.createIdCard(tech),
                icon: tech,
                flipped: false
            }]
    },

    createIdCard: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    embaralharCartas: function () {
        let indexAtual = this.cards.length

        while (indexAtual !== 0) {
            //recebe um index aleatorio entre 0 e 19
            let randomIndex = Math.floor(Math.random() * 20)
            //subtrai 1 do length para usar como o index
            indexAtual--

            //muda de lugar a carta do index atual pela carta do index aleatorio
            [this.cards[randomIndex], this.cards[indexAtual]] = [this.cards[indexAtual], this.cards[randomIndex]]
        }
    },
    // utilizando .forEach()

    /*
    checkGameOver: function(){
        let flippeds = 0
        this.cards.forEach(card => {
            card.flipped ? flippeds++ : flippeds
        });
        if(flippeds == 20){
            return true
        }
    }
    */

    //ou utilizando .filter()

    checkGameOver: function () {
        //retorna um array com todas as cartas não flipadas
        //se não existir nenhuma ele retorna false
       return this.cards.filter(card => !card.flipped).length == 0      
    }
}