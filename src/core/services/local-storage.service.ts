import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageGetItemParams, AsyncStorageSetItemParams } from "../../infrastructure/interfaces/async-storage";

/**
 * Obtiene un valor de AsyncStorage.
 * @param params - Parámetros con la clave y un callback opcional.
 * @returns Una promesa que resuelve con el valor correspondiente o `null`.
 */
export async function getItem({ key }: AsyncStorageGetItemParams): Promise<string | null> {
  try {
    const result = await AsyncStorage.getItem(key);
    return result;
  } catch (error) {
    console.error("error", error)
    throw error;
  }
}

/**
 * Guarda un valor en AsyncStorage.
 * @param params - Parámetros con la clave, el valor y un callback opcional.
 * @returns Una promesa que se resuelve cuando se completa la operación.
 */
export async function setItem({ key, value }: AsyncStorageSetItemParams): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("error", error)
    throw error;
  }
}