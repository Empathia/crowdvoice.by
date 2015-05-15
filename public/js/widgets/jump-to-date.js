Class('JumpToDate').inherits(Widget)({

	ELEMENT_CLASS : 'cv-jumptodate',

    HTML : '\
        <div>\
            <div class="header">\
                <h3>Jump to...</h3>\
                <div class="line"></div>\
            </div>\
            <div class="body-wrapper">\
                <div class="body"></div>\
            </div>\
            <div class="arrow"><div></div></div>\
        </div>\
    ',


    YEAR_ELEMENT : '<div class="year"><span></span></div>',

    prototype        : {
        type            : null,
        style           : null,
        years           : null,

        init : function(config){
            Widget.prototype.init.call(this, config);


            for (var year in this.years) {

                var yearDOM = $('<div class="year"><div class="month-title"></div><ul></ul></div>');

                yearDOM.find('.month-title').text(year);
                this.years[year].forEach(function(month){
                    var selectedClass = "";
                    if (month.selected){selectedClass = "selected"}
                    yearDOM.find('ul').append(
                        '<li class="' + selectedClass + '">'+month.name+'<span> (' + month.count + ')</span></li>'
                        );
                });
                this.element.find('.body').append(yearDOM);
            }

            new Button({
                style   : 'clean',
                type    : 'single',
                label   : 'X',
                name    : 'buttonDone'
            }).render(this.element.find('.header'));

        }

    }

});



