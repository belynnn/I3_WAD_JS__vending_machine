// Décrémente le stock de la boisson si le stock est supérieur à 0
function stockDecrease(stockElement) {
    const stock = parseInt(stockElement.textContent); // Récupère le stock actuel en tant que nombre
    if (stock > 0) {
        stockElement.textContent = stock - 1; // Décrémente le stock de 1
    }
}

// Sélectionne tous les boutons de boisson
const LIST_BTN_DRINK = document.querySelectorAll(".btn-line-keypad>button");
// Sélectionne tous les éléments de stock des boissons
const LIST_STOCK_DRINK = Array.from(document.querySelectorAll("p.stock"));
// Liste des images de boissons avec leurs chemins src et leurs attributs alt
const LIST_IMG_DRINK = [
    { src: "./images/coca.png", alt: "Image d'une canette de Coca-Cola" },
    { src: "./images/light.png", alt: "Image d'une canette de Coca-Cola Light" },
    { src: "./images/pepsi.png", alt: "Image d'une canette de Pepsi" },
    { src: "./images/max.png", alt: "Image d'une canette de Pepsi Max" },
    { src: "./images/fanta.png", alt: "Image d'une canette de Fanta" },
    { src: "./images/sprite.png", alt: "Image d'une canette de Sprite" }
];
// Sélectionne le bouton de réinitialisation
const BTN_RESET = document.querySelector("#btn_reset");
// Sélectionne le bouton de confirmation
const BTN_CONFIRM = document.querySelector("#btn_confirm");
// Sélectionne le panier d'achat
const SHOPPING_BASKET = document.querySelector(".shopping-basket");
// Sélectionne l'image de la boisson achetée
const SECTION_IMG_CHOICE_USER = document.querySelector("#drink_shopping_basket");
// Sélectionne l'affichage de l'état des commandes
const DISPLAY_STATUS = document.querySelector(".commands-section>p:first-of-type");

// Sélectionne l'affichage du choix utilisateur
let USER_CHOICE = document.querySelector("#display_user_choice");

// Ajoute des événements de clic à chaque bouton de boisson
LIST_BTN_DRINK.forEach(btnDrink => {
    btnDrink.addEventListener("click", () => {
        USER_CHOICE.textContent = btnDrink.textContent; // Met à jour le choix utilisateur avec le texte du bouton
    });
});

// Réinitialise le choix utilisateur lorsque le bouton de réinitialisation est cliqué
BTN_RESET.addEventListener("click", () => {
    USER_CHOICE.textContent = ""; // Efface le texte du choix utilisateur
});

// Gère la confirmation de la sélection utilisateur
BTN_CONFIRM.addEventListener("click", () => {
    const DRINK = parseInt(USER_CHOICE.textContent); // Convertit le choix utilisateur en nombre

    // Vérifie si le choix utilisateur est valide
    if (DRINK >= 1 && DRINK <= LIST_STOCK_DRINK.length) {
        const stockElement = LIST_STOCK_DRINK[DRINK - 1]; // Récupère l'élément de stock correspondant
        const stock = parseInt(stockElement.textContent); // Récupère le stock en tant que nombre

        // Vérifie si le stock est disponible
        if (stock > 0) {
            stockDecrease(stockElement); // Décrémente le stock
            DISPLAY_STATUS.innerHTML = "🔄<br>En cours de traitement"; // Affiche le message de traitement

            // Attendre 3 secondes avant d'afficher la boisson sélectionnée et le message "Servez-vous"
            setTimeout(() => {
                const DRINK_DATA = LIST_IMG_DRINK[DRINK - 1]; // Récupère les données de la boisson sélectionnée
                SECTION_IMG_CHOICE_USER.src = DRINK_DATA.src; // Met à jour l'image dans le panier
                SECTION_IMG_CHOICE_USER.alt = DRINK_DATA.alt; // Met à jour l'attribut alt de l'image dans le panier
                SHOPPING_BASKET.classList.add("shade"); // Ajoute une classe pour styliser le panier
                DISPLAY_STATUS.innerHTML = "🛒<br>Merci pour votre achat"; // Affiche le message de remerciement

                // Attendre 5 secondes avant de ré-afficher "Entrez votre choix"
                setTimeout(() => {
                    SECTION_IMG_CHOICE_USER.src = ""; // Efface l'image de la boisson sélectionnée dans le panier
                    SHOPPING_BASKET.classList.remove("shade"); // Retire la classe de stylisation du panier
                    USER_CHOICE.textContent = "..."; // Réinitialise le texte du choix utilisateur
                    DISPLAY_STATUS.innerHTML = "❓<br>Entrez votre choix"; // Affiche le message d'invite pour un nouveau choix
                }, 5000); // Délai de 5 secondes pour afficher "Servez-vous"

            }, 3000); // Délai de 3 secondes pour afficher "En cours de traitement"
        } else {
            USER_CHOICE.textContent = "EMPTY"; // Affiche un message d'erreur si le stock est épuisé
        }
    } else {
        USER_CHOICE.textContent = "ERROR"; // Affiche un message d'erreur si le choix utilisateur est invalide
    }
});