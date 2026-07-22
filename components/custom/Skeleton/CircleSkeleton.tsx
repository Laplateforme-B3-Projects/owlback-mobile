import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const CircleSkeleton = () => {
  return (
    <Container variant="vertical" className="w-screen items-center justify-center gap-4">
      <Skeleton className="h-64 w-64 rounded-full" />
    </Container>
  );
};
