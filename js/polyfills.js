$(function(){
  if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function(callback, context) {
      for (var i = 0; i < this.length; i++) {
        callback.apply(context, [ this[i], i, this ]);
      }
    };
  }

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  if (!('placeholder' in document.createElement('input'))) {
    var addPlaceholder = function() {
      var input = $(this);
      if (input.val() == '' || input.val() === input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    };
    $('input[placeholder]').not('input[type=password]').focus(function() {
      var input = $(this);
      if (input.val() === input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(addPlaceholder);
    $('input[placeholder]').not('input[type=password]').each(function(it) {
      addPlaceholder.apply(this);
    });
  }
});