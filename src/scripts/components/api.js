const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '7015ab6b-bdad-4895-8a7c-1d74e55f2816',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (promise) => {
    return promise.then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const getUserInfo = () => {
    return handleResponse(fetch(`${config.baseUrl}/users/me`, { headers: config.headers }))
}

export const getCardsInfo = () => {
    return handleResponse(fetch(`${config.baseUrl}/cards`, { headers: config.headers }))
}

export const editUserInfo = (userInfo) => {
    return handleResponse(fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
        })
    }))
}

export const addNewCard = (cardInfo) => {
    return handleResponse(fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(cardInfo)
    }))
}

export const addCardLike = (cardId) => {
    return handleResponse(fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT',
    }))   
}

export const removeCardLike = (cardId) => {
    return handleResponse(fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
    }))
}

export const deleteMyCard = (cardId) => {
    return handleResponse(fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
    }))
}

export const editAvatarUser = (avatarUrl) => {
    return handleResponse(fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarUrl
        })
    }))
}
