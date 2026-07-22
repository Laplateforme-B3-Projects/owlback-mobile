import { LucideIcon, SearchX } from "lucide-react-native";
import { Text } from '@/components/ui/text';
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/custom/Container";
import { cn } from "@/lib/utils";

interface NotFoundProps {
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export const NotFound = ({
  icon = SearchX,
  description = '',
  className,
}: NotFoundProps) => {
  return (
    <Container className={cn("items-center justify-center", className)}>
        {icon && <Icon as={icon} size={48} />}
        {description && <Text className="text-base font-medium text-zinc-300 italic">{description}</Text>}
    </Container>
  );
};
