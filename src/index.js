import './pages/index.css';
import { initialCards } from './scripts/cards'
import { addCard, deleteCard,likeCard, openModalImage } from './scripts/components/card'
import { openModal, closeModal } from './scripts/components/modal'

const placesList = document.querySelector('.places__list');
// создание и добавление карточек на страницу
function renderCards(array) {
    while (placesList.firstChild) {
        placesList.firstChild.remove()
    }

    for (let i = 0; i < array.length; i++) {
        const card = addCard(array[i], deleteCard, likeCard, openModalImage);
        placesList.append(card);
    }
}

renderCards(initialCards);




const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
editProfileBtn.addEventListener('click', () => {
    fillEditProfileModal();
    openModal(editProfileModal);
});

const addNewCardsBtn = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');

addNewCardsBtn.addEventListener('click', () => openModal(newCardModal));

//добавление имени профиля в модалку
function fillEditProfileModal() {
    const nameProfile = document.querySelector('.profile__title');
    const inputNameProfile = document.querySelector('.popup__input_type_name');
    inputNameProfile.value = nameProfile.textContent;

    const inputdescriptionProfile = document.querySelector('.popup__input_type_description');
    const descriptionProfile = document.querySelector('.profile__description');
    inputdescriptionProfile.value = descriptionProfile.textContent;
}


const editProfileForm = document.forms.edit_profile;

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = editProfileForm.querySelector('.popup__input_type_name').value;
    const descriptionValue = editProfileForm.querySelector('.popup__input_type_description').value;

    document.querySelector('.profile__title').textContent = nameValue;
    document.querySelector('.profile__description').textContent = descriptionValue;

    closeModal(editProfileModal);
}

editProfileForm.addEventListener('submit', handleFormSubmit);

const newPlaceForm = document.forms.new_place;

function FormSubmit(evt) {
    evt.preventDefault();

    const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
    const cardUrl = newPlaceForm.querySelector('.popup__input_type_url');

    const newCard = {
        name: cardNameInput.value,
        link: cardUrl.value
    };

    initialCards.unshift(newCard);

    renderCards(initialCards);
    closeModal(newCardModal);
    newPlaceForm.reset();
}

newPlaceForm.addEventListener('submit', FormSubmit);






