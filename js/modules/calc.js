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

export default calc;