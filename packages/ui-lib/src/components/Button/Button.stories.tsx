import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import React from 'react';
import { Icon } from '../Icon/Icon';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    title: {
      if: { arg: 'icon', neq: true },
      description: 'Button title',
      type: 'string',
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'positive', 'negative'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
    icon: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },

    size: {
      options: ['sm', 'lg'],
      description: 'button sizes',
      control: { type: 'radio' },
    },
    className: {
      type: 'string',
      description: 'add classes for buttons',
    },
    starticon: {
      if: { arg: 'icon', neq: true },
      description: 'starticon is the Icon component from ui library itself',

      table: {
        type: { summary: 'ReactNode' },
        defaultValue: {
          summary: `<Icon icon="add" size={'xl'}></Icon>`,
        },
      },
    },
    endicon: {
      if: { arg: 'icon', neq: true },
      description: 'endicon is the Icon component from ui library itself',
      options: ['notification', 'info', 'add'],
      control: { type: 'radio' },
      mapping: {
        add: <Icon icon="add" size={'xl'}></Icon>,
        info: <Icon icon="notification" size={'xl'}></Icon>,
        notification: <Icon icon="info" size={'xl'}></Icon>,
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: {
          summary: `<Icon icon="add" size={'xl'}></Icon>`,
        },
      },
    },
    children: {
      options: ['notification', 'info', 'add', 'title'],
      mapping: {
        add: <Icon icon="add" size={'xl'}></Icon>,
        info: <Icon icon="notification" size={'xl'}></Icon>,
        notification: <Icon icon="info" size={'xl'}></Icon>,
        title: 'Button',
      },
      control: { type: 'radio' },
      description: `set icon as true and select icon option from select to pass the icon as child to button.`,
      defaultValue: {
        summary: `add: <Icon icon="add" size={'xl'}></Icon>,
          info: <Icon icon="notification" size={'xl'}></Icon>,
          notification: <Icon icon="info" size={'xl'}></Icon>,
          title: 'Button'`,
      },
    },
    asChild: {
      options: [true, false],
      control: { type: 'boolean' },
      type: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Here we have two types of button components. 
        1. Normal button with text, starticon, endicon .
    2. icon button.
Default props and display is for normal buttons with text title and start/end icons.
In order to get the icon button select icon as true and then select the children from children radio buttons. User can also pass the title as the child to button.
Start and end icons are not available with icon buttons. So when we select icon as true we won't see starticon and endicon props.

# Sample code for icon button
      <Button icon size="sm" variant="secondary" >
        <Icon
          icon="notifications"
          size="xl"
        />
    </Button>

# Sample code for button
      <Button size="sm" variant="secondary" >
        Button
    </Button> 
    <Button size="lg" starticon={<Icon icon="add" size="xl"/>} title="Button" variant="primary" />
           
For addon classes user can use the className prop to pass the classes `,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
/**
 * Primary button with the starticon
 */
export const Primary: Story = {
  args: {
    title: 'Button',
    variant: 'primary',
    size: 'lg',
    disabled: false,
    starticon: <Icon icon="add" size={'xl'}></Icon>,
  },
};
/**
 * Large Secondary button. use size='sm' in props for small button
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Button',
    size: 'lg',
  },
};
/**
 * Tertiary button with default size as small
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    title: 'Button',
  },
};
export const Positive: Story = {
  args: {
    variant: 'positive',
    title: 'Button',
  },
};

/**
 * Negative button with info icon as endicon.
 */
export const Negative: Story = {
  args: {
    variant: 'negative',
    title: 'Button',
    endicon: <Icon icon="add" size={'xl'}></Icon>,
  },
};

/**
 * Large button use size='lg' in props to get large button.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Button',
    starticon: <Icon icon="add" size={'xl'}></Icon>,
  },
};

/**
 * Small button. Default value for size is small
 */
export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Button',
  },
};
/**
 * Disabled button.
 */
export const Disabled: {
  args: { size: string; title: string; disabled: boolean; variant: string };
} = {
  args: {
    size: 'sm',
    title: 'Disabled',
    disabled: true,
    variant: 'tertiary',
  },
};

/**
 * Icon buttons. Send icon ture to props.
 */
export const Icons: Story = {
  args: {
    variant: 'tertiary',
    size: 'lg',
    disabled: false,
    icon: true,
  },
  render: (args) => (
    <>
      <Button {...args} className="m-2">
        <Icon icon="info" size={'xl'}></Icon>
      </Button>

      <Button size="sm" variant="secondary" icon>
        <Icon icon="notifications" size={'xl'}></Icon>
      </Button>
    </>
  ),
};
