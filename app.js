// Elements du DOM

const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];
const tricherBtn = document.getElementById('tricherBtn');
const essais = document.getElementById("essais");


// Modèle de coeurs
const coeurVide = '<ion-icon name="heart-dislike-outline"></ion-icon>';

const coeurPlein = '<ion-icon id="coeurPlein" name="heart"></ion-icon>';

// Fond brulant / froid
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)';
const bgChaud = 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)';
const bgBrulant = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';

// fond gagnant /  perdant
const bgWin = 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)';
const bgLoose = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';


// fonction play
const play = () => {

    const randomNumber = Math.floor(Math.random() * 101)
    const totalVies = 6;
    let vies = totalVies;
    tricherBtn.style.display = "none";
    essais.textContent = ` Tu as ${vies} essais !`;
    // vérification test

    // Actualisation à chaque essai
    formulaire.addEventListener('submit', (elmt) => {
        elmt.preventDefault();
        const valeurInput = parseInt(input.value);

        // possibilités : 
        if (valeurInput < 0 || valeurInput > 100) return;

        if (valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin;
            message.style.color = "#02a12e";
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
            essayerBtn.style.display = "none";
        }
        if (valeurInput !== randomNumber) {
            if (randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !!!  🔥🔥🔥 *";
            } else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud !  🥵 *";
            } else if (randomNumber < valeurInput + 10 && randomNumber > valeurInput - 10) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiède !  😐 *";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid...  🥶❄️❄️ *";
            }
            vies--;
            verifyLoose();
            tricher();
        }

        actualiserCoeur(vies);
    })
    const verifyLoose = () => {
        if (vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.style.display = "none";
            message.textContent = `Vous avez perdu 😢 ! La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
            tricherBtn.style.display = "none";
        }
    }

    const actualiserCoeur = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for (let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for (let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
            essais.textContent = ` Tu as ${vies} essais !`;
            if (vies === 0) {
                essais.textContent = "";
            }
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiserCoeur(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = "none";
        document.location.reload(true);
    })

    tricherBtn.addEventListener('click', () => {
        tricherBtn.style.display = "none";
        let maxNumber = randomNumber + 10;
        let minNumber = randomNumber - 10;
        message.textContent = `Le nombre à trouver est compris entre ${minNumber} et ${maxNumber}`;

    })

    const tricher = () => {
        if (vies === 2) {
            tricherBtn.style.display = "block";
            message.textContent = `il vous reste ${vies} vies, vous souhaitez tricher?`;
        }
    }
}

play();