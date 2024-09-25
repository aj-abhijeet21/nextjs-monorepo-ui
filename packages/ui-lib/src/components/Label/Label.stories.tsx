import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ['autodocs'],
  title: 'Elements/Label',
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaults = {
  title: 'This is a visible Label',
};

export const Normal: Story = {
  args: {
    ...defaults,
  },
};

/**
 * Hidden `label`
 */
export const Hidden: Story = {
  args: {
    ...defaults,
    title: 'This is Hidden Label',
    hidden: true,
  },
  decorators: (Story, context) => (
    <>
      <Story {...context} />
      <p className="dark:text-white">
        This text is visible but the label was not.
      </p>
    </>
  ),
};
