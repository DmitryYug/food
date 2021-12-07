
function closeModal(modalSelector) {
    const   modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const   modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}


function modal (triggerSelector, modalSelector, modalTimerId) {

    const   modal = document.querySelector(modalSelector),
            btnModal = document.querySelectorAll(triggerSelector);


    btnModal.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};