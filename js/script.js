window.addEventListener('DOMContentLoaded', () => {

    const   parent = document.querySelector('.tabheader__items'),
            tabs = document.querySelectorAll('.tabheader__item'),
            tabContent = document.querySelectorAll('.tabcontent');

//  38_TABS        

    function hideTabContent () {
            tabContent.forEach (tabPict => {
                tabPict.classList.add('hide');
                tabPict.classList.remove('show', 'fade');
            });
        tabs.forEach(tabHeader => {
            tabHeader.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }
    
    hideTabContent();
    showTabContent();

    parent.addEventListener('click', (event) => {
        let target = event.target;
        tabs.forEach((tapHeader, i) => {
            if (target == tapHeader) {
                hideTabContent();
                showTabContent(i);
            }
        });
    });



//  41_TIMER

    const   deadline = '2021-07-14';

    let     now = new Date ();

    function getTimeRemaining (endtime) {
        const   t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor(t / (1000 * 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
        updateClock();
        
        function updateClock () {

            const t = getTimeRemaining(endtime);
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML =  getZero(t.hours);
            minutes.innerHTML =  getZero(t.minutes);
            seconds.innerHTML =  getZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    
    setClock('.timer', deadline);

//  43_Modal

    const   modal = document.querySelector('.modal'),
            btnModal = document.querySelectorAll('.btn_modal');

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }
    function openModal () {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }
    
    // const modalTimerId = setTimeout(openModal, 3000);

    btnModal.forEach ((btn) => {
        btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight) {
                openModal(); 
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)



// 048 Используем классы в реальной работе + 049 Rest оператор


    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.description = description,
            this.price = price,
            this.parent = document.querySelector(parentSelector),
            this.classes = classes, 
            this.rate = 27,
            this.transferToUAH();
        }

        transferToUAH () {
            this.price = this.price * this.rate;
        }

        render () {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'fitness',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
        ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        100,
        '.menu .container',
        ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        72,
        '.menu .container'
    ).render();

// 053 Реализация скрипта отправки данных на сервер
// 056 Fetch API
    
    const   forms = document.querySelectorAll('form'),
            status = {
                succes: 'Мы Вам перезвоним в ближайшее время',
                fail: 'Попробуйте еще раз',
                load: 'img/form/spinner.svg'
            };
    

    function pushData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = status.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData (form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value; 
            });
            // request.send(json);

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
        pushData(item);
    });


    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div  class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }
    fetch('db.json')  
        .then(data => data.json())
        .then(res => console.log(res));
});
    








          


    
