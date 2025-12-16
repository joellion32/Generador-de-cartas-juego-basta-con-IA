import { StyleSheet } from "react-native";

export interface ThemeColors {
  primary: string;
  secondary?: string;
  tertiary?: string;
  text: string;
  background: string;
  iconBackground?: string;
  cardBackground: string;
  buttonTextColor: string;
}

export const colors: ThemeColors = {
  primary: "#ED2740",
  secondary: "#6B2F2F",
  tertiary: "#808080",
  text: "white",
  background: "#891d1dff",
  cardBackground: "#F7F3F9",
  iconBackground: "#F4F4F4",
  buttonTextColor: "white",
};


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        color: colors.text,
        textAlign: "center",    
        fontSize: 25,
        fontWeight: "bold", 
    },
    subTitle: {
        color: colors.text,
        textAlign: "center",    
        fontSize: 25,
        fontWeight: "bold", 
    },
    textBoxInput: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold"
    }
});