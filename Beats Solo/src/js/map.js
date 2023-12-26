let myMap;
let zoom = $(window).width() > 480 ? 14 : 13;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.752144, 37.594221],
        zoom: zoom,
        controls: []
      });
      
      const coords = [
        [55.751513, 37.603171],
        [55.756319, 37.622490],
        [55.759859, 37.584047],
        [55.741424, 37.579298],
      ];

      const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: '/dist/img/pics/map.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
      });

      coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
      })
      
      myMap.geoObjects.add(myCollection);

      myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);