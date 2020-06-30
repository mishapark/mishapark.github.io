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
//     // $(".members__item").each(function() {
//         const memberImg = $(".members__img");
//         const memberInfo = $(".members__info");

//         memberInfo.prepend(memberImg);
//     // })
//   }

  if (window.matchMedia("(max-width: 768px)").matches) {
    // Перебираем все итемы
    $(".members__item").each(function() {
        // находим каждый элемент и в каждом из элементов находим сначала картинку
        // $(this) в данном контексте это каждый из .members__item на текущей итерации
        var image = $(this).find('.members__img');
        // потом блок инфо
        var info = $(this).find('.members__info');
        // перемещаем картинку в инфо
        info.prepend(image);
    })
}