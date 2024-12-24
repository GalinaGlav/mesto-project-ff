export const createCard = (cardInfo, deleteCardCallback, addCardLikeCallback, removeCardLikeCallback, openImageCallback, userId) => {
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

    const like = card.querySelector('.likes')
    const likesCount = cardInfo.likes.length;
    like.textContent = likesCount;

    const iLiked = cardInfo.likes.some((item) => item._id === userId);

    const likeBtn = card.querySelector('.card__like-button');
    if (iLiked) {
        likeBtn.classList.add('card__like-button_is-active');
    }

    likeBtn.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            removeCardLikeCallback(likeBtn);
            like.textContent = Number(like.textContent) - 1;
        } else {
            addCardLikeCallback(likeBtn);
            like.textContent = Number(like.textContent) + 1;
        }
    });

    return card;
}

export const deleteCard = cardtarget => cardtarget.remove();
export const likeCard = cardLikeBtn => cardLikeBtn.classList.add('card__like-button_is-active');
export const removeLikeCard = cardLikeBtn => cardLikeBtn.classList.remove('card__like-button_is-active');
