import { View } from 'react-native';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserStore from '@/hook/store/useUserStore';
import useToken from '@/hook/useToken';
import { Text } from '@/components/ui/text';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import { ForkKnife } from 'lucide-react-native';

export default function ExpensesScreen() {
  const { getToken, deleteToken } = useToken();
  const user = useUserStore((state) => state.user);
  const data=[ {value:30},{value:32}, {value:43}, {value:60}, {value:70}, {value:50}, {value:45}, {value:65}, {value:50}, {value:45} ];
  const { width, height } = Dimensions.get("window");

  return (
    <AppLayout showHeader>
      <View>
        <SafeAreaView className="mt-10">
          <Container variant="vertical" className="min-h-full pt-10 items-center">
            <Text className='text-4xl font-black'>Mes Dépenses</Text>
            <LineChart
              data={data}
              areaChart
              width={width+19}
              adjustToWidth
              height={height-400}
              hideYAxisText
              hideRules
              hideAxesAndRules
              hideOrigin
              initialSpacing={0}
              endSpacing={0}
              thickness={5}
              dataPointsRadius={7}
              

              color="#ff6d00"
              dataPointsColor="#ff6d00"

              startFillColor="#ff6d00"
              endFillColor="#ff6d00"
              startOpacity={0.20}
              endOpacity={0.0}

              pointerConfig={{
                pointerStripHeight: 0,
                pointerStripColor: "transparent",
                pointerColor: "#FF6D00",
                radius: 4,

                pointerLabelComponent: (items: any) => (
                    <Container
                      variant='linear'
                      className='bg-zinc-500 min-w-4! max-w-8! p-2'
                    >
                      <Text className='font-sm'>
                        {items[0].value.toFixed(2)} €
                      </Text>
                    </Container>
                ),
              }}
            />
          <Svg width={width} height={4}>
            <Line
              x1="0"
              y1="2"
              x2="100%"
              y2="2"
              stroke="#ff6d00"
              strokeWidth={3}
              strokeDasharray="8 4"
            />
          </Svg>
          <Container className='w-full pt-5 px-4'>
            <Text className='text-zinc-500'>Dépense selectionnée:</Text>
            <Container variant='linear' className='justify-between'>
              <Container variant='linear'>
                <ForkKnife color='#ffffff' size={32}/>
                <Text className='text-xl font-bold ml-4'>Restauration</Text>
              </Container>
              <Text>Montant: 50.00€</Text>
            </Container>
          </Container>
          </Container>
        </SafeAreaView>
      </View>
    </AppLayout>
  );
}
