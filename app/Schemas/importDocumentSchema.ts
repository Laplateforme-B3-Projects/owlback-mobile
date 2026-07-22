import * as Yup from 'yup';

export const importDocumentSchema = Yup.object().shape({
  file: Yup.object().shape({
    uri: Yup.string().required("L'URI du fichier fourni n'a pas pu être récupérée."),
    type: Yup.string().required("L'extension du fichier est inconnue."),
    name: Yup.string().required('Le nom du fichier est introuvable.'),
  }),
  name: Yup.string().nullable(),
  note: Yup.string().nullable(),
});
