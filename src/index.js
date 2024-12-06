import './pages/index.css';
import { initialCards } from './scripts/cards'
import { createCard, deleteCard, likeCard, openModalImage } from './scripts/components/card'
import { openModal, closeModal } from './scripts/components/modal'

const placesList = document.querySelector('.places__list');
renderCards(placesList, initialCards);

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
editProfileBtn.addEventListener('click', () => {
    fillEditProfileModal();
    openModal(editProfileModal);
});

const editProfileForm = document.forms.edit_profile;
editProfileForm.addEventListener('submit', submitEditProfileForm);


const addNewCardsBtn = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
addNewCardsBtn.addEventListener('click', () => openModal(newCardModal));

const newPlaceForm = document.forms.new_place;
newPlaceForm.addEventListener('submit', submitNewPlaceForm);

function renderCards(container, cards) {
    while (container.firstChild) {
        container.firstChild.remove()
    }

    for (let i = 0; i < cards.length; i++) {
        const card = createCard(cards[i], deleteCard, likeCard, openModalImage);
        container.append(card);
    }
}

function fillEditProfileModal() {
    const nameProfile = document.querySelector('.profile__title');
    const inputNameProfile = document.querySelector('.popup__input_type_name');
    inputNameProfile.value = nameProfile.textContent;

    const inputdescriptionProfile = document.querySelector('.popup__input_type_description');
    const descriptionProfile = document.querySelector('.profile__description');
    inputdescriptionProfile.value = descriptionProfile.textContent;
}

function submitEditProfileForm(evt) {
    evt.preventDefault();

    const nameValue = editProfileForm.querySelector('.popup__input_type_name').value;
    const descriptionValue = editProfileForm.querySelector('.popup__input_type_description').value;

    document.querySelector('.profile__title').textContent = nameValue;
    document.querySelector('.profile__description').textContent = descriptionValue;

    closeModal(editProfileModal);
}

function submitNewPlaceForm(evt) {
    evt.preventDefault();

    const cardName = newPlaceForm.querySelector('.popup__input_type_card-name');
    const cardUrl = newPlaceForm.querySelector('.popup__input_type_url');

    const newCard = {
        name: cardName.value,
        link: cardUrl.value
    };

    initialCards.unshift(newCard);

    renderCards(initialCards);
    closeModal(newCardModal);
    newPlaceForm.reset();
}
