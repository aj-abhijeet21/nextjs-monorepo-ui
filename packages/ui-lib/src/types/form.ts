import type { Ref } from 'react';

export interface BasicFormBehaviors {
  onSubmit: () => void;
}

// https://react-hook-form.com/api/usecontroller
export interface HookFormFieldProps<T, U> {
  onChange: (arg0: T) => void;
  onBlur: () => void;
  value?: T;
  name: string;
  ref: Ref<U>;
}

export type WithControllableValue<T, U> = Partial<HookFormFieldProps<T, U>>;

export interface WithPlaceholder {
  placeholder?: string;
}

/**
 * @deprecated We will no longer be implementing label in props of core elements
 */
export type WithLabel = {
  label?: string;
};

export type LabelDisplayOption = 'above' | 'beside';

export type FieldSizeOption = 'xs' | 'sm' | 'md' | 'lg';
