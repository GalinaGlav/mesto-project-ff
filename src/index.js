import './pages/index.css';
import { initialCards } from './scripts/cards'
import { createCard, deleteCard, likeCard } from './scripts/components/card'
import { openModal, closeModal } from './scripts/components/modal'

const placesList = document.querySelector('.places__list');

// profile
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

// editForm
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms.edit_profile;
const editProfileFormName = editProfileForm.querySelector('.popup__input_type_name');
const editProfileFormDescr = editProfileForm.querySelector('.popup__input_type_description');

// card
const addNewCardsBtn = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.new_place;
const cardName = newCardForm.querySelector('.popup__input_type_card-name');
const cardUrl = newCardForm.querySelector('.popup__input_type_url');

// image
const imageModal = document.querySelector('.popup_type_image');
const image = imageModal.querySelector('.popup__image');
const imageDescription = imageModal.querySelector('.popup__caption');

// editProfile listeners
editProfileBtn.addEventListener('click', () => {
    fillEditProfileModal();
    openModal(editProfileModal);
});

editProfileModal.addEventListener('click', closeModalByClick(editProfileModal));
editProfileForm.addEventListener('submit', submitEditProfileForm);

// card listeners
addNewCardsBtn.addEventListener('click', () => {
    newCardForm.reset();
    openModal(newCardModal);
});
newCardForm.addEventListener('submit', submitNewPlaceForm);
newCardModal.addEventListener('click', closeModalByClick(newCardModal));

// image listeners
imageModal.addEventListener('click', closeModalByClick(imageModal));

// start
renderCards(placesList, initialCards);

function renderCards(container, cards) {
    for (let i = 0; i < cards.length; i++) {
        const card = createCard(cards[i], deleteCard, likeCard, openModalImage);
        container.append(card);
    }
}

function fillEditProfileModal() {
    editProfileFormName.value = profileTitle.textContent;
    editProfileFormDescr.value = profileDescr.textContent;
}

function submitEditProfileForm(evt) {
    evt.preventDefault();

    profileTitle.textContent = editProfileFormName.value;
    profileDescr.textContent = editProfileFormDescr.value;

    closeModal(editProfileModal);
}

function submitNewPlaceForm(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardName.value,
        link: cardUrl.value
    };

    const card = createCard(newCard, deleteCard, likeCard, openModalImage);
    placesList.prepend(card);

    closeModal(newCardModal);
}

function openModalImage(card) {
    image.setAttribute('src', card.link);
    image.setAttribute('alt', card.name);
    imageDescription.textContent = card.name;
    openModal(imageModal);
}

function closeModalByClick(modal) {
    return (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closeModal(modal);
        }
    }
}