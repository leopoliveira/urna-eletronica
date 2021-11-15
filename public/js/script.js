let elemento = function(query){
    return document.querySelector(query);
};

let elementos = function(query){
    return document.querySelectorAll(query);
};

let ETAPA_ATUAL = 0;
const NUM_ETAPAS = sequenciaVotos.length - 1;
let choiceNumbers = [];


const confirmVoteFunction = function(){
    let displayFooter = elemento(".display--footer");
    let msg = elemento(".display .msg");
    let confirmVote = elemento(".keyboard--actions_confirm");

    displayFooter.innerHTML = `
        Aperte a tecla: <br>
        <span>CONFIRMA</span> para <span>CONFIRMAR</span> o voto <br>
        <span>CORRIGE</span> para <span>CORRIGIR</span> o voto
    `;

    ETAPA_ATUAL += 1;
    choiceNumbers = [];

    if(ETAPA_ATUAL > sequenciaVotos.length - 1) {
        // Fim
        msg.innerHTML = "<p>Fim</p>";
        msg.style.display = "block";
        displayFooter.style.display = "none";
        confirmVote.removeEventListener("click", confirmVoteFunction);
    } else {
        // Próximo voto
        confirmVote.removeEventListener("click", confirmVoteFunction);

        updateVoteScreen();
    };

};


const updateVoteScreen = function(){
    let msg = elemento(".display .msg");
    let displayFooter = elemento(".display--footer");
    let dispLeft = elemento(".display .display--main_left");
    let dispRight = elemento(".display .display--main_right");
    let voteNumberDiv = dispLeft.querySelector(".vote-numbers");
    let voteNumberSpaces = elemento(".models").querySelector(".vote-numbers--spaces").cloneNode(true);
    let keyboardNumbers = elementos(".keyboard .keyboard--numbers .keyboard--numbers_btn");
    let whiteVote = elemento(".keyboard--actions_white-vote");
    let resetVote = elemento(".keyboard--actions_reset");
    let confirmVote = elemento(".keyboard--actions_confirm");

    // DISPLAY

    msg.style.display = "none";
    displayFooter.style.display = "none";

    dispRight.querySelector(".img1").style.display = "none";
    dispRight.querySelector(".img2").style.display = "none";

    voteNumberDiv.innerHTML = "";

    for(let i = 0; i < sequenciaVotos[ETAPA_ATUAL].qtdeNumeros; i++) {
        voteNumberDiv.appendChild(voteNumberSpaces.cloneNode(true));
    };

    dispLeft.querySelector("h2").innerHTML = sequenciaVotos[ETAPA_ATUAL].cargo;
    dispLeft.querySelectorAll("h3 span").forEach((elemento) => {
        elemento.innerHTML = "";
    });

    // KEYBOARD NUMBERS

    keyboardNumbers.forEach((elemento) => {
        elemento.addEventListener("click", () => {
            let numberPressed = elemento.innerHTML;
            let numberSpaces = voteNumberDiv.querySelectorAll(".vote-numbers--spaces");

            if(choiceNumbers.length < sequenciaVotos[ETAPA_ATUAL].qtdeNumeros) {
                choiceNumbers.push(numberPressed);
                numberSpaces[choiceNumbers.length - 1].innerHTML = choiceNumbers[choiceNumbers.length - 1]  
            }; 
            
            if(choiceNumbers.length >= sequenciaVotos[ETAPA_ATUAL].qtdeNumeros) {
                let aux = choiceNumbers.toString();
                let candidate = "";

                candidate = Number(aux.split(",").join(""));

                switch(ETAPA_ATUAL) {
                    case 0:
                        //PROCURAR CANDIDATO PELA VARIÁVEL candidate E MOSTRAR NA TELA
                        console.log("VEREADOR");
                        break;
                    case 1:
                        //PROCURAR CANDIDATO PELA VARIÁVEL candidate E MOSTRAR NA TELA
                        console.log("PREFEITO");
                        break;
                };
            };
        });
    });

    // KEYBOARD ACTIONS

        // WHITE VOTE

    whiteVote.addEventListener("click", () => {
        let displayFooter = elemento(".display--footer");

        displayFooter.style.fontSize = "3.5rem";
        displayFooter.innerHTML = "VOTO EM BRANCO <br> PRESSIONE <span>CONFIRMA</span> PARA PROSSEGUIR";
        displayFooter.style.display = "block";
    });

        // RESET VOTE

    resetVote.addEventListener("click", () => {
        let numberSpaces = voteNumberDiv.querySelectorAll(".vote-numbers--spaces");
        numberSpaces.forEach((numberSpace) => {
            numberSpace.innerHTML = "";
            choiceNumbers = [];
        });
    });

        // CONFIRM VOTE

    confirmVote.addEventListener("click", confirmVoteFunction);

    // REMOVE O EVENTO APÓS A PRIMEIRA PASSAGEM

    document.body.removeEventListener("click", updateVoteScreen);
};


document.body.addEventListener("click", updateVoteScreen);

