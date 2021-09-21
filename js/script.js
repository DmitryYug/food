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

    window.addEventListener('scroll', showModalByScroll);



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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    
    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
    //         });
    //     });

    // axios.get('http://localhost:3000/menu')
    //     .then (data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
    //     });
    // });
    
// 053 Реализация скрипта отправки данных на сервер
// 056 Fetch API
    
    const   forms = document.querySelectorAll('form'),
            status = {
                succes: 'Мы Вам перезвоним в ближайшее время',
                fail: 'Попробуйте еще раз',
                load: 'img/form/spinner.svg'
            };
    
    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });
        return await res.json();
    };


    function bindPushData (form) {
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
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')  
    //     .then(data => data.json())
    //     .then(res => console.log(res));

// 061 Создаем слайдер на сайте 

    const   sliderBtnNext = document.querySelector('.offer__slider-next'),
            sliderBtnPrev = document.querySelector('.offer__slider-prev'),
            sliderImgs = document.querySelectorAll('.offer__slide'),
            sliderDom = document.querySelector('.offer__slider'),
            slidesField = document.querySelector('.offer__slider-inner'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            width = window.getComputedStyle(slidesWrapper).width,
            currentCounter = document.querySelector('#current'),
            total = document.querySelector('#total');

    let     slideIndex = 1,
            offset = 0;

// 061 вариант 1

    function makeNumber(string) {
        return +string.replace(/\D/ig, '');
    }

    // showSlide(slideIndex);
    
    if (sliderImgs.length < 10) {
        total.innerHTML = `0${sliderImgs.length}`;
    } else {
        total.innerHTML = sliderImgs.length;
    } 

    // function showSlide (n) {
    //     if (n > sliderImgs.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = sliderImgs.length;
    //     }

    //     sliderImgs.forEach((slide) => {
    //         slide.classList.add('hide');
    //     });
    //     sliderImgs[slideIndex - 1].classList.add('show', 'fade');
    //     sliderImgs[slideIndex - 1].classList.remove('hide');

    //     if (currentCounter.textContent < 10) {
    //         currentCounter.innerHTML = `0${slideIndex}`;
    //     } else {
    //         currentCounter.innerHTML = slideIndex;
    //     }

    // }

    // function plusSlides (n) { 
    //     showSlide(slideIndex += n);
    // }

    // sliderBtnNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // sliderBtnPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    

//062 вариант 2 (карусель)

    indexRegulation(slideIndex);

    function currentIndexPush() {
        if (slideIndex  < 10) {
            currentCounter.textContent = `0${slideIndex}`;
        } else {
            currentCounter.textContent = slideIndex;
        }
    }

    function dotsOpacityControll() {
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }

    function indexRegulation(n) {
        if (n > sliderImgs.length) {
            slideIndex = 1;
        }  
        if (n < 1) {
            slideIndex = sliderImgs.length;
        }
        currentIndexPush();
    }

    // function plusIndex (n) {
    //     indexRegulation(slideIndex += n);
    // }


    slidesField.style.width = 100 * sliderImgs.length + '%' ;
    slidesField.style.display = 'flex';

    sliderImgs.forEach((slide) => {
        slide.style.width = width;
    });

    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    sliderBtnNext.addEventListener('click', () => {
        if (offset == makeNumber(width) * (sliderImgs.length - 1)) {
            offset = 0;
        } else {
            offset += makeNumber(width);
        }
        slidesField.style.transform = `translateX(${-offset}px)`;
        
        if(slideIndex == sliderImgs.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        currentIndexPush();
        dotsOpacityControll();
    });

    sliderBtnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = makeNumber(width) * (sliderImgs.length - 1);
        } else {
            offset -= makeNumber(width);
        }
        slidesField.style.transform = `translateX(${-offset}px)`;
        
        if(slideIndex == 1) {
            slideIndex = sliderImgs.length;
        } else {
            slideIndex--;
        }
        currentIndexPush();
        dotsOpacityControll();
    });

//063 Создаем навигацию для слайдов

    sliderDom.style.position = 'relative';
    
    const   dots = document.createElement('ol'),
            dotsArr = [];

    dots.classList.add('carousel-indicators');
    sliderDom.append(dots);

    for (let i = 0; i < sliderImgs.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.append(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dotsArr.push(dot); 
    }

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = makeNumber(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(${-offset}px)`;
            
            currentIndexPush();
            dotsOpacityControll();
        });
    });

//064, 065_Создаем калькулятор на сайте, часть 1/2

    const   result = document.querySelector('.calculating__result span');
            
    let     gender = 'female',
            ratio = 1.375,
            ratioId = 'small',
            height, weight, age;


            
    function localStorageCheck (key) {
        if (localStorage.getItem(key)) {
            if (key == 'gender') {
                gender = localStorage.getItem(key);
                document.querySelectorAll(`#${key} div`).forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active')});
                document.getElementById(localStorage.getItem(key)).classList.add('calculating__choose-item_active');
            } 
            if (key == 'age') {
                age = localStorage.getItem(key);
                document.getElementById(key).value = localStorage.getItem(key);
            }
            if (key == 'ratio') {
                ratio = localStorage.getItem(key);
                document.querySelectorAll('.calculating__choose_big div').forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });
                document.getElementById(localStorage.getItem('ratioId')).classList.add('calculating__choose-item_active');
            }
            if (key == 'weight') {
                weight = localStorage.getItem(key);
                document.getElementById(key).value = localStorage.getItem(key);
            }
            if (key == 'height') {
                height = localStorage.getItem(key);
                document.getElementById(key).value = localStorage.getItem(key);
            }
        }
    }

    function calcResult() {
        if(!gender || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }
        console.log(gender, weight, height, ratio, age);
        if (gender == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }



    function getStaticInformaion(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        localStorage.setItem('gender', gender);
        localStorage.setItem('ratio', ratio);
        localStorage.setItem('ratioId', ratioId);

        elements.forEach(element => {
            element.addEventListener('click', (e)=> {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');  
                    localStorage.setItem('ratioId', e.target.attributes[1].nodeValue);
                    localStorage.setItem('ratio', ratio);
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
                elements.forEach(elem => elem.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calcResult();
            });
        });
    }

    
    function getDynamicInformation(selector) {
        let input = document.querySelector(selector);
        
        input.addEventListener('input', ()=> {
            if(selector == '#weight') {
                weight = +input.value;
                localStorage.setItem('weight', weight);
            }
            if(selector == '#height') {
                height = +input.value;
                localStorage.setItem('height', height);
            }
            if(selector == '#age')    {
                age = +input.value;
                localStorage.setItem('age',age);
            }
           
            calcResult();
           
            if (isNaN(input.value)) {
                input.style.cssText = "box-shadow: 0 4px 15px red";
            } else {
                input.style.cssText = "box-shadow: 0 4px 15px #rgba(247, 191, 191, 0.2)";
            } 
        });
    }    

    localStorageCheck('gender');
    localStorageCheck('weight');
    localStorageCheck('height');
    localStorageCheck('age');
    localStorageCheck('ratio');
    calcResult();

    getStaticInformaion('#gender', 'calculating__choose-item_active');
    getStaticInformaion('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');
    getDynamicInformation('#age');


});
    


  
  






          


    
 