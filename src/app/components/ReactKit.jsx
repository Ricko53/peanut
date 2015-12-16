'use strict';

export const addClass = function(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = element.className + ' ' + className;
  }
  return element;
}

export const hasClass = function(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

export const removeClass = function(element, className) {
  if (hasClass(className)) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = (' ' + element.className + ' ')
        .replace(' ' + className + ' ', ' ').trim();
    }
  }
  return element;
}

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

export const className = function () {

  let classes = '';

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    if (!arg) continue;

    let argType = typeof arg;

    if ('string' === argType || 'number' === argType) {
      classes += ' ' + arg;

    } else if (Array.isArray(arg)) {
      classes += ' ' + classNames.apply(null, arg);

    } else if ('object' === argType) {
      for (let key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes += ' ' + key;
        }
      }
    }
  }

  return classes.substr(1);
}