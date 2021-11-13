let elemento = function(query){
    return document.querySelector(query);
};

let elementos = function(query){
    return document.querySelectorAll(query);
};

let ETAPA_ATUAL = 0;


document.body.addEventListener("click", () => {
    let msg = elemento(".display .msg");
    let dispLeft = elemento(".display .display--main_left");
    let dispRight = elemento(".display .display--main_right");
    let voteNumberDiv = dispLeft.querySelector(".vote-numbers");
    let voteNumberSpaces = dispLeft.querySelector(".vote-numbers--spaces").cloneNode(true);


    msg.style.display = "none";

    dispRight.querySelector(".img1").style.display = "none";
    dispRight.querySelector(".img2").style.display = "none";


    for(let i = 0; i < sequenciaVotos[0].qtdeNumeros; i++) {
        voteNumberDiv.appendChild(voteNumberSpaces.cloneNode(true));
    };

    dispLeft.querySelector("h2").innerHTML = sequenciaVotos[0].cargo;
    dispLeft.querySelectorAll("h3 span").forEach((elemento) => {
        elemento.innerHTML = "";
    });
})
