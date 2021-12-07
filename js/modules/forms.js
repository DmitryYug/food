import {closeModal, openModal} from './modal';
import {postData} from '../services/services';
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))


function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector),
        status = {
            succes: 'Мы Вам перезвоним в ближайшее время',
            fail: 'Попробуйте еще раз',
            load: 'img/form/spinner.svg'
        };

    


    function bindPushData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = status.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(status.succes);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(status.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    forms.forEach((item) => {
        bindPushData(item);
    });


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div  class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
             `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')  
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}

export default forms;