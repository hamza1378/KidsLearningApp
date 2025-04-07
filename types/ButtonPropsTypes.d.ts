export default interface ButtonPropsType{
    title: string;
    showAnimatedHand?: boolean;
    onPress?: () => void;
    disabled?: boolean;
    size?: small | medium | large;
    style?: ViewStyle | TextStyle; 
};