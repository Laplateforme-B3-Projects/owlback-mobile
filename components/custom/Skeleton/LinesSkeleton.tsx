import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const LinesSkeleton = () => {
  return (
    <Container variant="vertical" className="w-screen items-center gap-4">
      <Container className="w-full gap-2 px-3">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </Container>
    </Container>
  );
};
