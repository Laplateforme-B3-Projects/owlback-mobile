import {
    Archive,
    CircleAlert,
    CircleCheck,
    Clock3,
    TriangleAlert,
} from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { DocumentStatusEnum, DocumentStatusMapping } from '@/utils/enum';

export const ProcessBadge = ({
    category,
}: {
    category: DocumentStatusEnum;
}) => (
    <Badge className={cn('max-w-48 h-7 rounded-sm', processStyles[category])}>
        {processIcon[category]}
        <Text className="text-zinc-50 text-md">{DocumentStatusMapping[category] ?? 'Inconnu'}</Text>
    </Badge>
);

const processStyles: Record<DocumentStatusEnum, string> = {
    [DocumentStatusEnum.ARCHIVED]: 'bg-purple-500 text-zinc-50',
    [DocumentStatusEnum.FAILED]: 'bg-red-500 text-zinc-50',
    [DocumentStatusEnum.PROCESSED]: 'bg-green-600 text-zinc-50',
    [DocumentStatusEnum.WAITING]: 'bg-gray-500 text-zinc-50',
    [DocumentStatusEnum.WARNING]: 'bg-yellow-600 text-zinc-50',
};
const processIcon: Record<DocumentStatusEnum, ReactNode> = {
    [DocumentStatusEnum.ARCHIVED]: <Archive />,
    [DocumentStatusEnum.FAILED]: <CircleAlert />,
    [DocumentStatusEnum.PROCESSED]: <CircleCheck />,
    [DocumentStatusEnum.WAITING]: <Clock3 />,
    [DocumentStatusEnum.WARNING]: <TriangleAlert />,
};
