import { useAccess } from "@poool/react-native-access";
import { Text } from "react-native";

const Released = () => {
    const { released } = useAccess();

    return <Text>{ JSON.stringify(released) }</Text>
}

export default Released;