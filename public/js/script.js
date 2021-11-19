let elemento = function(query){
    return document.querySelector(query);
};

let elementos = function(query){
    return document.querySelectorAll(query);
};

let ETAPA_ATUAL = 0;
let NUM_ETAPAS = sequenciaVotos.length - 1;
let choiceNumbers = [];

let whiteVoteFunction = function() {
    let displayFooter = elemento(".display--footer");
    let confirmVote = elemento(".keyboard--actions_confirm");

    resetVoteFunction();

    confirmVote.addEventListener("click", confirmVoteFunction);

    displayFooter.style.fontSize = "3.5rem";
    displayFooter.innerHTML = "VOTO EM BRANCO <br> PRESSIONE <span>CONFIRMA</span> PARA PROSSEGUIR";
    displayFooter.style.display = "block";
};

let resetVoteFunction = function() {
    let dispLeft = elemento(".display .display--main_left");
    let dispRight = elemento(".display .display--main_right");
    let voteNumberDiv = dispLeft.querySelector(".vote-numbers");
    let numberSpaces = voteNumberDiv.querySelectorAll(".vote-numbers--spaces");
    let displayFooter = elemento(".display--footer");

    // Some com as imagens dos candidatos
    dispRight.querySelector(".img1").style.display = "none";
    dispRight.querySelector(".img2").style.display = "none";

    displayFooter.style.display = "none";

    // Apaga os dados do candidato
    dispLeft.querySelectorAll("h3 span").forEach((elemento) => {
        elemento.innerHTML = "";
    });

    numberSpaces.forEach((numberSpace) => {
        numberSpace.innerHTML = "";
        choiceNumbers = [];
    });
};

let confirmVoteFunction = function(){
    let displayFooter = elemento(".display--footer");
    let msg = elemento(".display .msg");
    let confirmVote = elemento(".keyboard--actions_confirm");
    let keyboardNumbers = elementos(".keyboard .keyboard--numbers .keyboard--numbers_btn");

    displayFooter.innerHTML = `
        Aperte a tecla: <br>
        <span>CONFIRMA</span> para <span>CONFIRMAR</span> o voto <br>
        <span>CORRIGE</span> para <span>CORRIGIR</span> o voto
    `;

    // KEYBOARD NUMBERS REMOVING EVENT LISTENER
    keyboardNumbers.forEach((elemento) => {
        elemento.removeEventListener("click", getKeyboardNumbers);
    });

    ETAPA_ATUAL += 1;
    choiceNumbers = [];

    if(ETAPA_ATUAL > NUM_ETAPAS) {
        // Fim
        msg.innerHTML = "<p>Fim</p>";
        msg.style.display = "block";
        displayFooter.style.display = "none";
        confirmVote.removeEventListener("click", confirmVoteFunction);
    } else {
        // Próximo voto SE E SOMENTE SE ALGO FOI DIGITADO NA TELA OU BRANCO FOI PRESSIONADO
        confirmVote.removeEventListener("click", confirmVoteFunction);
        updateVoteScreen();
    };

};

let getKeyboardNumbers = function(keyboardNumberSelected) {
    let dispLeft = elemento(".display .display--main_left");
    let dispRight = elemento(".display .display--main_right");
    let voteNumberDiv = dispLeft.querySelector(".vote-numbers");
    let numberSpaces = voteNumberDiv.querySelectorAll(".vote-numbers--spaces");
    let numberPressed = keyboardNumberSelected.currentTarget.number; // Peguei o argumento passado pelo EventListener (number)
    let confirmVote = elemento(".keyboard--actions_confirm");

    console.log(numberPressed);

    if(choiceNumbers.length < sequenciaVotos[ETAPA_ATUAL].qtdeNumeros) {
        choiceNumbers.push(numberPressed);
        numberSpaces[choiceNumbers.length - 1].innerHTML = choiceNumbers[choiceNumbers.length - 1]  
    }; 
    
    if(choiceNumbers.length >= sequenciaVotos[ETAPA_ATUAL].qtdeNumeros) {
        let aux = choiceNumbers.toString();
        let candidate = "";
        let displayFooter = document.querySelector(".display--footer");
        let selection = "";

        candidate = Number(aux.split(",").join(""));

        switch(ETAPA_ATUAL) {
            case 0:
                //PROCURA CANDIDATO PELA VARIÁVEL candidate E MOSTRAR NA TELA
                selection = vereadores.find((vereador) => {
                    return vereador.numero === candidate;
                });

                if(selection != undefined) {
                    dispRight.querySelector(".img1").style.display = "block";
                    dispRight.querySelector(".img1 img").src = selection.dados.foto;
                    dispRight.querySelector(".img1 p").innerHTML = `${selection.dados.nome} <br> Vereador(a)`; 
                    dispLeft.querySelectorAll("h3 span")[0].innerHTML = selection.dados.nome;
                    dispLeft.querySelectorAll("h3 span")[1].innerHTML = selection.dados.partido;

                   // CONFIRM VOTE
                    confirmVote.addEventListener("click", confirmVoteFunction);

                } else {
                    console.log("ola")
                    displayFooter.style.fontSize = "3.5rem";
                    displayFooter.innerHTML = "CANDIDATO NÃO ENCONTRADO PRESSIONE <span>CORRIGE</span> PARA REPETIR";
                    displayFooter.style.display = "block";
                };          
                break;

            case 1:
                //PROCURA CANDIDATO PELA VARIÁVEL candidate E MOSTRAR NA TELA
                selection = prefeitos.find((prefeito) => {
                    return prefeito.numero === candidate;
                });

                if(selection != undefined) {
                    dispRight.querySelector(".img1").style.display = "block";
                    dispRight.querySelector(".img1 img").src = selection.dados.foto;
                    dispRight.querySelector(".img1 p").innerHTML = `${selection.dados.nome} <br> Prefeito(a)`; 
                    dispRight.querySelector(".img2").style.display = "block";
                    dispRight.querySelector(".img2 img").src = selection.dados.fotoVice;
                    dispRight.querySelector(".img2 p").innerHTML = `${selection.dados.vice} <br> Vice Prefeito(a)`; 
                    dispLeft.querySelectorAll("h3 span")[0].innerHTML = `${selection.dados.nome} e ${selection.dados.vice}`;
                    dispLeft.querySelectorAll("h3 span")[1].innerHTML = selection.dados.partido;

                    // CONFIRM VOTE
                    confirmVote.addEventListener("click", confirmVoteFunction);
                } else {
                    displayFooter = document.querySelector(".display--footer");
                    console.log("ola")
                    displayFooter.style.fontSize = "3.5rem";
                    displayFooter.innerHTML = "CANDIDATO NÃO ENCONTRADO PRESSIONE <span>CORRIGE</span> PARA REPETIR";
                    displayFooter.style.display = "block";
                };
                break;
        };
    };
};

const updateVoteScreen = function(){
    let msg = elemento(".display .msg");
    let displayFooter = elemento(".display--footer");
    let dispLeft = elemento(".display .display--main_left");
    let dispRight = elemento(".display .display--main_right");
    let voteNumberDiv = dispLeft.querySelector(".vote-numbers");
    let voteNumberSpaces = elemento(".models").querySelector(".vote-numbers--spaces");
    let keyboardNumbers = elementos(".keyboard .keyboard--numbers .keyboard--numbers_btn");
    let whiteVote = elemento(".keyboard--actions_white-vote");
    let resetVote = elemento(".keyboard--actions_reset");

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
        elemento.addEventListener("click", getKeyboardNumbers);
        elemento.number = elemento.innerHTML; // Cria um novo parâmetro (number) no prototype da minha função getKeyboardNumbers
    });

    // KEYBOARD ACTIONS

        // WHITE VOTE

    whiteVote.addEventListener("click", whiteVoteFunction);

        // RESET VOTE

    resetVote.addEventListener("click", resetVoteFunction);

    // REMOVE O EVENTO APÓS A PRIMEIRA PASSAGEM

    document.body.removeEventListener("click", updateVoteScreen);

};

// PREENCHE A ÁREA LEGENDA COM OS CANDIDATOS DISPONÍVEIS

window.addEventListener("load", () => {
    let areaLegenda = elemento(".candidatos");
    let candidatoVereadorLegenda = elemento(".models").querySelector(".candidato--vereador");
    let candidatoPrefeitoLegenda = elemento(".models").querySelector(".candidato--prefeito");

    vereadores.map((candidato) => {
        candidatoVereadorLegenda.querySelector(".candidato--vereador p span").innerHTML = candidato.dados.nome;
        candidatoVereadorLegenda.querySelector(".candidato--vereador p:last-child span").innerHTML = candidato.numero;

        areaLegenda.appendChild(candidatoVereadorLegenda.cloneNode(true));
    });

    prefeitos.map((candidato) => {
        candidatoPrefeitoLegenda.querySelector(".candidato--prefeito p span").innerHTML = candidato.dados.nome;
        candidatoPrefeitoLegenda.querySelector(".candidato--prefeito p:last-child span").innerHTML = candidato.numero;

        areaLegenda.appendChild(candidatoPrefeitoLegenda.cloneNode(true));
    });
});

// INICIA A URNA

document.body.addEventListener("click", updateVoteScreen);