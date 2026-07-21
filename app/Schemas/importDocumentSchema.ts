import * as Yup from 'yup';

export const importDocumentSchema = Yup.object().shape({
  image: Yup.string().required('Une image doit etre fournie'),
  name: Yup.string().nullable(),
  note: Yup.string().nullable(),
});
