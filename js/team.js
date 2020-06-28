let team = document.querySelector(".members__list");

team.addEventListener("click", function(e) {
    e.preventDefault();
    const link = e.target;
    const listItem = e.currentTarget;

    if(link.classList.contains("members__link")) {
        const active = listItem.querySelector(".members__item.is-active")

        if(active) {
            let activeText = active.querySelector(".members__info");
            activeText.style.height = "0px";
            active.classList.remove("is-active");
        }

        if(!active || active.querySelector(".members__link") !== link) {
            let currentElement = link.closest(".members__item");
            currentElement.classList.add("is-active");
            let currentText = currentElement.querySelector(".members__info");
            currentText.style.height = currentText.scrollHeight + "px";
        }
    }
})

// if (window.matchMedia("(max-width: 768px)").matches) {
//     let img = document.querySelector(".members__img");
//     let desc = document.querySelector(".members__info");

//     desc.append(img);
//   }