require('argonjs');

var scrapper = require(__dirname + '/../../lib/cvscrapper');

// scrapper.processUrl('http://img.informador.com.mx/biblioteca/imagen/677x508/1179/1178985.jpg', function (err, info) {
//   console.log(arguments);
// });
// scrapper.processUrl('http://www.informador.com.mx/jalisco/2015/595796/6/la-ssj-lista-ante-posible-llegada-del-huracan-blanca.htm', function (err, info) {
//   console.log(arguments);
// });

scrapper.processUrl('https://vimeo.com/channels/staffpicks/129295235', function (err, info) {
  console.log(arguments);
});
