export function openModal(modal) {
    modal.classList.add('popup_is-opened');
   
    modal.addEventListener('click', (evt) => {
           if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
               closeModal(modal);
           }
       });
       document.addEventListener('keydown', (evt)=> {
           if(evt.key === 'Escape') {
               closeModal(modal);
           }
       })
   }

 export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    }
 
 export function addEventListenersForModal(openBtn, popup) {
    openBtn.addEventListener('click', () => openModal(popup));
}   