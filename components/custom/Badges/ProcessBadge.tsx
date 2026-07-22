import { Archive, CircleAlert, CircleCheck, Clock3, TriangleAlert } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { DocumentStatusEnum, DocumentStatusMapping } from '@/utils/enum';

export const ProcessBadge = ({ status }: { status: DocumentStatusEnum }) => (
  <Badge className={cn('h-7 max-w-48 rounded-sm', processStyles[status])}>
    {processIcon[status]}
    <Text className="text-md text-zinc-50">{DocumentStatusMapping[status] ?? 'Inconnu'}</Text>
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
  [DocumentStatusEnum.ARCHIVED]: <Archive color={'#FFFFFF'} />,
  [DocumentStatusEnum.FAILED]: <CircleAlert color={'#FFFFFF'} />,
  [DocumentStatusEnum.PROCESSED]: <CircleCheck color={'#FFFFFF'} />,
  [DocumentStatusEnum.WAITING]: <Clock3 color={'#FFFFFF'} />,
  [DocumentStatusEnum.WARNING]: <TriangleAlert color={'#FFFFFF'} />,
};
