import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const DocumentInformationsSkeleton = () => {
  return (
     <Container
      variant="linear"
      className="h-32 w-full justify-center items-center overflow-hidden rounded-2xl gap-1">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </Container>
  );
};
