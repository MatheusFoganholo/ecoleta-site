const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})

alert("A hospedagem que utilizo para manter este site no ar não suporta a tecnologia NODE.js, portanto, essa página está online somente para demonstração do projeto. A versão completa (com back-end) você pode encontrar em: https://github.com/MatheusFoganholo/")