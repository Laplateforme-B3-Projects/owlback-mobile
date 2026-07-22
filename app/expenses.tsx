import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/app/Layout/AppLayout';

import { BarChart } from "react-native-gifted-charts";

export default function ExpensesScreen() {
  const data=[{value:50},{value:55},{value:60},{value:120}]
  return (
    <AppLayout showHeader>
      <View>
      	<Text>les dépenses</Text>
        <BarChart data = {data}/>
      </View>
    </AppLayout>
  );
}