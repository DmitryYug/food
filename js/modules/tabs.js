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

export default tabs;