var scrapper = require(__dirname + '/../../lib/cvscrapper');

scrapper.processUrl('http://www.informador.com.mx/jalisco/2015/595796/6/la-ssj-lista-ante-posible-llegada-del-huracan-blanca.htm', function (err, info) {
  console.log(arguments);
});
