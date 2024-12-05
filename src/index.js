import './pages/index.css';
import { initialCards } from './scripts/cards'

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



const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
addEventListenersForModal(editProfileBtn, editProfileModal);


const addNewCardsBtn = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
addEventListenersForModal(addNewCardsBtn, newCardModal);

const closeModalClick = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModal(modal);
    }
}

const closeModalEsc =  (evt)=> {
    if(evt.key === 'Escape') {
        closeModal(modal);
    }
}

function openModal(modal) {
 modal.classList.add('popup_is-opened');   
 modal.addEventListener('click', closeModalClick);
 document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalEsc);
    }

function addEventListenersForModal(openBtn, modal) {
    openBtn.addEventListener('click', () => openModal(modal));
}


