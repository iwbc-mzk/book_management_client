function getValue(object, key) {
  if (!object) {
    return '';
  }

  if (!object[key]) {
    return '';
  }

  return object[key];
}

export {
  getValue,
};
