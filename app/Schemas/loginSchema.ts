import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("L'adresse fournie n'est pas valide")
    .required('Vous devez renseigner une adresse'),
  password: Yup.string().required('Le mot de passe est requis'),
});
