function firstTextIn (elements) {
  var content = '';
  for (var i=0; i < elements.length; i+=1) {
    content = $(elements[i]).text();
    if (content) {
      return content
        .trim()
        .replace(/[\x80-\xff]/, '')
        .substr(0, 150);
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
