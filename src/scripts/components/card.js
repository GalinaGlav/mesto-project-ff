export const createCard = (cardInfo, deleteCardCallback, updateCardLikeInfoCallback, openImageCallback, userId) => {
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
    if (cardInfo.owner._id !== userId) {
        deleteButton.setAttribute('style', "display:none");
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCardCallback(card);
        });
    }

    const likesCounter = card.querySelector('.likes')
    const likeBtn = card.querySelector('.card__like-button');
    setCardLikeInfo(likeBtn, likesCounter, cardInfo, userId);

    likeBtn.addEventListener('click', () => {
        const wasLiked = likeBtn.classList.contains('card__like-button_is-active');
        updateCardLikeInfoCallback(wasLiked, likeBtn, likesCounter);
    });

    return card;
}

export const deleteCard = cardtarget => cardtarget.remove();

//выставление информации о лайках
export const setCardLikeInfo = (likeBtn, likesCounter, cardInfo, userId) => {
    const iLiked = cardInfo.likes.some((like) => like._id === userId);
    if (iLiked) {
        likeBtn.classList.add('card__like-button_is-active');
    } else {
        likeBtn.classList.remove('card__like-button_is-active');
    }

    likesCounter.textContent = cardInfo.likes.length;
}

