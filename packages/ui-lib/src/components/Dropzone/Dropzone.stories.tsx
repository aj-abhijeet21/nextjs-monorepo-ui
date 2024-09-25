import { Cat } from '@phosphor-icons/react';
import {
  Canvas,
  Controls,
  Description,
  Story,
  Subheading,
  Title,
} from '@storybook/addon-docs';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone } from './Dropzone';
import { Roadmap } from '../Storybook/Roadmap';

const meta: Meta<typeof Dropzone> = {
  component: Dropzone,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => <DocContent />,
    },
  },
  title: 'Elements/Dropzone',
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaults = {
  title: 'Import files',
  helperText: 'Up to 10 MB',
};

/**
 * Add files by dragging and dropping onto the element, clicking, or pressing space/enter to open a file browser in the client's OS.
 */
export const Default: Story = {
  args: {
    ...defaults,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

/**
 * Single files can be accepted using `maxFiles: 1`
 */
export const Single: Story = {
  args: {
    ...defaults,
    maxFiles: 1,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
  name: 'Single file only',
};

/**
 * Here's an example with `maxFiles: 4`
 */
export const MaxFiles: Story = {
  args: {
    ...defaults,
    maxFiles: 1,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
  name: 'Specific number of uploads',
};

/**
 * Using the `accept` prop allows restrictions on file type and extension.
 */
export const Images: Story = {
  args: {
    ...defaults,
    accept: {
      'image/*': [],
    },
    helperText: 'Image only (eg. PNG, JPEG or GIF)',
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
  name: 'Images only',
};

export const Suggestion: Story = {
  args: {
    ...defaults,
    suggestion:
      'Templates can contain extra columns but existing column names must not be changed',
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

export const Error: Story = {
  args: {
    ...defaults,
    error: 'Upload failed',
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

export const Disabled: Story = {
  args: {
    ...defaults,
    title: 'This dropzone is disabled',
    disabled: true,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

const CatIcon = () => <Cat className="size-8 dark:text-white" />;

export const CustomIcon: Story = {
  args: {
    ...defaults,
    title: 'Share your favorite cat',
    cta: 'Upload kitten picture',
    helperText: 'Dogs not allowed',
    Icon: CatIcon,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

export const LongText: Story = {
  args: {
    ...defaults,
    title:
      "The trouble with programmers is that you can never tell what a programmer is doing until it's too late. (Seymour Cray)",
    cta: 'Transition from the nonworking state to the working state.',
    ctaSuffix: '(J. Osterhout)',
    helperText:
      "If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization. (Gerald Weinberg) You can't have great software without a great team, and most software teams behave like dysfunctional families. (Jim McCarthy)",
    suggestion:
      "Never trust a computer you can't throw out a window. (Steve Wozniak) 640K ought to be enough for anybody. (Bill Gates, 1981) 19 Jan 2038 at 3:14:07 AM (End of the word according to Unix-2^32 seconds after January 1, 1970) There are two ways to write error-free programs; only the third one works. (Alan J. Perlis)",
    Icon: CatIcon,
  },
  render: (args) => (
    <>
      <div className="mb-8 grid grid-cols-3 gap-8">
        <Dropzone {...args} size="xs" />
        <Dropzone {...args} size="sm" />
        <Dropzone {...args} size="md" />
      </div>
      <div>
        <Dropzone {...args} size="lg" />
      </div>
    </>
  ),
};

const DocContent = () => (
  <>
    <Title />
    <Description>
      Add files by dragging and dropping onto the element, clicking, or pressing
      space/enter to open a file browser in the client's OS.
    </Description>
    <Canvas>
      <Story of={Default} />
    </Canvas>
    <Roadmap items={['Implement an async progress bar']} />
    <Controls of={Default} />

    <Subheading>Single file only</Subheading>
    <Description>Single files can be accepted using `maxFiles: 1`</Description>
    <Canvas>
      <Story of={Default} />
    </Canvas>

    <Subheading>Specific number of uploads</Subheading>
    <Description>Here's an example with `maxFiles: 4`</Description>
    <Canvas>
      <Story of={MaxFiles} />
    </Canvas>

    <Subheading>Images only</Subheading>
    <Description>
      Using the `accept` prop allows restrictions on file type and extension.
    </Description>
    <Canvas>
      <Story of={Images} />
    </Canvas>

    <Subheading>Suggestion</Subheading>
    <Canvas>
      <Story of={Suggestion} />
    </Canvas>

    <Subheading>Error</Subheading>
    <Canvas>
      <Story of={Error} />
    </Canvas>

    <Subheading>Disabled</Subheading>
    <Canvas>
      <Story of={Disabled} />
    </Canvas>

    <Subheading>Custom Icon</Subheading>
    <Canvas>
      <Story of={CustomIcon} />
    </Canvas>

    <Subheading>Long text</Subheading>
    <Canvas>
      <Story of={LongText} />
    </Canvas>
  </>
);
