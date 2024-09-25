import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SelectBox } from './SelectBox';

describe('ui / SelectBox', () => {
  describe('Rendering', () => {
    it('should render when option have label', () => {
      render(<SelectBox options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should render a highlight on focused elements', async () => {
      const user = userEvent.setup();
      render(<SelectBox options={options} />);

      await user.keyboard('{Tab}{ArrowDown}{ArrowDown}');

      const hlRow = screen.getByText(options[1].label);
      expect(hlRow).toBeInTheDocument();
    });
    it('should render a disabled select', () => {
      render(<SelectBox options={options} disabled />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper roles', async () => {
      const user = userEvent.setup();
      render(<SelectBox options={options} />);
      const select = screen.getByRole('combobox');
      await user.keyboard('{Tab}{ArrowDown}');

      const selectPopover = screen.getByRole('presentation');
      const optionsList = within(selectPopover).getAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(selectPopover).toBeInTheDocument();
      expect(optionsList).toHaveLength(options.length);
    });
  });
});

const options = [
  {
    label: 'Red',
    value: '#D32F2F',
  },
  {
    label: 'Green',
    value: '#4CAF50',
  },
  {
    label: 'Blue',
    value: '#2196F3',
  },
];
