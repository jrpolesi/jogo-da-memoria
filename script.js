const cardFront = "cardFront"
const cardBack = "cardBack"



startGame()

function startGame() {
    //cria o array de cartas
    game.createCards()
    //embaralha o array de cartas
    distribuirCartas(game.cards)
}


function distribuirCartas(cards) {
    let gameBoard = document.getElementById('gameBoard')

    gameBoard.innerHTML = ''

    cards.forEach((card) => {
        let cardDiv = document.createElement('div')

        cardDiv.id = card.id
        cardDiv.className = 'card'
        // cardDiv.setAttribute('data-img', cards.icon)
        //ou
        cardDiv.dataset.img = card.icon
        cardDiv.addEventListener('click', flipcard)
        gameBoard.appendChild(cardDiv)

        createCardContent('front', card, cardDiv)
        createCardContent('back', card, cardDiv)
    })
}

function createCardContent(face, card, cardDiv) {
    let cardFaceElement = document.createElement('div')

    if (face === 'front') {
        cardFaceElement.className = 'cardFront'
        let imgCard = document.createElement('img')
        imgCard.className = 'icon'
        imgCard.src = `./images/${card.icon}.png`
        cardFaceElement.appendChild(imgCard)
    } else {
        cardFaceElement.className = 'cardBack'
        cardFaceElement.innerText = "</>"
    }
    cardDiv.appendChild(cardFaceElement)
}

function flipcard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip')

        if (game.secondCard) {
            game.check()

            if (game.check()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        let gameOverDiv = document.getElementById('gameOver')

                        gameOverDiv.style.display = 'flex'
                    }, 600)
                }
            } else {

                setTimeout(() => {

                    let firstCardDiv = document.getElementById(game.firstCard.id)
                    let secondCardDiv = document.getElementById(game.secondCard.id)

                    firstCardDiv.classList.remove('flip')
                    secondCardDiv.classList.remove('flip')
                    game.clearCards()
                }, 1000)
            }
        }
    }
}
function restart() {
    let gameOverDiv = document.getElementById('gameOver')

    gameOverDiv.style.display = ''
    game.firstCard = null
    game.secondCard = null
    game.lockMode = false
    startGame()
}