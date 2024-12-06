export function addCard(cardInfo, deleteCardCallback, likeCardCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
  
    const cardImage = card.querySelector('.card__image');
    cardImage.setAttribute('src', cardInfo.link);
    cardImage.setAttribute('alt', cardInfo.name);
  
    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = cardInfo.name;
  
    const imageModal = document.querySelector('.popup_type_image');
    imageModal.classList.add('popup_is-animated');
  
    cardImage.addEventListener('click', () => {
      openImageCallback(imageModal, cardInfo);
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
  
  
  
  export function openModalImage(modal, card) {
    const image = modal.querySelector('.popup__image');
    image.setAttribute('src', card.link);
    image.setAttribute('alt', card.name);
    const imageDescription = modal.querySelector('.popup__caption');
    imageDescription.textContent = card.name;
    openModal(modal);
  }
  