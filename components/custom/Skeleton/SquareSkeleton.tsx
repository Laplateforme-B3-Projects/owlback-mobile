import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const SquareSkeleton = () => {
  return (
    <Container variant="vertical" className="w-screen items-start justify-center gap-4">
      <Skeleton className="h-[500px] w-[403px]" />
    </Container>
  );
};
