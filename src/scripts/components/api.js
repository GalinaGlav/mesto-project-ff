const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '7015ab6b-bdad-4895-8a7c-1d74e55f2816',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })

}

export const getCardsInfo = () => {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const editUserInfo = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
        })
    }).
        then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const addNewCard = (cardInfo) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(cardInfo)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const addCardLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const removeCardLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const deleteMyCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const editAvatarUser = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}
