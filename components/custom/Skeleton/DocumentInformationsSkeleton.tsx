import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const DocumentInformationsSkeleton = () => {
  return (
    <Container
      variant="linear"
      className="h-32 w-full items-center justify-center gap-1 overflow-hidden rounded-2xl">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </Container>
  );
};
