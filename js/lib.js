/**
 * Created by Nazar on 12.11.2015.
 */
"use strict";
/**
 * If exist class in DOM element return true else return false
 * @param el
 * @param cls
 * @returns {boolean}
 */
var hasClass = function(el, cls) {
  if(el.classList) return el.classList.contains(cls);
  var classes = el.className.split(' ');

  for(var i = 0; i < classes.length; i++) {
    if(classes[i] == cls)  return true;
  }
  return false
};
/**
 * Adding class on DOM element
 * @param el
 * @param cls
 * @returns {string}
 */
function addClass(el, cls) {
  if(el.classList) return el.classList.add(cls);

  var classes = el.className.split(' ');
  if(hasClass(el, cls)) return;
  classes.push(cls);

  return el.className = classes.join(' ');
}
/**
 * Removing class on DOM element
 * @param el
 * @param cls
 * @returns {string}
 */
function removeClass(el, cls) {
  if(el.classList) return el.classList.remove(cls);

  var classes = el.className.split(' ');
  for(var i = 0; i < classes.length; i++) {
    if(classes[i] == cls) {
      classes.splice(i, 1);
      i--
    }
  }

  return el.className = classes.join(' ');
}
/**
 * Cross-Browser addEventListener
 * @param elem
 * @param event
 * @param func
 */
function addEvent(elem, event, func) {
  if(elem.addEventListener) {
    elem.addEventListener(event, func);
  } else {
    elem.attachEvent("on" + event, func);
  }
}