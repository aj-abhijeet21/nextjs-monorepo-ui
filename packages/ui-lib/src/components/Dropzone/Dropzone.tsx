import { Upload } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { useCallback, useId, type ComponentType } from 'react';
import {
  type Accept,
  type DropEvent,
  type DropzoneOptions,
  type FileRejection,
  useDropzone,
} from 'react-dropzone';
import type {
  FieldSizeOption,
  WithClassName,
  WithControllableValue,
  WithTitleOrLabel,
} from '../../types';
import { Label } from '../Label/Label';

/**
 * Note:
 * The usual `value` prop is not allowed because Dropzone only receives files from the user
 *   and react has no concept of File as an input value
 *
 * Optional:
 * @param onChange (file, rejections) onChange contains an additional fileRejection parameter
 * @param accept (Accept) an object like { 'MIME type': ['.ext1', '.ext2', ...] }, eg. { 'image/*': [] }
 * @param cta (string) Call to action, default "Upload a file" or "Upload files" depending on allowMultiple
 * @param ctaSuffix (string) Alternative to cta, default "or drag and drop"
 * @param helperText (string) Subtext for upload, eg. file size or extensions
 * @param size (FieldSizeOption)
 * @param Icon (ComponentType) an alternative to the default upload icon. Prop should have its own styles/size
 * @param maxFiles (number) how many files to allow. Defaults to 0 for unlimited
 * @param dropzoneOptions (DropzoneOptions) config object for react-dropzone
 * @param disabled (boolean) disable input
 */
type DropzoneProps = WithTitleOrLabel &
  WithClassName &
  Omit<
    WithControllableValue<File[], HTMLInputElement>,
    'value' | 'onChange'
  > & {
    onChange?: (arg0: File[], arg1: FileRejection[]) => void;
    accept?: Accept;
    cta?: string;
    ctaSuffix?: string;
    helperText?: string;
    size?: FieldSizeOption;
    error?: string;
    suggestion?: string;
    Icon?: ComponentType;
    maxFiles?: number;
    dropzoneOptions?: DropzoneOptions;
    disabled?: boolean;
  };

/**
 * Dropzone accepts file uploads from the user. Provide `dropzoneOptions` to override defaults.
 *
 * Default behavior:
 * - Treat value as a File[] array (single file at value[0])
 * - Medium display size
 * - Allow any number of files (limit using `maxFiles: n`)
 * - Ignore file rejections and the drop event for onDrop()
 *
 * Note that `maxFiles: 1` value will override `dropzoneOptions: { multiple: true }`
 */
export const Dropzone = ({
  size = 'md',
  maxFiles = 0,
  disabled,
  error,
  ...props
}: DropzoneProps) => {
  const id = useId();
  const name = props.name ?? id;
  const label = props.title ?? props.label;
  const hasDescription = !!error || !!props.suggestion;
  const multiple =
    maxFiles === 0 || maxFiles > 1 || props.dropzoneOptions?.multiple;
  const cta = props.cta ?? (multiple ? 'Upload files' : 'Upload a file');
  const ctaSuffix = props.ctaSuffix ?? 'or drag and drop';
  const onChange = props.onChange;
  const onDropProp = props.dropzoneOptions?.onDrop;
  const onDrop = useCallback(
    (files: File[], rejections: FileRejection[], event: DropEvent) => {
      onDropProp?.(files, rejections, event);
      onChange?.(files, rejections);
    },
    [onDropProp, onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    multiple: multiple,
    disabled: disabled,
    maxFiles: maxFiles,
    ...props.dropzoneOptions,
  });

  return (
    <div className={clsx(props.className, 'space-y-2')}>
      {label && <Label title={label} htmlFor={id} />}
      <div
        className={dropArea({ size, isDragActive, disabled, error })}
        {...getRootProps()}
      >
        <div className={innerWrapper(size)}>
          <span className={uploadIcon(size)}>
            {props.Icon ? (
              <props.Icon />
            ) : (
              <Upload className="icon-lg text-zinc-400" />
            )}
          </span>
          <div className={textContent(size, disabled)}>
            <span className={ctaWrapper(disabled)}>{cta}</span>
            <input
              id={name}
              name={name}
              data-testid={name}
              type="file"
              className="sr-only"
              multiple={multiple}
              disabled={disabled}
              {...getInputProps()}
            />
            <span className="pl-1">{ctaSuffix}</span>
            <div className={helperText(size, !!props.helperText?.length)}>
              {props.helperText}
            </div>
          </div>
        </div>
      </div>
      {hasDescription && (
        <p className={description({ size, error })} id={`${id}-description`}>
          {error ?? props.suggestion}
        </p>
      )}
    </div>
  );
};

const dropArea = ({
  size,
  isDragActive,
  disabled,
  error,
}: Partial<DropzoneProps> & { isDragActive: boolean }) =>
  clsx(
    `
  group
  flex
  max-w-lg
  justify-center
  rounded-xl
  border-2
  border-dashed
  p-6
  focus-within:outline-none
  focus-within:ring
  focus-within:ring-pink-500
  hover:cursor-pointer
  hover:border-zinc-200
  hover:bg-zinc-50
  dark:hover:border-zinc-400
  dark:hover:bg-zinc-50/10
`,
    isDragActive &&
      `
    border-pink-600
    bg-pink-50
    dark:border-pink-600
    dark:bg-pink-300/10
  `,
    size === 'xs' &&
      `
    w-16
    border
    p-2
    pb-1
`,
    size === 'sm' && 'max-w-xs p-4',
    size === 'lg' &&
      `
    max-w-full
    border-4
    p-12
  `,
    error ? 'border-error' : 'border-zinc-300 dark:border-zinc-500',
    disabled &&
      `
    pointer-events-none
    bg-zinc-100
    dark:bg-zinc-600
    `
  );

const innerWrapper = (size: FieldSizeOption) =>
  clsx('text-center', ['md', 'lg'].includes(size) && 'space-y-1');

const uploadIcon = (size: FieldSizeOption) =>
  clsx(
    'mx-auto inline-block',
    size === 'xs' && 'scale-50',
    size === 'sm' && 'scale-75'
  );

const textContent = (size: FieldSizeOption, disabled?: boolean) =>
  clsx(
    `
  text-zinc-600
  dark:text-white
`,
    size === 'xs' && `hidden`,
    size === 'sm' && `flex flex-col text-sm`,
    size === 'lg' && 'text-lg',
    disabled &&
      `
    opacity-60
    `
  );

const ctaWrapper = (disabled?: boolean) =>
  clsx(
    `
  relative
  cursor-pointer
  rounded-md
  font-medium
  text-pink-600
  focus-within:outline-none
  focus-within:ring-2
  focus-within:ring-pink-500
  focus-within:ring-offset-2
  group-hover:text-pink-500
  `,
    disabled &&
      `
    text-zinc-400
    dark:text-zinc-300
    `
  );

const helperText = (size: FieldSizeOption, show?: boolean) =>
  clsx(
    size !== 'sm' && show
      ? 'pt-2 text-xs text-gray-500 dark:text-gray-400'
      : 'hidden'
  );

const description = ({ size, error }: Partial<DropzoneProps>) =>
  clsx(
    `
    block
    max-w-lg
    text-sm
  `,
    (size === 'xs' || size === 'sm') && 'max-w-xs',
    size === 'lg' && 'max-w-2xl',
    error ? 'text-error' : 'text-zinc-800 dark:text-zinc-200'
  );
