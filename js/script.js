            import calc from './modules/calc';
            import cards from './modules/cards';
            import forms from './modules/forms';
            import modal from './modules/modal';
            import slider from './modules/slider';
            import tabs from './modules/tabs';
            import timer from './modules/timer';
            import {openModal} from './modules/modal';
            
window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal',modalTimerId), 10000);

    calc();
    cards();
    forms('form', modalTimerId);
    modal('.btn_modal', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-08-29');

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
    


  
  






          


    
 