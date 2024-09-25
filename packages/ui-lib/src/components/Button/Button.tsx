import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import * as React from 'react';
import { cn } from '../../lib1/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-foreground-disable dark:focus-visible:ring-offset-foreground-dark focus-visible:ring-offset-foreground dark:disabled:text-gray-300 disabled:border-transparent box-border border-transparent disabled:bg-disable-button dark:disabled:bg-disable-button-dark focus-visible:ring-primary',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-foreground hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-dark-hover  dark:text-foreground-dark',
        secondary:
          'bg-foreground dark:bg-foreground-dark border border-secondary-border dark:border-secondary-dark-border text-secondary-foreground hover:bg-secondary-hover  dark:hover:bg-secondary-dark-hover dark:text-foreground',
        tertiary:
          'bg-foreground disabled:bg-foreground text-primary hover:bg-tertiary-hover dark:hover:bg-tertiary-dark-hover dark:bg-foreground-dark dark:disabled:bg-foreground-dark dark:text-primary-dark focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-inset',
        positive:
          'bg-positive text-foreground hover:bg-positive-hover focus-visible:ring-positive dark:bg-positive-dark dark:hover:bg-positive-dark-hover dark:focus-visible:ring-positive-dark dark:text-foreground-dark',
        negative:
          'bg-negative text-foreground hover:bg-negative-hover focus-visible:ring-negative dark:bg-negative-dark dark:hover:bg-negative-dark-hover dark:focus-visible:ring-negative-dark dark:text-foreground-dark',
        link: 'text-primary underline-offset-4 hover:underline',
        plain: 'text-black bg-white border border-gray-300 hover:bg-gray-100',
      },
      icon: {
        true: 'size-fit',
      },
      size: {
        sm: 'py-[6px] px-3',
        lg: 'py-2 px-4',
      },
      hasStartIcon: {
        true: 'pl-0',
      },
      hasEndIcon: {
        true: 'pr-0',
      },
    },
    compoundVariants: [
      { icon: true, size: 'sm', className: 'p-[6px]' },
      { icon: true, size: 'lg', className: 'p-2' },
      { icon: true, variant: 'secondary', size: 'sm', className: 'p-[5px]' },
      { icon: true, variant: 'secondary', size: 'lg', className: 'p-[7px]' },
      {
        icon: true,
        variant: 'tertiary',
        className:
          'text-gray-500 hover:text-primary dark:hover:text-primary-dark dark:text-gray-200 ',
      },
      {
        icon: true,
        variant: 'secondary',
        className: 'text-gray-500 dark:text-gray-200 ',
      },
      { hasStartIcon: true, size: 'lg', className: 'pl-2' },
      { hasStartIcon: true, size: 'sm', className: 'pl-[6px]' },
      { hasEndIcon: true, size: 'lg', className: 'pr-2' },
      { hasEndIcon: true, size: 'sm', className: 'pr-[6px]' },
      {
        variant: 'secondary',
        icon: false,
        size: 'sm',
        className: 'py-[5px] px-[11px]',
      },
      {
        variant: 'secondary',
        icon: false,
        size: 'lg',
        className: 'py-[7px] px-[15px]',
      },
      {
        hasStartIcon: true,
        size: 'lg',
        variant: 'secondary',
        className: 'pl-[7px]',
      },
      {
        hasStartIcon: true,
        size: 'sm',
        variant: 'secondary',
        className: 'pl-[5px]',
      },
      {
        hasEndIcon: true,
        size: 'lg',
        variant: 'secondary',
        className: 'pr-[7px]',
      },
      {
        hasEndIcon: true,
        size: 'sm',
        variant: 'secondary',
        className: 'pr-[5px]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  title?: string;
  starticon?: React.ReactNode;
  endicon?: React.ReactNode;
  role?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, icon, title, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const hasStartIcon = props.starticon ? true : false;
    const hasEndIcon = props.endicon ? true : false;
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            icon,
            size,
            className,
            hasStartIcon,
            hasEndIcon,
          })
        )}
        ref={ref}
        {...props}
        role={props.role ?? 'button'}
      >
        {props.starticon && (
          <span className={clsx('flex', size == 'lg' ? 'pr-2' : 'pr-[6px]')}>
            {props.starticon}
          </span>
        )}
        <Slottable>{props.children ?? title}</Slottable>
        {props.endicon && (
          <span className={clsx('flex', size == 'lg' ? 'pl-2' : 'pl-[6px]')}>
            {props.endicon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
