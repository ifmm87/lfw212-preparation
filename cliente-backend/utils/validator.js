const hasOwnProperty = (o, p) => {
  return Object.prototype.hasOwnProperty.call(o, p);
};

const validationDataCustomer = (o) => {
  let valid = o!== null && typeof o ==='object';
  valid = valid && hasOwnProperty(o, 'firstName');
  valid = valid && hasOwnProperty(o, 'lastName');
  valid = valid && hasOwnProperty(o, 'nroDoc');
  valid = valid && typeof o.firstName === 'string';
  valid = valid && typeof o.lastName === 'string';
  return valid && o;
};

const isIdValid = (id) => {
  return Number.isInteger(Number.parseInt(id));
}

module.exports = { isIdValid, validationDataCustomer };


