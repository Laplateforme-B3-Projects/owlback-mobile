import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';
import { AppLayout } from './Layout/AppLayout';
import { Image, TextInput, View } from 'react-native';
import { Container } from '@/components/custom/Container';
import { Formik } from 'formik';
import { useDocument } from '@/hook/useDocument';
import { importDocumentSchema } from '@/app/Schemas/importDocumentSchema';
import { ArrowRightCircle } from 'lucide-react-native';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';

export default function ImportScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const { importDocument } = useDocument();
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
          initialValues={{ image: uri, name: '', note: '' }}
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
          }) => (
            <View className="flex flex-col items-center gap-3">
              <Container variant="vertical" className="gap-3 px-16">
                <Text>Nom du fichier</Text>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
                />
                {errors.name && touched.name && <Text className="text-red-500">{errors.name}</Text>}
              </Container>
              <Container variant="vertical" className="gap-3 px-16">
                <Text>Note</Text>
                <TextInput
                  onChangeText={handleChange('note')}
                  onBlur={handleBlur('note')}
                  value={values.note}
                  className="h-10 rounded-md bg-[#516079] px-4 text-zinc-50"
                />
                {errors.note && touched.note && <Text className="text-red-500">{errors.note}</Text>}
              </Container>
              <Container variant="vertical">
                {/* {errorAuth && <Text className="text-red-500">{errorAuth}</Text>} */}
                <CustomClassicButton
                  onPress={() => handleSubmit()}
                  description="Importer le document"
                  className="self-start"
                  //isLoading={isLoading}
                  //isDisabled={(!isValid && !!errors) || isLoading}
                />
              </Container>
            </View>
          )}
        </Formik>
      </Container>
    </AppLayout>
  );
}
