import * as Yup from 'yup';

const yearValidation = Yup.number().min(2000, 'Min. year is 2000').max(2021, 'Max. year is 2021');

const rateValidation = Yup.number().min(1, 'Min. number is one').max(10, 'Max. number is ten');

const validationSchema = Yup.object({
  network: Yup.string().required('This field is required'),
  yearMin: yearValidation,
  rateMin: rateValidation
});

export default validationSchema;
