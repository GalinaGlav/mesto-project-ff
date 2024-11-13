const placesList = document.querySelector('.places__list');

for (let i = 0; i < initialCards.length; i++) {
    const card = addCard(initialCards[i], deleteCard);
    placesList.append(card);
}

function addCard(arrayElement, deleteCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.setAttribute('src', arrayElement.link);
    cardImage.setAttribute('alt', arrayElement.name);

    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = arrayElement.name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCardCallback(card);
    });

    return card;
}

function deleteCard(card) {
    card.remove();
}
