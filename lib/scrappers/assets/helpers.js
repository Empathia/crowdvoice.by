function firstTextIn (elements) {
  var content = '';
  for (var i=0; i < elements.length; i+=1) {
    content = $(elements[i]).text();
    if (content) {
      return content
        .trim();
    }
  }

  return '';
}

function absolutePath(path) {
  if (path.match(/^\/[^\/]/)) {
    return window.location.protocol + '//' +
      window.location.host + '/' +
      path.replace(/^\/\//, '');
  } else if (path.match(/^\/\//)) {
    return window.location.protocol + path;
  } else {
    return path;
  }
}

function getContentOrValue(selectors) {
  var values = [];

  selectors.forEach(function (selector) {
    if ($(selector).length > 0) {
      if ($(selector).attr('content')) {
        values.push($(selector).attr('content'));
      } else if ($(selector).attr('value')) {
        values.push($(selector).attr('value'));
      }
    }
  });

  return values;
}
