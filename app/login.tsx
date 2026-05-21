import React from 'react';
import { loginSchema } from '@/app/Schemas/loginSchema';
import { Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import { Container } from '@/components/custom/Container';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Text } from '@/components/ui/text';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { LOGO } from '@/utils/asset';
import { Separator } from '@/components/ui/separator';
import { ArrowRightCircle } from 'lucide-react-native';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hook/useAuth';
import { Label } from '@/components/ui/label';

export default function LoginScreen() {
  const { login, errorAuth, isLoading } = useAuth();

  return (
    <AppLayout>
      <Container variant="linear" className="items-center justify-center">
        <Image source={LOGO['light']} className="h-32 w-32" resizeMode="contain" />
      </Container>
      <Text variant={'h1'} className="text-[56px] font-black text-app-secondary">
        Connexion
      </Text>

      <Container className="mb-4 h-1 w-full px-10">
        <Separator className="bg-zinc-400" />
      </Container>

      <Formik
        initialValues={{ email: '', password: '', rememberMe: true, acceptTerms: false }}
        validationSchema={loginSchema}
        onSubmit={login}>
        {({
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          touched,
          errors,
        }) => (
          <Container variant="vertical" className="gap-3 px-16">
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
            />
            {errors.email && touched.email && <Text className="text-red-500">{errors.email}</Text>}
            <Text>Mot de passe</Text>

            <TextInput
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
            />

            {errors.password && touched.password && (
              <Text className="text-red-500">{errors.password}</Text>
            )}
            <Container variant="linear" className="items-center gap-3">
              <Checkbox
                iconClassName="bg-app-secondary text-zinc-50"
                checkedClassName="border-app-secondary"
                checked={values.acceptTerms}
                onCheckedChange={() => setFieldValue('acceptTerms', !values.acceptTerms)}
              />
              <Label
                htmlFor="acceptTerms"
                onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}>
                J'accepte les conditions d'utilisations
              </Label>
            </Container>
            {errors.acceptTerms && <Text className="text-red-500">{errors.acceptTerms}</Text>}
            <Container variant="vertical">
              {errorAuth && <Text className="text-red-500">{errorAuth}</Text>}
              <CustomClassicButton
                onPress={() => handleSubmit()}
                description="Se connecter"
                icon={ArrowRightCircle}
                className="self-start"
                isLoading={isLoading}
                isDisabled={(!isValid && !!errors) || isLoading}
              />
            </Container>
          </Container>
        )}
      </Formik>
    </AppLayout>
  );
}
