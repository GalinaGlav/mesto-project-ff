import './pages/index.css';
import { createCard, deleteCard, setCardLikeInfo } from './scripts/components/card'
import { openModal, closeModal } from './scripts/components/modal'
import { clearValidation, enableValidation } from './scripts/components/validation'
import { getUserInfo, getCardsInfo, editUserInfo, addNewCard, addCardLike, removeCardLike, deleteMyCard, editAvatarUser } from './scripts/components/api'

const placesList = document.querySelector('.places__list');

// profile image
const profileImg = document.querySelector('.profile__image');
const profileImgModal = document.querySelector('.popup_profile-image'); //весь попап
const openProfileImgBtn = document.querySelector('.edit-profile__image'); //кнопка открытия редактирования аватара
const profileImgUrlInput = document.querySelector('.popup__input_type_profile_image_url'); // инпут формы редактирования аватара
const submitProfileImgModalBtn = profileImgModal.querySelector('.popup__button');

// profile info
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

const profileModal = document.querySelector('.popup_type_edit');
const openProfileBtn = document.querySelector('.profile__edit-button');

const profileTitleInput = profileModal.querySelector('.popup__input_type_name');
const profileDescrInput = profileModal.querySelector('.popup__input_type_description');
const submitProfileModalBtn = profileModal.querySelector('.popup__button');

// new card
const newCardModal = document.querySelector('.popup_type_new-card');
const addNewCardsBtn = document.querySelector('.profile__add-button');

const newCardNameInput = newCardModal.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardModal.querySelector('.popup__input_type_url');
const submitNewCardModalBtn = newCardModal.querySelector('.popup__button');

// image
const imageModal = document.querySelector('.popup_type_image');
const image = imageModal.querySelector('.popup__image');
const imageDescription = imageModal.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// functions

const setBtnLoading = btn => btn.textContent = 'Сохранение...';
const removeBtnLoading = btn => btn.textContent = 'Сохранить';

const submitProfileImgModal = evt => {
    evt.preventDefault();
    setBtnLoading(submitProfileImgModalBtn);
    editAvatarUser(profileImgUrlInput.value)
        .then(user => {
            profileImg.setAttribute('style', `background-image: url(${user.avatar})`);
            closeModal(profileImgModal);
        }, rej => {
            alert(rej)
        })
        .catch(err => console.log(err))
        .finally(() => removeBtnLoading(submitProfileImgModalBtn));
}

const submitProfileModal = evt => {
    evt.preventDefault();
    setBtnLoading(submitProfileModalBtn);

    editUserInfo({
        name: profileTitleInput.value,
        about: profileDescrInput.value
    })
        .then((user) => {
            profileTitle.textContent = user.name;
            profileDescr.textContent = user.about;
            closeModal(profileModal);
        }, rej => {
            alert(rej)
        })
        .catch(err => console.log(err))
        .finally(() => removeBtnLoading(submitProfileModalBtn));
}

const submitNewCardModal = evt => {
    evt.preventDefault();
    setBtnLoading(submitNewCardModalBtn);
    const newCard = {
        name: newCardNameInput.value,
        link: newCardUrlInput.value
    };
    addNewCard(newCard)
        .then(cardInfo => {
            const card = createCardLocal(cardInfo, cardInfo.owner);
            placesList.prepend(card);
            closeModal(newCardModal);
        }, rej => {
            alert(rej)
        })
        .catch(err => console.log(err))
        .finally(() => removeBtnLoading(submitNewCardModalBtn));
}

const closeModalByClick = modal => {
    return (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closeModal(modal);
        }
    }
}

const fillEditProfileModal = () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescrInput.value = profileDescr.textContent;
}

const createCardLocal = (card, user) => {
    return createCard(
        card,
        cardTarget => {
            deleteMyCard(card._id)
                .then(() => deleteCard(cardTarget))
                .catch(err => console.log(err));
        },
        (wasLiked, likeBtn, likesCounter) => {
            let promise;
            if (wasLiked) {
                promise = removeCardLike(card._id);
            } else {
                promise = addCardLike(card._id);
            }

            promise
                .then((cardInfo) => {
                    setCardLikeInfo(likeBtn, likesCounter, cardInfo, user._id)
                })
                .catch(err => console.log(err));
        },
        openModalImage,
        user._id)
}

const openModalImage = card => {
    image.setAttribute('src', card.link);
    image.setAttribute('alt', card.name);
    imageDescription.textContent = card.name;
    openModal(imageModal);
}

// profile image
openProfileImgBtn.addEventListener('click', () => {
    const backgroundImage = profileImg.style.backgroundImage;
    profileImgUrlInput.value = backgroundImage.substring(5, backgroundImage.length - 2);

    openModal(profileImgModal);
    clearValidation(profileImgModal, validationConfig);
})

profileImgModal.addEventListener('click', closeModalByClick(profileImgModal));
profileImgModal.addEventListener('submit', submitProfileImgModal);

// profile info
openProfileBtn.addEventListener('click', () => {
    fillEditProfileModal();

    openModal(profileModal);
    clearValidation(profileModal, validationConfig)
});

profileModal.addEventListener('click', closeModalByClick(profileModal));
profileModal.addEventListener('submit', submitProfileModal);

// new card
addNewCardsBtn.addEventListener('click', () => {
    newCardNameInput.value = '';
    newCardUrlInput.value = '';

    openModal(newCardModal);
    clearValidation(newCardModal, validationConfig)
});
newCardModal.addEventListener('submit', submitNewCardModal);
newCardModal.addEventListener('click', closeModalByClick(newCardModal));

// card image
imageModal.addEventListener('click', closeModalByClick(imageModal));

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardsInfo()])
    .then(values => {
        const [user, cards] = values;
        profileTitle.textContent = user.name;
        profileDescr.textContent = user.about;
        profileImg.setAttribute('style', `background-image: url(${user.avatar})`);

        cards.forEach((card) => {
            const cardHtml = createCardLocal(card, user);
            placesList.append(cardHtml);
        })
    })
    .catch(err => console.log(err))