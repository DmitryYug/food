/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

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
                    elem.classList.remove('calculating__choose-item_active');
                });
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
    // localStorageCheck('weight');
    // localStorageCheck('height');
    // localStorageCheck('age');
    localStorageCheck('ratio');
    calcResult();

    getStaticInformaion('#gender', 'calculating__choose-item_active');
    getStaticInformaion('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {

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

    
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
            });
        });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')  
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
const   sliderBtnNext = document.querySelector(nextArrow),
        sliderBtnPrev = document.querySelector(prevArrow),
        sliderImgs = document.querySelectorAll(slide),
        sliderDom = document.querySelector(container),
        slidesField = document.querySelector(field),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter);

    let slideIndex = 1,
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

    //     if (current.textContent < 10) {
    //         current.innerHTML = `0${slideIndex}`;
    //     } else {
    //         current.innerHTML = slideIndex;
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
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
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


    slidesField.style.width = 100 * sliderImgs.length + '%';
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

        if (slideIndex == sliderImgs.length) {
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

        if (slideIndex == 1) {
            slideIndex = sliderImgs.length;
        } else {
            slideIndex--;
        }
        currentIndexPush();
        dotsOpacityControll();
    });

    //063 Создаем навигацию для слайдов

    sliderDom.style.position = 'relative';

    const dots = document.createElement('ol'),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const   parent = document.querySelector(tabsParentSelector),
            tabs = document.querySelectorAll(tabsSelector),
            tabContent = document.querySelectorAll(tabsContentSelector);


    function hideTabContent () {
            tabContent.forEach (tabPict => {
                tabPict.classList.add('hide');
                tabPict.classList.remove('show', 'fade');
            });
        tabs.forEach(tabHeader => {
            tabHeader.classList.remove(activeClass);
        });
    }

    function showTabContent (i = 0) {
        tabs[i].classList.add(activeClass);
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }
    
    hideTabContent();
    showTabContent();

    parent.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });    
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function timer(id, deadline) {

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
    
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
            
            
            
            
            
            
            
            
            
window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal',modalTimerId), 10000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('.btn_modal', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2021-08-29');

// 038_TABS        
// 041_TIMER
// 043_Modal
// 048 Используем классы в реальной работе + 049 Rest оператор
    // axios.get('http://localhost:3000/menu')
    //     .then (data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
    //     });
    // });
// 053 Реализация скрипта отправки данных на сервер
// 056 Fetch API
// 061 Создаем слайдер на сайте 
//066, 067_Создаем калькулятор на сайте, часть 1/2
});
    


  
  






          


    
 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map