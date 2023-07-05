let board = document.querySelector('.board')
const cardsArray = ["/images/opp1.png","/images/opp1.png","/images/opp2.png","/images/opp2.png","/images/opp3.png","/images/opp3.png","/images/opp4.png","/images/opp4.png","/images/opp5.png","/images/opp5.png","/images/opp6.png","/images/opp6.png","/images/opp7.png","/images/opp7.png","/images/opp8.png","/images/opp8.png","/images/opp9.png","/images/opp9.png","/images/opp10.png","/images/opp10.png"]
board.setAttribute("data-free", "facebook")
let attemptsDiv = document.querySelector('.attempts')
let attempts = 0
let activeCards = []
let clickDisabled = false

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledCards = shuffleCards(cardsArray)
shuffledCards.forEach((card, i) => {
    board.innerHTML += `
    <div class="card" data-id=${i+1} data-img=${card.slice(8, card.indexOf("."))} data-isFlipped=${false} data-isSolved="false" data-isActive="false">
    <div class="regular">
            <div class="front"><h2>${card.slice(8, card.indexOf("."))}</h2></div>
            <div class="back"><img src=".${card}" alt=""/></div>
        </div>
    </div>
    `
})

Array.from(board.children).forEach(card => {
    card.addEventListener("click", e => {
        console.log("tedsxdfv")
        e.stopPropagation()
        console.log(`can i click? ${clickDisabled ? "NO" : "YES"}`)
        if(clickDisabled) {
            return
        }

        if(JSON.parse(card.getAttribute("data-isSolved"))) {
            return
        }

        if(JSON.parse(card.getAttribute("data-isActive"))) {
            return
        }

        if(activeCards.length < 1) {
            card.setAttribute("data-isFlipped", !JSON.parse(card.getAttribute("data-isFlipped")))
            card.setAttribute("data-isActive", !JSON.parse(card.getAttribute("data-isActive")))
            card.children[0].className = JSON.parse(card.getAttribute("data-isFlipped")) ? "content" : "regular"

            activeCards.push({
                id: card.getAttribute("data-id"),
                img: card.getAttribute("data-img")
            })
        } else if(activeCards.length > 0 && activeCards.length < 2) {
            card.setAttribute("data-isFlipped", !JSON.parse(card.getAttribute("data-isFlipped")))
            card.setAttribute("data-isActive", !JSON.parse(card.getAttribute("data-isActive")))
            card.children[0].className = JSON.parse(card.getAttribute("data-isFlipped")) ? "content" : "regular"

            clickDisabled = true
            setTimeout(() => {
                if(card.getAttribute("data-img") === activeCards[0].img) {
                    console.log("The two cards are correct")
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).setAttribute("data-isFlipped", true)
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).setAttribute("data-isSolved", true)
                    // Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).children[0].className = "content"
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).setAttribute("data-isActive", false)
                    // Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).addEventListener("click", () => {})
                   
                    // card.children[0].className = "content"
                    card.setAttribute("data-isFlipped", true)
                    card.setAttribute("data-isSolved", true)
                    card.setAttribute("data-isActive", false)
                    // card.addEventListener("click", () => {})
                    clickDisabled = false
                } else {
                    attempts += 1
                    attemptsDiv.textContent = `Attempts: ${attempts}`
                    console.log("The two cards are incorrect")
                    console.log("Click has been enabled")
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).setAttribute("data-isFlipped", false)
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).setAttribute("data-isActive", false)
                    card.setAttribute("data-isFlipped", false)
                    card.setAttribute("data-isActive", false)
                    Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id).children[0].className = "regular"
                    card.children[0].className = "regular"
                    console.log(Array.from(board.children).find(card => card.getAttribute("data-id") === activeCards[0].id))
                    console.log(card)
                    clickDisabled = false
                    console.log("Click has been disabled")
                }
                activeCards = []
            }, 700);
        }
        console.log(activeCards)
    })

})
