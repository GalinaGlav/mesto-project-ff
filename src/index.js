import './pages/index.css';
import { initialCards, addCard, deleteCard } from './scripts/cards'
import { openModal, closeModal, addEventListenersForModal } from './scripts/modal'

const placesList = document.querySelector('.places__list');
// создание и добавление карточек на страницу
function renderCards(array) {
    while (placesList.firstChild) {
        placesList.firstChild.remove()
    }

    for (let i = 0; i < array.length; i++) {
        const card = addCard(array[i], deleteCard);
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
// //добавление описания  профиля в модалку
// let inputdescriptionProfile = document.querySelector('.popup__input_type_description');
// const descriptionProfile = document.querySelector('.profile__description');
// inputdescriptionProfile.value = descriptionProfile.textContent;
// кнопка отпрвки формы
const submitBtn = document.querySelector('.popup__button');
//выбираем поле ввода имени в форме
// const nameProfileForm = document.edit - profile.popup__input_type_name;
//проверяем написал ли пользователь что то

// Находим форму в DOM
// const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const form1 = document.forms.edit_profile;
const nameInput = form1.querySelector('.popup__input_type_name');
const jobInput = form1.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const descriptionValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const nameProfile = document.querySelector('.profile__title');
    const descriptionProfile = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameValue;
    descriptionProfile.textContent = descriptionValue;
    closeModal(editProfileModal);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form1.addEventListener('submit', handleFormSubmit);

const form2 = document.forms.new_place;
const cardNameInput = form2.querySelector('.popup__input_type_card-name');
const cardUrl = form2.querySelector('.popup__input_type_url');

function FormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const newCard = {};
    const cardNameValue = cardNameInput.value;
    const cardUrlValue = cardUrl.value;
    newCard.name = cardNameValue;
    newCard.link = cardUrlValue;
    initialCards.unshift(newCard);
    renderCards(initialCards);
    closeModal(newCardModal);
}

form2.addEventListener('submit', FormSubmit);

