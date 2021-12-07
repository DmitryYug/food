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

export default slider;