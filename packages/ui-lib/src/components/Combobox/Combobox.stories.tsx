/* eslint-disable react-hooks/rules-of-hooks */
import { Markdown, Stories, Subtitle, Title } from '@storybook/addon-docs';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Combobox } from './Combobox';

const Docs: Meta<typeof Combobox> = {
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '400px',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Markdown>
            Combobox is based on [MUI
            Autocomplete](https://mui.com/base-ui/react-autocomplete). It
            requires an `options[]` prop, which can be an array of strings or
            any object with a `label` string value.
          </Markdown>
          <Markdown>
            If you need to build your own Combobox, you can import
            `comboboxStyles` for classnames.
          </Markdown>
          <Stories />
        </>
      ),
    },
  },
  title: 'Elements/Combobox',
};

const defaults = {
  options: ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz'],
  placeholder: 'Type to search',
};

export default Docs;
type Story = StoryObj<typeof Docs>;

/**
 * `options` can be an array of [uncontrolled](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms) strings.
 **/
export const Simple: Story = { args: { ...defaults } };

/**
 * Often we work with arrays of objects. For convenience, if the object has a `label` it will be used as the displayed value.
 *
 * Provide a `searchKeys` to conveniently search objects on specific keys. Eg `['id', 'name', 'label']
 *
 * To see this in action, try searching "secret name."
 **/
export const Objects: Story = {
  args: {
    ...defaults,
    options: [
      { id: 1, name: 'secret name xerox', label: 'number one' },
      { id: 2, name: 'codename', label: 'number two' },
      { id: 3, name: 'three', label: 'number three (3)' },
    ],
  },
};

/**
 * Multi-select can be enabled using the `multiple` prop, which renders `Chip` components inline
 *
 * Add `disableCloseOnSelect` to allow rapid selection of several items
 *
 * Add a `getOptionLabel` method to customize the Chip text. Here we add an exclamation point with: `(value) => value + '!'`
 */
export const MultiSelect: Story = {
  args: {
    ...defaults,
    multiple: true,
    disableCloseOnSelect: true,
    getOptionLabel: (value: string) => value + '!',
  },
};
/**
 * Multi-select with checkbox can be enabled using the `multiple` and `checkbox` prop, which renders `Chip` components inline
 *
 * Add `disableCloseOnSelect` to allow rapid selection of several items
 *
 * Add a `getOptionLabel` method to customize the Chip text. Here we add an exclamation point with: `(value) => value + '!'`
 */
export const MultiSelectWithCheckbox: Story = {
  args: {
    ...defaults,
    multiple: true,
    disableCloseOnSelect: true,
    checkbox: true,
    getOptionLabel: (value: string) => value + '!',
  },
};
/**
 * Set the MUI-esque `freeSolo` to allow users to enter new values.
 *
 * When this option is enabled, the empty state will show the custom value instead of "No Results"
 */
export const FreeSolo: Story = {
  args: {
    ...defaults,
    multiple: true,
    freeSolo: true,
    includeInputInList: true,
  },
};

/**
 * Add `disableClearable` when some selection is mandatory, similar to a `Select` component. In this mode a `defaultValue` might be necessary.
 */
export const DisableClearable: Story = {
  args: {
    ...defaults,
    defaultValue: defaults.options[0],
    disableClearable: true,
  },
};

/**
 * Readonly a user to paste the value but not change it
 */
export const ReadOnly: Story = {
  args: { ...defaults, value: defaults.options[0], readOnly: true },
};

/**
 * Preface is a convenient way to include an icon or character before the field input (and any multiple selection)
 */
export const Preface: Story = {
  args: { ...defaults, value: defaults.options[0], Preface: <>$</> },
};

/**
 * A disabled combobox
 */
export const Disabled: Story = {
  args: {
    ...defaults,
    disabled: true,
    value: defaults.options[1],
  },
};

/**
 * Options can be provided asynchronously
 **/
export const AsyncOptions: Story = {
  render: (args) => {
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    return (
      <Combobox
        {...args}
        placeholder="Type to search"
        options={options}
        loading={loading}
        onInputChange={(event, value) => {
          void (async () => {
            if (value.length > 0) {
              setLoading(true);
              await new Promise((r) => setTimeout(r, 500));
              setOptions(
                defaults.options.filter((option) =>
                  option.toLowerCase().includes(value.toLowerCase())
                )
              );
              setLoading(false);
            } else {
              setOptions([]);
            }
          })();
        }}
      />
    );
  },
};

/**
 * Here we combine several options.
 *
 * - Results are asynchronously provided, with a controlled `loading` state
 * - Values are also controlled
 * - `T` is the generic type of options in the combobox (type `Task` in this example). When you define a generic type `T` for the `ComboboxProps`, it allows the options provided to the combobox to be of `T` type, providing flexibility in the data structure used. This means that other props such as `searchKeys` will be inferred based on the properties of the `T` type, enabling filtering on specific fields of the provided options.
 * - In this example, `Combobox<Task, true>` will make sure the type of options would be `Task` and `Multiple = true`; The signature is `Combobox<T, Multiple, DisableClearable, FreeSolo>`, where all the fields are boolean except the first one.
 * - `searchKeys` are provided to conveniently search option objects on specific keys
 * - `isOptionEqualToValue` is used to determine if the option represents the given value. (Uses strict equality by default)
 * - `autoSelect` (boolean) is used to select the option when the Autocomplete loses the focus, unless the user chooses a different option or changes the character string in the input.
 * - `filterSelectedOptions` (boolean) is used to to hide the selected options from the list
 * - `getOptionKey` is used to determine the key for a given option. This can be useful when the labels of options are not unique (since labels are used as keys by default).
 * - `onSelectedItemChange` can be used as a handler to react to changes in `selectedItems`, as it can become complex logic to implement inside `onChange`
 **/
export const ComplexExample: Story = {
  render: () => {
    type Task = { id: number; title: string; completed: boolean };
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<Task[]>([]);
    const [value, setValue] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetch = async (term: string) => {
        setLoading(true);
        const data: Task[] = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  id: 1,
                  title: 'One',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'Two',
                  completed: false,
                },
                {
                  id: 3,
                  title: 'Three',
                  completed: true,
                },
              ]),
            100
          )
        );
        setOptions(
          data.filter(
            (task: Task) =>
              task.title.toLowerCase().includes(term.toLowerCase()) ||
              task.id.toString().toLowerCase().includes(term.toLowerCase())
          )
        );
        setLoading(false);
      };

      if (inputValue.length > 0) {
        void fetch(inputValue);
      } else {
        setOptions([]);
      }
    }, [inputValue]);

    return (
      <Combobox<Task, true>
        placeholder="Search or add tasks"
        options={options}
        inputValue={inputValue}
        onInputChange={(event, value) => setInputValue(value)}
        loading={loading}
        multiple
        searchKeys={['id', 'title']}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option: Task) => `${option.id} ${option.title}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={(event, newValue) => {
          newValue && setValue(newValue);
        }}
        onSelectedItemChange={(val) =>
          console.log('New changed value is...', val)
        }
        autoSelect
        filterSelectedOptions
      />
    );
  },
};
