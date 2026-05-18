import { View } from "react-native";
import { Text } from "@/components/ui/text";
import useUserStore from "@/hook/store/useUserStore";

export default function LoginScreen() {
    const user = useUserStore((state) => state.user);

    return (
        <View>
            <Text>Ravi de vous revoir {user?.fullname}</Text>
        </View>
    );
}
