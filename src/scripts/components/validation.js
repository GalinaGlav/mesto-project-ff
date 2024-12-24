

//добавление класса со стилями при ошибке в инпуте
const showInputError = (form, input, errorMessage, objectValidation) => {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add(objectValidation.inputErrorClass);
    formError.classList.add(objectValidation.errorClass);
    formError.textContent = errorMessage;
}

//удвление класса со стилями при ошибке в инпуте в случае если форма валидна
const hideInputError = (form, input, objectValidation) => {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(objectValidation.inputErrorClass);
    formError.classList.remove(objectValidation.errorClass);
    formError.textContent = '';
}

//проверка формы на валидность
const isValid = (form, input, objectValidation) => {
    if (!input.validity.valid) {
        if (input.validity.patternMismatch) {
            input.setCustomValidity(input.dataset.errorMessage);
        } else {
            input.setCustomValidity("");
        }

        showInputError(form, input, input.validationMessage, objectValidation);
    } else {
        hideInputError(form, input, objectValidation);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((itemInput) => {
        return !itemInput.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement, objectValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(objectValidation.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(objectValidation.inactiveButtonClass);
    }

}
//lобавление обработчика осбытий всем полям формы
const setEventListeners = (form, objectValidation) => {
    const inputList = Array.from(form.querySelectorAll(objectValidation.inputSelector));
    const buttonSubmit = form.querySelector(objectValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonSubmit, objectValidation);
    inputList.forEach((itemArr) => {
        itemArr.addEventListener('input', () => {
            isValid(form, itemArr, objectValidation);
            toggleButtonState(inputList, buttonSubmit, objectValidation);
        });
    });
}

//добавление фкнкции перебора всех форм в документе и переаст их как аргумент для функции setEventListeners
export const enableValidation = (objectValidation) => {
    const formList = Array.from(document.querySelectorAll(objectValidation.formSelector));
    formList.forEach((itemForm) => {
        setEventListeners(itemForm, objectValidation);
    });
}

export const clearValidation = (form, objectValidation) => {
    const inputList = Array.from(form.querySelectorAll(objectValidation.inputSelector));
    const buttonSubmit = form.querySelector(objectValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonSubmit, objectValidation);
    inputList.forEach((itemArr) => {
        hideInputError(form, itemArr, objectValidation);
    });
}