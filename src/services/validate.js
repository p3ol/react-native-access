export const validateEmail = (val = '') =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    .test(val.slice(0, 255));

export const validateDate = (val = '', format = 'dd/mm/yyyy') => {
  switch (format) {
    case 'mm/dd/yyyy':
      return /^(0[1-9]|[1][0-2])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]((19|20)\d\d)$/g
        .test(val);
    case 'yyyy/mm/dd':
      return /^((19|20)\d\d)[- /.](0[1-9]|[1][0-2])[- /.](0[1-9]|[12][0-9]|3[01])$/g
        .test(val);
    default: // dd/mm/yyyy
      return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|[1][0-2])[- /.]((19|20)\d\d)$/g
        .test(val);
  }
};

export const validateCreditCard = (val = {}) => {
  return (!val?.number.value &&
  !val.exp_month.value &&
  !val.exp_year.value &&
  !val.cvc.value) ||
  (val?.number.valid &&
  val.exp_month.valid &&
  val.exp_year.valid &&
  val.cvc.valid);
};
