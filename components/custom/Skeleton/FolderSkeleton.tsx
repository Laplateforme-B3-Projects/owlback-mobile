import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '../Container';

export const FolderSkeleton = () => {
  return (
    <Container variant="vertical" className="w-screen items-center justify-center gap-4">
      <UniqueSkeleton/>
      <UniqueSkeleton/>
      <UniqueSkeleton/>
    </Container>
  );
};

const UniqueSkeleton = () => (
     <Container variant="linear" className="w-screen items-center justify-start gap-2">
        <Skeleton className="h-8 w-8 " />
        <Skeleton className="h-3 w-64 rounded-full" />
     </Container>
)