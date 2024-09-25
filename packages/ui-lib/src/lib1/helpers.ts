import { createContext } from 'react';

/**
 *  Get the value for a property if provided, otherwise return the value of a default property
 */
export function get<T>(
  genericObject: T,
  defaultKey: keyof T,
  key?: keyof T
): T[keyof T] {
  if (key) {
    return genericObject[key];
  } else {
    return genericObject[defaultKey];
  }
}

/**
 *  Creates a simple ID context
 */
export const IdContext = createContext<string>('');
