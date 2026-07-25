import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';
import { AppLayout } from './Layout/AppLayout';
import { Image, TextInput, View } from 'react-native';
import { Container } from '@/components/custom/Container';
import { Formik } from 'formik';
import { useDocument } from '@/hook/useDocument';
import { importDocumentSchema } from '@/app/Schemas/importDocumentSchema';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { getBaseFilename } from '@/utils/utils';

export default function ImportScreen() {
  const { uri, filename, mime } = useLocalSearchParams<{
    uri: string;
    filename: string;
    mime: string;
  }>();
  const { importDocument, isLoading } = useDocument();
  return (
    <AppLayout showHeader>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-1 px-4 py-20">
        <Image
          source={{ uri: uri }}
          style={{ minHeight: 500, width: '100%' }}
          resizeMode="contain"
        />
        <Formik
          initialValues={{
            file: {
              uri: uri,
              type: mime,
              name: filename,
            },
            name: getBaseFilename(filename),
            note: '',
          }}
          validationSchema={importDocumentSchema}
          onSubmit={importDocument}>
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            touched,
            errors,
          }) => {
            return (
              <Container className="flex flex-col items-center gap-6 pt-6">
                <Container variant="vertical" className="w-screen gap-2 px-16">
                  <Text>Nom du fichier</Text>
                  <TextInput
                    placeholder="Business meal"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
                  />
                  {errors.name && touched.name && (
                    <Text className="text-red-500">{errors.name}</Text>
                  )}
                </Container>
                <Container variant="vertical" className="w-screen gap-2 px-16">
                  <Text>Note</Text>
                  <TextInput
                    placeholder="Repas dans le cadre d'un séminaire"
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                    value={values.note}
                    className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
                  />
                  {errors.note && touched.note && (
                    <Text className="text-red-500">{errors.note}</Text>
                  )}
                </Container>
                <Container variant="vertical">
                  <CustomClassicButton
                    onPress={handleSubmit}
                    description="Importer le document"
                    className="self-start"
                    isLoading={isLoading}
                    isDisabled={(!isValid && !!errors) || isLoading}
                  />
                </Container>
              </Container>
            );
          }}
        </Formik>
      </Container>
    </AppLayout>
  );
}
