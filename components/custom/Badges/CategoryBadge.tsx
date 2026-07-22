import {
  BedDouble,
  Beef,
  CalendarDays,
  Car,
  CarFront,
  ClipboardList,
  Fuel,
  GraduationCap,
  Landmark,
  MonitorCog,
  Package,
  ParkingCircle,
  PenLine,
  Phone,
  Wifi,
  Wrench,
  BadgeEuro,
  HandCoins,
  Plane,
  FileQuestion,
} from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { CategoryType, CategoryTypeMapping } from '@/utils/enum';

export const CategoryBadge = ({ category }: { category: CategoryType }) => (
  <Badge className={cn('h-8 w-8 rounded-sm', 'bg-blue-800 text-zinc-50')}>
    {categoryIcon[category]}
  </Badge>
);

export const categoryIcon: Record<CategoryType, ReactNode> = {
  [CategoryType.ACCOMMODATION]: <BedDouble color={'#FFFFFF'} />,
  [CategoryType.ADMINISTRATIVE_FEES]: <ClipboardList color={'#FFFFFF'} />,
  [CategoryType.BANK_FEES]: <Landmark color={'#FFFFFF'} />,
  [CategoryType.EQUIPMENT]: <Wrench color={'#FFFFFF'} />,
  [CategoryType.EVENT]: <CalendarDays color={'#FFFFFF'} />,
  [CategoryType.FUEL]: <Fuel color={'#FFFFFF'} />,
  [CategoryType.INTERNET]: <Wifi color={'#FFFFFF'} />,
  [CategoryType.IT]: <MonitorCog color={'#FFFFFF'} />,
  [CategoryType.MEALS]: <Beef color={'#FFFFFF'} />,
  [CategoryType.MISCELLANEOUS]: <Package color={'#FFFFFF'} />,
  [CategoryType.OFFICE_SUPPLIES]: <PenLine color={'#FFFFFF'} />,
  [CategoryType.PARKING]: <ParkingCircle color={'#FFFFFF'} />,
  [CategoryType.PAID_SERVICE]: <BadgeEuro color={'#FFFFFF'} />,
  [CategoryType.PERSONAL_VEHICLE]: <Car color={'#FFFFFF'} />,
  [CategoryType.RENTAL_VEHICLE]: <CarFront color={'#FFFFFF'} />,
  [CategoryType.TELEPHONY]: <Phone color={'#FFFFFF'} />,
  [CategoryType.TOLL]: <HandCoins color={'#FFFFFF'} />,
  [CategoryType.TRAINING]: <GraduationCap color={'#FFFFFF'} />,
  [CategoryType.TRANSPORT]: <Plane color={'#FFFFFF'} />,
  [CategoryType.ALL]: null,
  [CategoryType.UNKNOWN]: <FileQuestion color={'#FFFFFF'} />,
};
