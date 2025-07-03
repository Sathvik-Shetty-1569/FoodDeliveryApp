import { Colors } from "@unistyles/Constants";
import { FC, ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
    children: ReactNode;
    style ?:ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <View style={[style, { flex: 1 }]}>
            <SafeAreaView/>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    }
})

export default CustomSafeAreaView;