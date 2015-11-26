/**
 * Created by Nazar on 12.11.2015.
 */
var bs = document.getElementById('button-signup'),
    ls = document.getElementById('loginSignUp'),
    lg = document.getElementById('login'),
    sp = document.getElementById('signup'),
    a = 'active';

addEvent(ls, 'click', function(e) {
  var event = e || window.e,
      target = event.target || event.srcElement;

  if(target.tagName != 'BUTTON') return;

  removeClass(sp, a);
  hasClass(lg, a) ? removeClass(lg, a) : addClass(lg, a);
});

addEvent(bs, 'click', function() {
  removeClass(lg, a);
  addClass(sp, a);
});
//remove event click for logInOut
addEvent(document.body, 'click', function(e) {
  var event = e || window.e,
      target = event.target || event.srcElement;

  while(true) {
    if(target == document) break;

    if(target.hasAttributes('id')) {
      if(target.getAttribute('id') == 'logInOut') return;
    }

    target = target.parentNode;
  }
  removeClass(lg, a);
  removeClass(sp, a);
});

/* --- Tabs --- */
var tabs = document.getElementById('tabs'),
    tab_content = document.querySelectorAll('.tab-contents'),
    arr = [];

addEvent(tabs, 'click', function(e) {
  var event = e || window.e,
      target = event.target || event.srcElement;

  if(target.tagName != 'A') return;

  for(var i = 0; i < this.childNodes.length; i++) {
    if(this.childNodes[i].nodeName != 'LI') continue;
    arr.push(i);
    removeClass(this.childNodes[i], a);
  }

  for(var j = 0; j < arr.length; j++) {
    removeClass(tab_content[j], 'active-content');
    if(this.childNodes[arr[j]].firstElementChild == target) {
      if(!hasClass(tab_content[j], 'active-content'))
        addClass(tab_content[j], 'active-content');
    }
  }
  addClass(target.parentElement, a);
  arr = [];
});
