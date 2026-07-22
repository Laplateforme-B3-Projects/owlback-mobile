import { Platform, Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import useUserStore from '@/hook/store/useUserStore';
import { AppLayout } from '@/app/Layout/AppLayout';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import { Container } from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { GlassView } from 'expo-glass-effect';
import { cn } from '@/lib/utils';
import { ReactNode, useMemo, useState } from 'react';
import { MiniGraph } from '@/components/custom/MiniGraph';
import { Separator } from '@/components/ui/separator';
import { AnimateSlideWrapper } from '@/components/animate/AnimateSlideWrapper';
import { styles } from '@/utils/styles';
import { DashboardData, OwlbackFile } from '@/utils/type';
import { useDashboard } from '@/hook/useDashboard';
import { NotFound } from '@/components/custom/NotFound';
import { router } from 'expo-router';
import { DocumentCard } from '@/components/custom/Documents/DocumentCard';
import { useDocument } from '@/hook/useDocument';
import { LinesSkeleton } from '@/components/custom/Skeleton/LinesSkeleton';
import { CircleSkeleton } from '@/components/custom/Skeleton/CircleSkeleton';
import { DocumentSkeleton } from '@/components/custom/Skeleton/DocumentSkeleton';
import { DocumentInformationsSkeleton } from '@/components/custom/Skeleton/DocumentInformationsSkeleton';
import { PieChart } from 'react-native-gifted-charts';
import { CategoryColorMapping, CategoryType, CategoryTypeMapping } from '@/utils/enum';

export default function DashboardScreen() {
  const user = useUserStore((state) => state.user);
  const { dashboardData, isLoading, refetch } = useDashboard();
  const { lastUploadedDocs, isLoading: isDocumentLoading } = useDocument();

  return (
    <AppLayout onRefresh={refetch}>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-5 px-4 py-20">
        <AnimateSlideWrapper>
          <CustomAvatar username={user?.fullname} onPress={() => router.push('/settings')} />
        </AnimateSlideWrapper>

        <Container variant="vertical">
          <AnimateSlideWrapper>
            <Text className="font-heading text-center text-5xl">
              Heureux de vous revoir {user?.firstname},
            </Text>
          </AnimateSlideWrapper>
          <AnimateSlideWrapper duration={1000}>
            <Text className="font-heading text-center text-2xl text-[#C5C6C6]">
              Voici un aperçu de votre activité.
            </Text>
          </AnimateSlideWrapper>
        </Container>

        <CustomPressable
          className="mt-6 flex h-32 w-64 flex-col gap-0 overflow-hidden"
          onPress={() => {
            router.push('/expenses');
          }}>
          <Container variant="vertical" className="items-center gap-0 pt-6">
            <Container variant="linear" className="items-center">
              <Text className="text-6xl font-black text-white">{dashboardData?.totalAmount}€</Text>
            </Container>
            <Text className="text-lg text-white"> Voir mes dépenses </Text>
          </Container>

          <MiniGraph height={60} opacity={0.4} width={256} />
        </CustomPressable>

        <Separator className="bg-app-primary" />

        {isLoading ? <LinesSkeleton /> : <NotificationsView />}

        <Separator className="bg-app-primary" />

        {isDocumentLoading ? (
          <>
            <DocumentSkeleton />
            <DocumentInformationsSkeleton />
          </>
        ) : (
          <DashboardDocumentsView
            dashboardData={dashboardData}
            lastUploadedDocs={lastUploadedDocs}
          />
        )}

        <Separator className="bg-app-primary" />

        {isLoading ? <LinesSkeleton /> : <DashboardActivitiesView />}

        {isLoading ? (
          <CircleSkeleton />
        ) : (
          <ChartFeeTypes categories={dashboardData?.categoriesPie ?? []} />
        )}
      </Container>
    </AppLayout>
  );
}

interface CustomPressable {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
}

export const CustomPressable = ({ children, className = '', onPress }: CustomPressable) => {
  const os = Platform.OS;

  return os === 'ios' ? (
    <IosPressable className={className} onPress={onPress}>
      {children}
    </IosPressable>
  ) : (
    <AndroidPressable className={className} onPress={onPress}>
      {children}
    </AndroidPressable>
  );
};

const IosPressable = ({ children, className = '', onPress }: CustomPressable) => {
  return (
    <Pressable onPress={onPress} className={cn(className)}>
      <GlassView glassEffectStyle="clear" style={styles.glassView} isInteractive />
      {children}
    </Pressable>
  );
};

const AndroidPressable = ({ children, className = '', onPress }: CustomPressable) => {
  return (
    <Button variant="ghost" className={cn(className)} onPress={onPress}>
      {children}
    </Button>
  );
};

const NotificationsView = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="font-heading mb-2 text-center text-3xl text-app-secondary">
        Notifications
      </Text>
      <NotFound
        description="Aucun document importé récemment."
        className="h-32 w-full rounded-2xl bg-app-primary"
      />
      <Button variant={'link'} className="p-1">
        <Text className="font-100 text-sm text-app-secondary">Voir Plus</Text>
      </Button>
    </Container>
  );
};

const DashboardDocumentsView = ({
  dashboardData,
  lastUploadedDocs,
}: {
  dashboardData: DashboardData | null;
  lastUploadedDocs: OwlbackFile[];
}) => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="font-heading text-center text-3xl text-[#C5C6C6]">Documents</Text>
      <Container variant="vertical" className="w-full py-3">
        <Text className="text-lg">Derniers documents importés</Text>
        {lastUploadedDocs.length >= 1 ? (
          <Container variant="vertical" className="gap-2">
            {lastUploadedDocs.map((document: OwlbackFile) => (
              <DocumentCard key={`doc-${document.id}`} document={document} />
            ))}
          </Container>
        ) : (
          <NotFound
            description="Aucun document importé récemment."
            className="h-56 w-full rounded-2xl bg-app-primary"
          />
        )}

        <DocumentInformations dashboardData={dashboardData} />
      </Container>
    </Container>
  );
};

const DocumentInformations = ({ dashboardData }: { dashboardData: DashboardData | null }) => {
  return (
    <Container
      variant="linear"
      className="mt-4 h-32 w-full justify-between overflow-hidden rounded-2xl">
      <Container variant="vertical" className="flex-1 items-center justify-center bg-app-primary">
        <Text className="text-3xl font-black">{dashboardData?.documentData.total_documents}</Text>
        <Text className="text-sm">documents</Text>
        <Text className="text-3xl font-black">
          {dashboardData?.documentData.total_documents_monthly}
        </Text>
        <Text className="text-sm">ce mois-ci</Text>
      </Container>
      <Container variant="vertical" className="flex-1 items-center justify-center bg-app-secondary">
        <Text className="text-3xl font-black">
          {dashboardData?.documentData.total_documents_to_process}
        </Text>
        <Text className="text-sm">requiert votre attention</Text>
      </Container>
    </Container>
  );
};

const DashboardActivitiesView = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="font-heading text-center text-3xl text-[#C5C6C6]">Activités</Text>
      <Container variant="vertical" className="w-full py-3">
        <NotFound
          description="Aucune activité récente à afficher."
          className="h-56 w-full rounded-2xl bg-app-primary"
        />
      </Container>
    </Container>
  );
};

const ChartFeeTypes = ({ categories }: { categories: Record<CategoryType, number>[] }) => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="font-heading text-center text-3xl text-[#C5C6C6]">
        Répartition des types de frais
      </Text>
      <Container variant="vertical" className="w-full py-3">
        {categories ? (
          <PieChartData categories={categories} />
        ) : (
          <NotFound
            description="Aucun frais n'a été trouvé pour le moment."
            className="h-56 w-full rounded-2xl bg-app-primary"
          />
        )}
      </Container>
    </Container>
  );
};

const PieChartData = ({ categories }: { categories: Record<CategoryType, number>[] }) => {
  const pieData = useMemo(() => formatCategoriesToChartData(categories), [categories]);
  const [focusedData, setFocusedData] = useState<string>('');

  function formatCategoriesToChartData(categories: Record<CategoryType, number>[]) {
    return Object.entries(categories).map(([key, value]) => ({
      value: value,
      color: CategoryColorMapping[key as CategoryType],
      text: `${CategoryTypeMapping[key as CategoryType]} ${value}`,
      label: CategoryTypeMapping[key as CategoryType],
      // shiftX: 28,
      // shiftY: -28,
    }));
  }

  return (
    <Container variant="vertical" className="items-center">
      <PieChart
        data={pieData}
        donut
        radius={120}
        showGradient
        innerRadius={80}
        innerCircleColor="#0D2E4A"
        onPress={(item) =>
          setFocusedData(
            `${item.label}: ${item.value} ${item.value > 1 ? 'documents' : 'document'}`
          )
        }
        centerLabelComponent={() => (
          <Container>
            <Text className="text-center text-sm text-zinc-50">{focusedData}</Text>
          </Container>
        )}
        strokeWidth={0}
        showTextBackground
        strokeColor="#1E1E2E"
        isAnimated
        animationDuration={800}
        tooltipTextNoOfLines={1}
        focusOnPress
        toggleFocusOnPress
        sectionAutoFocus
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 20,
          gap: 12,
        }}>
        {pieData.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: item.color,
              }}
            />
            <Text style={{ color: '#ccc', fontSize: 13 }}>{item.label}</Text>
          </View>
        ))}
      </View>
    </Container>
  );
};
