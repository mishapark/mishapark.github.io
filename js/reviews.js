let buttons = $(".reviews__item");

let tabs = $(".reviews__content");

// setInterval(() => {
//     for (let index = 0; index < buttons.length; index++) {
//         buttons[index].classList.remove("reviews__item--active");
//         tabs[index].classList.remove("reviews__content--active");
//     }

//     for (let index = 0; index < buttons.length; index++) {
//         buttons[index].classList.add("reviews__item--active");
//         tabs[index].classList.add("reviews__content--active");
//     }
// }, 2000)

for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    element.addEventListener("click", function (e) {
        e.preventDefault();

        for (let index = 0; index < buttons.length; index++) {
            buttons[index].classList.remove("reviews__item--active");
            tabs[index].classList.remove("reviews__content--active");
        }

        tabs[i].classList.add("reviews__content--active");

        e.currentTarget.classList.add("reviews__item--active");
    })
}