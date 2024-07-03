function stockDecrease(stockElement) {
    const stock = parseInt(stockElement.textContent);
    if (stock > 0) {
        stockElement.textContent = stock - 1;
    };
};

const LIST_BTN_DRINK = document.querySelectorAll(".btn-line-keypad>button");
const LIST_STOCK_DRINK = Array.from(document.querySelectorAll("p.stock"));
const LIST_IMG_DRINK = [
    { src: "./images/coca.png", alt: "Image d'une canette de Coca-Cola" },
    { src: "./images/light.png", alt: "Image d'une canette de Coca-Cola Light" },
    { src: "./images/pepsi.png", alt: "Image d'une canette de Pepsi" },
    { src: "./images/max.png", alt: "Image d'une canette de Pepsi Max" },
    { src: "./images/fanta.png", alt: "Image d'une canette de Fanta" },
    { src: "./images/sprite.png", alt: "Image d'une canette de Sprite" }
];
const BTN_RESET = document.querySelector("#btn_reset");
const BTN_CONFIRM = document.querySelector("#btn_confirm");
const SHOPPING_BASKET = document.querySelector(".shopping-basket");
const SECTION_IMG_CHOICE_USER = document.querySelector("#drink_shopping_basket");
const DISPLAY_STATUS = document.querySelector(".commands-section>p:first-of-type");

let USER_CHOICE = document.querySelector("#display_user_choice");

// Mise à jour de la sélection de boisson par l'utilisateur
LIST_BTN_DRINK.forEach(btnDrink => {
    btnDrink.addEventListener("click", () => {
        USER_CHOICE.textContent = btnDrink.textContent;
    });
});

// Réinitialisation de la sélection utilisateur
BTN_RESET.addEventListener("click", () => {
    USER_CHOICE.textContent = "";
});

// Confirmation de la sélection utilisateur et traitement
BTN_CONFIRM.addEventListener("click", () => {
    const DRINK = parseInt(USER_CHOICE.textContent);

    if (DRINK >= 1 && DRINK <= LIST_STOCK_DRINK.length) {
        const STOCK_ELEMENT = LIST_STOCK_DRINK[DRINK - 1];
        const STOCK = parseInt(STOCK_ELEMENT.textContent);

        if (STOCK > 0) {
            stockDecrease(STOCK_ELEMENT);
            DISPLAY_STATUS.innerHTML = "🔄<br>En cours de traitement";

            setTimeout(() => {
                const DRINK_DATA = LIST_IMG_DRINK[DRINK - 1];
                SECTION_IMG_CHOICE_USER.src = DRINK_DATA.src;
                SECTION_IMG_CHOICE_USER.alt = DRINK_DATA.alt;
                SHOPPING_BASKET.classList.add("shade");
                DISPLAY_STATUS.innerHTML = "🛒<br>Merci pour votre achat";

                setTimeout(() => {
                    SECTION_IMG_CHOICE_USER.src = "";
                    SHOPPING_BASKET.classList.remove("shade");
                    USER_CHOICE.textContent = "...";
                    DISPLAY_STATUS.innerHTML = "❓<br>Entrez votre choix";
                }, 5000); // 5 secondes d'affichage de "Servez-vous"

            }, 3000); // 3 secondes de traitement
        } else {
            USER_CHOICE.textContent = "EMPTY";
        };
    } else {
        USER_CHOICE.textContent = "ERROR";
    };
});