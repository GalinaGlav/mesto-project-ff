function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened');
        closeModal(modal);
    }
}

export function openModal(modal) {
    modal.classList.add('popup_is-opened');

    modal.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closeModal(modal);
        }
    });
    document.addEventListener('keydown', closeByEscape)
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}


