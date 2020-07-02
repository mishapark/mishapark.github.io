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

//следим за изменением размеров окна
$(window).on('resize', function () {
    // Перебираем все итемы
    $(".members__item").each(function () {
        // находим каждый элемент и в каждом из элементов находим сначала картинку
        // $(this) в данном контексте это каждый из .members__item на текущей итерации
        var image = $(this).find('.members__img');
        // потом блок инфо
        var info = $(this).find('.members__info');
        // если ширина окна меньше либо равна 768
        if ($(window).width() <= 768) {
            // перемещаем картинку в инфо
            info.prepend(image);
        } else {
            // иначе возращаем картинки на изначальную позицию
            $(this).prepend(image);
        }
    })
})