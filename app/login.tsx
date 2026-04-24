import React from 'react';
import { Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import { loginSchema } from '@/app/Schemas/loginSchema';
import { Container } from '@/components/custom/Container';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Text } from '@/components/ui/text';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { LOGO } from '@/utils/asset';
import { Separator } from '@/components/ui/separator';
import { ArrowRightCircle } from 'lucide-react-native';

export default function LoginScreen() {
  return (
    <AppLayout>
      <Container variant="linear" className="items-center justify-center">
        <Image source={LOGO['light']} className="h-32 w-32" resizeMode="contain" />
      </Container>
      <Text variant={'h1'} className="text-[56px] font-black text-app-secondary">
        Connexion
      </Text>
      <Separator className="mb-4 bg-zinc-400" />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Container variant="vertical" className="gap-3">
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
            />
            <Text>Mot de passe</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
            />
            <Text>J'accepte les conditions d'utilisations</Text>
            <Container variant="vertical">
              <CustomClassicButton
                onPress={() => handleSubmit()}
                description="Se connecter"
                icon={ArrowRightCircle}
                className="self-start"
              />
            </Container>
          </Container>
        )}
      </Formik>
    </AppLayout>
  );
}
