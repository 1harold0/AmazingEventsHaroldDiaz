export function createTarjetas(mostrarTarjeta, tarjeta) {
    let newCard = document.createElement("div");
    newCard.classList.add("card", "m-3");
    newCard.style.width = "18rem";

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = tarjeta.image;
    cardImage.alt = tarjeta.name;
    cardImage.style.height = "25vh";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = tarjeta.name;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = tarjeta.description;

    let cardButton = document.createElement("div");
    cardButton.classList.add("card-body");

    let cardLinkPrice = document.createElement("a");
    cardLinkPrice.classList.add("card-link");
    cardLinkPrice.textContent = "Price: $" + tarjeta.price;

    let cardLinkDetails = document.createElement("a");
    cardLinkDetails.classList.add("card-link", "btn", "btn-primary");
    cardLinkDetails.href = "details.html?id=" + tarjeta._id;
    cardLinkDetails.textContent = "Details";

    // Formo la tarjeta 
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardButton.appendChild(cardLinkPrice);
    cardButton.appendChild(cardLinkDetails);

    newCard.appendChild(cardImage);
    newCard.appendChild(cardBody);
    newCard.appendChild(cardButton);

    mostrarTarjeta.appendChild(newCard);
}

export function createCheckbox(containerCheckbox, category) {
    let newCheckbox = document.createElement("div");
    newCheckbox.classList.add("form-check", "form-check-inline");
    newCheckbox.innerHTML = `
        <input class="form-check-input" type="checkbox" name="categoryOptions" id="${category}" 
value="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
    `;
    containerCheckbox.appendChild(newCheckbox);
}

