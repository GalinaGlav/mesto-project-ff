export function createCard(cardInfo, deleteCardCallback, likeCardCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.setAttribute('src', cardInfo.link);
    cardImage.setAttribute('alt', cardInfo.name);

    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = cardInfo.name;

    cardImage.addEventListener('click', () => {
        openImageCallback(cardInfo);
    })

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCardCallback(card);
    });

    const likeBtn = card.querySelector('.card__like-button');
    likeBtn.addEventListener('click', () => {
        likeCardCallback(likeBtn);
    });

    return card;
}

export function deleteCard(cardtarget) {
    cardtarget.remove();
}

export function likeCard(cardLikeBtn) {
    cardLikeBtn.classList.toggle('card__like-button_is-active');
}
