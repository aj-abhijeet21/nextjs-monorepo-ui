import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Dropzone } from './Dropzone';

describe.sequential('ui / Dropzone', () => {
  describe('Rendering', () => {
    it('should render', () => {
      render(<Dropzone label={label} cta="Custom cta" />);
      const { area, input } = getDropzone();

      expect(area).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it('should show custom CTA', () => {
      render(<Dropzone label={label} cta="Custom cta" />);
      const { area } = getDropzone();

      expect(area).toHaveTextContent('Custom cta');
    });

    it('should show custom CTA suffix', () => {
      render(<Dropzone label={label} ctaSuffix="Custom cta suffix" />);
      const { area } = getDropzone();

      expect(area).toHaveTextContent('Custom cta suffix');
    });

    it('should show custom helper text', () => {
      render(<Dropzone label={label} helperText="Custom helper text" />);
      const { area } = getDropzone();

      expect(area).toHaveTextContent('Custom helper text');
    });
  });

  describe('Accessibility', () => {
    it('should focus when `Tab` is pressed', async () => {
      const user = userEvent.setup();
      render(<Dropzone label={label} />);
      const { area } = getDropzone();

      await user.tab();

      expect(area).toHaveFocus();
    });

    it('should be able to be disabled', () => {
      render(<Dropzone label={label} name={'test'} disabled />);
      const input = screen.getByTestId('test');

      expect(input).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should receive files by dropping', async () => {
      const onChange = vi.fn();
      render(<Dropzone label={label} onChange={onChange} />);
      const { area } = getDropzone();
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents'], 'textfile2.txt', {
          type: 'application/json',
        }),
      ];

      await mockDropEvent(area, files);

      expect(onChange).toHaveBeenLastCalledWith(files, []);
    });

    it('should receive files by upload', async () => {
      const onChange = vi.fn();
      render(<Dropzone label={label} onChange={onChange} name="test" />);
      const input = screen.getByTestId('test');
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
      ];

      await userEvent.upload(input, files);

      expect(onChange).toHaveBeenCalledWith(files, []);
    });

    it('should accept unlimited files by default', async () => {
      const onChange = vi.fn();
      render(<Dropzone label={label} onChange={onChange} name="test" />);
      const input = screen.getByTestId('test');
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents 1'], 'textfile1.txt', {
          type: 'application/json',
        }),
        new File(['text contents 2'], 'textfile2.txt', {
          type: 'application/json',
        }),
        new File(['text contents 3'], 'textfile3.txt', {
          type: 'application/json',
        }),
        new File(['text contents 4'], 'textfile4.txt', {
          type: 'application/json',
        }),
      ];

      expect(input).toHaveAttribute('multiple');

      await userEvent.upload(input, files);

      expect(onChange).toHaveBeenCalledWith(files, []);
    });

    it('should respect maxFiles limit of 1', async () => {
      const onChange = vi.fn();
      render(
        <Dropzone label={label} onChange={onChange} maxFiles={1} name="test" />
      );
      const input = screen.getByTestId('test');
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents 1'], 'textfile1.txt', {
          type: 'application/json',
        }),
      ];

      expect(input).not.toHaveAttribute('multiple');

      await userEvent.upload(input, files);

      expect(onChange).toHaveBeenCalledWith([files[0]], []);
    });

    it('should error when multiple files exceed maxFiles', async () => {
      const onChange = vi.fn();
      render(
        <Dropzone label={label} onChange={onChange} maxFiles={2} name="test" />
      );
      const input = screen.getByTestId('test');
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents 1'], 'textfile1.txt', {
          type: 'application/json',
        }),
        new File(['text contents 2'], 'textfile2.txt', {
          type: 'application/json',
        }),
        new File(['text contents 3'], 'textfile3.txt', {
          type: 'application/json',
        }),
      ];

      expect(input).toHaveAttribute('multiple');

      await userEvent.upload(input, files);

      expect(onChange).toHaveBeenCalledWith(
        [],
        expect.arrayContaining([
          {
            errors: [{ code: 'too-many-files', message: 'Too many files' }],
            file: files[0],
          },
        ])
      );
    });

    it('should accept custom dropzoneOptions', async () => {
      const onChange = vi.fn();
      render(
        <Dropzone
          label={label}
          dropzoneOptions={{
            multiple: true,
            onDrop: onChange,
          }}
        />
      );
      const { area } = getDropzone();
      const files = [
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
        new File(['text contents'], 'textfile.txt', {
          type: 'application/json',
        }),
      ];

      await mockDropEvent(area, files);

      expect(onChange).toHaveBeenCalledWith(files, [], expect.anything());
    });
  });
});

const label = 'Dropzone';
const getDropzone = (): { input: HTMLElement; area: HTMLElement } => ({
  area: screen.getByRole('presentation'),
  input: screen.getByText(label),
});

const mockDropEvent = async (node: HTMLElement, files: File[]) => {
  const event = new Event('drop', { bubbles: true });
  const data = {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
  Object.assign(event, data);
  // eslint-disable-next-line testing-library/no-unnecessary-act,@typescript-eslint/require-await
  await act(async () => {
    fireEvent(node, event);
  });
};
