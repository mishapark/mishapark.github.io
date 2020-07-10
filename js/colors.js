function Accordeon(selector) {
    const acco = document.querySelector(selector);
    const items = acco.querySelector('[data-list]').children;

    acco.addEventListener('click', function(e) {
        e.preventDefault();
        const target = e.target.closest('[data-trigger]');

        if (!target) return;
        
        const item = target.parentNode;

        if (item.classList.contains('active')) {
            item.classList.remove('active');
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('active');
            };

            item.classList.add('active');
        }
    });
}

$(".colors__close").on("click", e => {
    e.preventDefault();
    $('.colors__item').removeClass('active');
})

new Accordeon('#acc-menu');