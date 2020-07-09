const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("section-active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100

    if (isNaN(position)) {
        console.error("передано неверное значение в countSectionPosition");
        return 0;
    }

    return position;
}

const performTransition = sectionEq => {
if(inScroll == false) {
    inScroll = true;
    const position = countSectionPosition(sectionEq);
    
    display.css({
        transform: `translateY(${position}%)`
    });
    
    sections.eq(sectionEq).addClass("section-active").siblings().removeClass("section-active");
    
    setTimeout(() => {
        inScroll = false;

        sideMenu
        .find(".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .siblings()
        .removeClass("fixed-menu__item--active");
    }, 1300);
}
};

const viewportScroller = direction => {
    const activeSection = sections.filter(".section-active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index())
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    };

    if (deltaY < 0) {
       scroller.prev();
    };
})

$(window).on("keydown", e => {

    const tagName = e.target.tagName.toLowerCase();
    const scroller = viewportScroller();

    if(tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38:
                 scroller.prev();
                break;
     
             case 40:
                scroller.next();
                 break;
        }
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});

if(isMobile) {
    $("body").swipe( {
        swipe: function(event, direction) {
        const scroller = viewportScroller();
        let scrollDirection = "";
    
        if(direction == "up") scrollDirection = "next";
        if(direction == "down") scrollDirection = "prev";
    
        scroller[scrollDirection]();
        },
      });   
}