/**
 * Parámetros para obtener un ítem de AsyncStorage.
 */
export interface AsyncStorageGetItemParams {
  key: string;
  callback?: (error?: Error | null, result?: string | null) => void;
}

/**
 * Parámetros para guardar un ítem en AsyncStorage.
 */
export interface AsyncStorageSetItemParams {
  key: string;
  value: string;
  callback?: (error?: Error | null) => void;
}

/**
 * Parámetros para eliminar un ítem de AsyncStorage.
 */
export interface AsyncStorageRemoveItemParams {
  key: string;
  callback?: (error?: Error | null) => void;
}