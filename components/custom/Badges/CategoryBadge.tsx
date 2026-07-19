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
import { cn } from '@/lib/utils';
import { CategoryType, CategoryTypeMapping } from '@/utils/enum';

export const CategoryBadge = ({ category }: { category: CategoryType }) => (
    <Badge className={cn('min-w-15 rounded-sm', 'bg-blue-800 text-zinc-50')}>
        {categoryIcon[category]}
        {CategoryTypeMapping[category] ?? 'Inconnu'}
    </Badge>
);

export const categoryIcon: Record<CategoryType, ReactNode> = {
    [CategoryType.ACCOMMODATION]: <BedDouble />,
    [CategoryType.ADMINISTRATIVE_FEES]: <ClipboardList />,
    [CategoryType.BANK_FEES]: <Landmark />,
    [CategoryType.EQUIPMENT]: <Wrench />,
    [CategoryType.EVENT]: <CalendarDays />,
    [CategoryType.FUEL]: <Fuel />,
    [CategoryType.INTERNET]: <Wifi />,
    [CategoryType.IT]: <MonitorCog />,
    [CategoryType.MEALS]: <Beef />,
    [CategoryType.MISCELLANEOUS]: <Package />,
    [CategoryType.OFFICE_SUPPLIES]: <PenLine />,
    [CategoryType.PARKING]: <ParkingCircle />,
    [CategoryType.PAID_SERVICE]: <BadgeEuro />,
    [CategoryType.PERSONAL_VEHICLE]: <Car />,
    [CategoryType.RENTAL_VEHICLE]: <CarFront />,
    [CategoryType.TELEPHONY]: <Phone />,
    [CategoryType.TOLL]: <HandCoins />,
    [CategoryType.TRAINING]: <GraduationCap />,
    [CategoryType.TRANSPORT]: <Plane />,
    [CategoryType.ALL]: null,
    [CategoryType.UNKNOWN]: <FileQuestion />,
};
