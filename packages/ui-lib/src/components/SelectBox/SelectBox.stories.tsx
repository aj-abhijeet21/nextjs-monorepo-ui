import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Story,
  Title,
  Subtitle,
  Source,
  Controls,
  Primary,
} from '@storybook/addon-docs';
import { SelectBox } from './SelectBox';

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
  title: 'Elements/SelectBox',
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
    required: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
    open: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
  },
  parameters: {
    docs: {
      story: {
        height: '200px',
      },
      page: () => (
        <>
          <Title />
          SelectBox component provide the select component which uses radix ui
          under the hood. It provides the select component with the options and
          placeholder. It also provides the onValueChange callback to get the
          selected value. It also provide defaultOpen prop to open the options
          by default.
          <Controls of={Default} />
          <Primary />
          <Subtitle>Example Code:</Subtitle>
          <Source
            dark
            language="jsx"
            code={`
        import { SelectBox } from '@triplelift-internal/ui-lib';
        export default function App() {
          return (
            <SelectBox
              options={ [
                  { value: 'val1', label: 'label1' },
                  { value: 'val2', label: 'label2' },
                  { value: 'val3', label: 'label3' },
                  { value: 'val4', label: 'label4' },
                ]}
                placeholder= {'Select an option'}
                onValueChange={(value) => {
                  console.log(' value is', value);
                }}
            > 
            </SelectBox>
          );
        }
                    `}
          />
        </>
      ),
    },
  },
};

export default meta;

const defaultArgs = {
  options: [
    { value: 'val1', label: 'label1' },
    { value: 'val2', label: 'label2' },
    { value: 'val3', label: 'label3' },
    { value: 'val4', label: 'label4' },
  ],
  placeholder: 'Select an option',
  onValueChange: (value: string) => {
    console.log(' value is', value);
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultArgs,
  render: (defaultArgs) => {
    return <SelectBox {...defaultArgs}></SelectBox>;
  },
};

export const Disabled: Story = {
  args: { ...defaultArgs, disabled: true },
};

export const DefaultOpen: Story = {
  args: { ...defaultArgs, defaultOpen: true },
};
