$(function() {
    if (typeof Array.prototype.forEach !== 'function') {
        Array.prototype.forEach = function(callback, context) {
            for (var i = 0; i < this.length; i++) {
                callback.apply(context, [this[i], i, this]);
            }
        };
    }

    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0) ?
                Math.ceil(from) :
                Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP && oThis ?
                        this :
                        oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    if (!('placeholder' in document.createElement('input'))) {
        var addPlaceholder = function() {
            var input = $(this);
            if (input.val() == '' || input.val() === input.attr('placeholder')) {
                input.parent().addClass('relative');

                input.parent().append($('<label>').addClass('placeholder-label')
                    .attr('for', input.attr('id'))
                    .text(input.attr('placeholder'))
                );
            }
        };
        $('input[placeholder]').focus(function() {
            var input = $(this);
            input.parent().find('label[for=' + input.attr('id') + ']').addClass('invisible');
        }).blur(function() {
            var input = $(this);
            if (!input.val()) {
                input.parent().find('label[for=' + input.attr('id') + ']').removeClass('invisible');
            }
        });
        $('input[placeholder]').each(function(it) {
            addPlaceholder.apply(this);
        });
    }

    (function() {
        var D = new Date('2011-06-02T09:34:29+02:00');
        if (!D || +D !== 1307000069000) {
            Date.fromISO = function(s) {
                var day, tz,
                    rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
                    p = rx.exec(s) || [];
                if (p[1]) {
                    day = p[1].split(/\D/);
                    for (var i = 0, L = day.length; i < L; i++) {
                        day[i] = parseInt(day[i], 10) || 0;
                    };
                    day[1] -= 1;
                    day = new Date(Date.UTC.apply(Date, day));
                    if (!day.getDate()) return NaN;
                    if (p[5]) {
                        tz = (parseInt(p[5], 10) * 60);
                        if (p[6]) tz += parseInt(p[6], 10);
                        if (p[4] == '+') tz *= -1;
                        if (tz) day.setUTCMinutes(day.getUTCMinutes() + tz);
                    }
                    return day;
                }
                return NaN;
            }
        } else {
            Date.fromISO = function(s) {
                return new Date(s);
            }
        }
    })();

    if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
        var path = "../img/ico/png/";
        $("img[src$='.svg']").each(function() {
            var img = $(this),
                imgSrc = img.attr("src");
            img.attr("src", path + imgSrc.substring(imgSrc.lastIndexOf("/"), imgSrc.indexOf('.svg')) + ".png");
        });
    }
});