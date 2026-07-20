import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const DocumentSkeleton = () => {
  return (
    <Container variant="vertical" className="w-screen items-center justify-center gap-2">
      <Skeleton className="h-24 w-[395px]" />
      <Skeleton className="h-24 w-[395px]" />
      <Skeleton className="h-24 w-[395px]" />
    </Container>
  );
};
