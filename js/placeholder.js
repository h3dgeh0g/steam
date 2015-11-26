/**
 * Created by Nazar on 23.11.2015.
 */
(function() {
  var input = document.querySelectorAll('input'); // get all text fields
  var cls = "placeholder"; // set name of the class

  if(input) { // if fields found
    for(var i = 0; i < input.length; i++) {
      var t = input[i];
      var txt = t.getAttribute("placeholder");

      if(txt) { // if placeholder found
        if(t.value.length == 0) addClass(t, cls);
        t.value = t.value.length > 0 ? t.value : txt; // if no value found

        addEvent(t, 'focus', function(e) { /*move caret to start position*/
          var event = e || window.e,
              target = event.target || event.srcElement;

          var r = target.createTextRange();
          r.collapse(true);
          r.select();
        });

        addEvent(t, 'keydown', function(e) { /*onKeyDown*/
          var event = e || window.e,
              target = event.target || event.srcElement;

          removeClass(target, cls);
          target.value = target.value == target.getAttribute("placeholder") ? "" : target.value;
        });

        addEvent(t, 'blur', function(e) { /*onBlur*/
          var event = e || window.e,
              target = event.target || event.srcElement;

          if(target.value.length == 0) {
            target.value = target.getAttribute("placeholder");
            addClass(target, cls);
          }
        });

      }
    }
  }
})();
