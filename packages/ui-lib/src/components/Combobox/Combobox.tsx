import {
  type AutocompleteValue,
  type FilterOptionsState,
  type UseAutocompleteProps,
  useAutocomplete,
} from '@mui/base/useAutocomplete';
import {
  CaretDown as ArrowDropDownIcon,
  X as ClearIcon,
  Spinner as LoadingIcon,
  Check as SelectedIcon,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { useCallback } from 'react';
import { Button } from '../Button/Button';
import { Chip } from '../Chip/Chip';

type ComboboxProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
  placeholder?: string;
  /** When options is an async result, pass `loading: true` to show a spinner */
  loading?: boolean;
  /** Shortcut for filtering on several fields where T[searchKey] = `string | number` */
  searchKeys?: (keyof T)[];
  /** Control the empty state text */
  emptyState?: string;
  /** Optionally decorate the field with a preface string or Icon */
  Preface?: React.ReactElement;
  /** Handle onChange event when an item is selected/deselected */
  onSelectedItemChange?: (
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => void;
  /** Shows the checkbox infront of option */
  checkbox?: boolean;
  /** Empty state styles */
  emptyStateClassName?: string;
};

const Combobox = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  inProps: ComboboxProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  const {
    placeholder,
    loading,
    searchKeys,
    Preface,
    autoHighlight = true,
    onSelectedItemChange,
    onChange,
    checkbox = false,
    emptyStateClassName,
    ...props
  } = inProps;

  const filterOptionsByKeys = useCallback(
    (options: T[], state: FilterOptionsState<T>): T[] => {
      return (
        options?.filter((option) =>
          searchKeys?.some((key) =>
            (option[key] as string | number)
              .toString()
              .toLowerCase()
              .includes(state.inputValue.toLowerCase())
          )
        ) || []
      );
    },
    [searchKeys]
  );

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    getTagProps,
    inputValue = props.inputValue,
    dirty,
    id,
    popupOpen,
    focused,
    groupedOptions,
    value = props.value,
  } = useAutocomplete({
    ...props,
    autoHighlight,
    componentName: 'Combobox',
    filterOptions: searchKeys?.length
      ? filterOptionsByKeys
      : props.filterOptions,
    onChange: (event, value, reason) => {
      onChange?.(event, value, reason);
      onSelectedItemChange?.(value);
    },
  });

  const hasClearIcon =
    !props.disableClearable && !props.disabled && dirty && !props.readOnly;

  const emptyState = loading
    ? 'Loading...'
    : props.freeSolo
      ? !!inputValue && 'Press enter to add "' + inputValue + '"'
      : (props.emptyState ?? 'No results');

  const { getOptionLabel } = props;
  /**
   * - If a `getOptionLabel` method has been provided, return its result.
   * - If the item is a string, return as-is.
   * - If the item has a `label`, return the label
   * - Otherwise, return undefined.
   */
  const itemToString = useCallback(
    (item: T): string | undefined =>
      getOptionLabel
        ? getOptionLabel(item)
        : typeof item === 'string'
          ? item
          : (item as { label?: string }).label,
    [getOptionLabel]
  );

  return (
    <div className="relative w-full">
      <div
        {...getRootProps(props)}
        className={inputWrapper(focused, !!props.disabled)}
      >
        {Preface && <div className={clsx(inputControl, 'px-2')}>{Preface}</div>}
        {props.multiple &&
          (value as T[])?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              value={itemToString(item) ?? ''}
              {...getTagProps({ index })}
            />
          ))}
        <input
          id={id}
          disabled={props.disabled}
          readOnly={props.readOnly}
          aria-busy={loading}
          placeholder={placeholder}
          {...getInputProps()}
          className={inputField}
        />
        {loading && popupOpen && (
          <LoadingIcon
            className={clsx(inputIcon, 'animate-spin')}
            data-testid="LoadingSpinner"
          />
        )}
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className={clearButton}
            data-testid="ClearButton"
            aria-label="Clear"
            title="Clear"
          >
            <ClearIcon className={clsx(inputIcon)} />
          </Button>
        )}
        <Button
          {...getPopupIndicatorProps()}
          disabled={props.disabled}
          className={popupButton(!!props.disabled, !!props.readOnly)}
        >
          <ArrowDropDownIcon
            className={clsx(inputIcon, popupOpen && 'rotate-180')}
          />
        </Button>
      </div>
      <ul {...getListboxProps()} className={optionsWrapper(popupOpen)}>
        {(groupedOptions as T[]).map((option, index) => {
          const optionProps = getOptionProps({ option, index });

          return (
            // eslint-disable-next-line react/jsx-key
            <li {...optionProps} className={'group'}>
              <span className={clsx(optionRow(checkbox))}>
                {checkbox && (
                  <input
                    type="checkbox"
                    checked={optionProps['aria-selected'] ? true : false}
                    className={checkboxIndicator(checkbox)}
                  ></input>
                )}
                {typeof option === 'string' ? option : itemToString(option)}
                {!checkbox && (
                  <SelectedIcon
                    className={itemSelectedIndicator}
                    weight="bold"
                    data-testid="SelectedOptionIcon"
                  />
                )}
              </span>
            </li>
          );
        })}

        {groupedOptions.length === 0 && (
          <li
            className={clsx(
              emptyStateClassName,
              'cursor-default list-none p-2'
            )}
          >
            {emptyState}
          </li>
        )}
      </ul>
    </div>
  );
};

const inputControl = clsx(
  'text-gray-900 disabled:opacity-50 dark:text-gray-100'
);

const inputIcon = clsx(inputControl, 'size-4');

const inputWrapper = (focused: boolean, disabled: boolean) =>
  clsx(
    'flex flex-wrap items-center gap-2 overflow-hidden rounded-lg border border-solid p-2',
    !focused && 'shadow-md shadow-gray-50 dark:shadow-black/10',
    !disabled
      ? 'bg-white hover:border-gray-300 focus-visible:outline-0 dark:border-gray-900 dark:bg-gray-900 dark:text-white dark:hover:border-gray-600'
      : 'bg-gray-100 text-gray-700 dark:border-gray-900 dark:bg-gray-950 dark:text-gray-500'
  );

const inputField = clsx(
  'ring-bold shrink-0 grow basis-auto rounded-sm border-0 bg-inherit px-3 text-sm text-inherit'
);

const clearButton =
  'self-center rounded-[4px] border-0 bg-transparent p-2 shadow-none outline-0 hover:cursor-pointer hover:bg-pink-100 dark:hover:bg-gray-700';

const popupButton = (disabled: boolean, readOnly: boolean) =>
  clsx(
    'self-center rounded-md border-0 bg-transparent p-2 shadow-none outline-0',
    !disabled || !readOnly
      ? 'opacity-20 hover:cursor-pointer hover:bg-pink-100 dark:hover:bg-gray-700'
      : 'cursor-default'
  );

const optionsWrapper = (show: boolean) =>
  clsx(
    'absolute z-[1001] mx-0 my-3 max-h-60 w-full min-w-60 space-y-1 overflow-auto rounded-xl border border-solid border-gray-200 bg-white p-1.5 text-sm text-gray-900 shadow-lg outline-0 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:shadow-black/10',
    !show && 'hidden'
  );

const optionRow = (checkbox?: boolean) =>
  clsx(
    !checkbox && 'justify-between',
    'flex flex-row items-center ',
    'group-[.Mui-focused]:bg-pink-50/50 group-[.Mui-focused]:text-pink-900 dark:group-[.Mui-focused]:bg-pink-600 dark:group-[.Mui-focused]:text-pink-100',
    'group-[.Mui-focus-visible]:bg-gray-100 group-[.Mui-focus-visible]:text-gray-900 group-[.Mui-focus-visible]:shadow-md  dark:group-[.Mui-focus-visible]:bg-gray-800 dark:group-[.Mui-focus-visible]:text-gray-100',
    'group-[.Mui-focused]:group-aria-selected:bg-pink-100 dark:group-[.Mui-focused]:group-aria-selected:bg-pink-900',
    'group-[.Mui-focus-visible]:group-aria-selected:bg-pink-100 dark:group-[.Mui-focus-visible]:group-aria-selected:bg-pink-900',
    'group-[.Mui-focused]:group-aria-selected:text-pink-900 dark:group-[.Mui-focused]:group-aria-selected:text-pink-100',
    'group-[.Mui-focus-visible]:group-aria-selected:text-pink-900 dark:group-[.Mui-focus-visible]:group-aria-selected:text-pink-100',
    'group-[.Mui-focused]:ring-2 group-[.Mui-focused]:ring-pink-500',
    'cursor-default list-none rounded-md p-2',
    'last-of-type:border-b-0 hover:cursor-pointer hover:bg-gray-500/5',
    'group-aria-selected:bg-pink-100 group-aria-selected:text-pink-900 dark:group-aria-selected:bg-pink-900 dark:group-aria-selected:text-pink-100'
  );

const itemSelectedIndicator = clsx(
  'hidden text-white group-aria-selected:inline-block group-aria-selected:text-pink-900 dark:group-aria-selected:text-pink-100'
);
const checkboxIndicator = (isChecked: boolean | undefined) =>
  clsx('mr-2 cursor-pointer text-pink-900', isChecked && 'rounded-[4px]');

const styles = {
  inputWrapper,
  inputField,
  clearButton,
  popupButton,
  optionsWrapper,
  optionRow,
  itemSelectedIndicator,
};

export { Combobox, styles as comboboxStyles };
