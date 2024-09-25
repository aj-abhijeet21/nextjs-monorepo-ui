import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Combobox } from './Combobox';

describe('ui / Combobox', () => {
  describe('Rendering', () => {
    it('should render when items are strings', () => {
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      expect(cbox).toBeInTheDocument();
    });

    it('should render when items are objects', () => {
      render(<Combobox options={objectItems} />);
      const cbox = screen.getByRole('combobox');

      expect(cbox).toBeInTheDocument();
    });

    it('should render when items is empty', () => {
      render(<Combobox options={[]} />);
      const cbox = screen.getByRole('combobox');

      expect(cbox).toBeInTheDocument();
    });

    it('should render string options', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);

      await user.keyboard('{Tab}{ArrowDown}');

      const hlItem = screen.getAllByRole('option', { selected: false })[0];

      expect(hlItem).toHaveTextContent(new RegExp(stringItems[0]));
    });

    it('should render a loading spinner while waiting for options', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} loading />);

      await user.keyboard('{Tab}o');

      const spinner = screen.getByTestId('LoadingSpinner');
      expect(spinner).toBeInTheDocument();
    });

    it('should render a clear selection control when selected', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);

      await user.keyboard('{Tab}{ArrowDown}{Enter}');

      const clearSelection = screen.getByTestId('ClearButton');
      expect(clearSelection).toBeInTheDocument();
    });

    it('should render an indicator on the selected option', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);

      await user.keyboard('{Tab}{ArrowDown}{Enter}{ArrowDown}');

      const selectedOptionIcon = within(
        screen.getByText(stringItems[0])
      ).getByTestId('SelectedOptionIcon');

      expect(selectedOptionIcon).toBeVisible();
    });

    it('should render a highlight on focused elements', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);

      await user.keyboard('{Tab}{ArrowDown}{ArrowDown}');

      const hlRow = screen.getByText(stringItems[1]);

      expect(hlRow).toBeInTheDocument();
      expect(hlRow.className).toContain('Mui-focused');
    });
  });

  describe('Accessibility', () => {
    it('should have proper roles', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.keyboard('{Tab}{ArrowDown}');

      const cboxMenu = screen.getByRole('listbox');
      const cboxResults = within(cboxMenu).getAllByRole('option');

      expect(cbox).toBeInTheDocument();
      expect(cboxMenu).toBeInTheDocument();
      expect(cboxResults).toHaveLength(stringItems.length);
    });

    it('should focus when `Tab` is pressed', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.tab();

      expect(cbox).toHaveFocus();
    });

    it('should auto-highlight the first item for selection', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.keyboard('{Tab}{ArrowDown}{Enter}');

      expect(cbox).toHaveValue(stringItems[0]);
    });

    it('should select the highlighted item on `Enter`', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.keyboard('{Tab}{ArrowDown}{Enter}');

      expect(cbox).toHaveValue(stringItems[0]);
    });

    it('should select the highlighted item and blur on `Tab` away', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Combobox options={stringItems} autoSelect openOnFocus />
          <Combobox options={stringItems} />
        </>
      );
      const cboxes = screen.getAllByRole('combobox');

      await user.tab();
      await user.tab();

      expect(cboxes[0]).toHaveValue(stringItems[0]);
      expect(cboxes[1]).toHaveFocus();
    });

    /** This test is behaving differently in jest than on a mac OS browser. Need to do further research. */
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should be possible to clear a selection by keyboard', async () => {
    //   const user = userEvent.setup()
    //   const { getByRole } = render(<Combobox options={stringItems} />)
    //   const cbox = getByRole('combobox')

    //   await user.keyboard('{Tab}{ArrowDown}{Enter}')
    //   expect(cbox).toHaveValue(stringItems[0])

    //   await user.keyboard('{Meta>}{Delete}')
    //   expect(cbox).toHaveValue('')
    // })

    it('should be able to be disabled', () => {
      render(<Combobox options={stringItems} disabled />);
      const cbox = screen.getByRole('combobox');

      expect(cbox).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should receive input', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.tab();
      await user.type(cbox, 'first');
      await user.keyboard('{Enter}');

      expect(cbox).toHaveValue('first');
    });

    it('should clear the value on blur when nothing is selected', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.tab();
      await user.type(cbox, 'arbitrary query');
      await user.tab();

      expect(cbox).toHaveTextContent('');
    });

    it('should restore the value of a selected item on blur', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} value="first" />);
      const cbox = screen.getByRole('combobox');

      await user.tab();
      await user.keyboard('{Enter}');
      expect(cbox).toHaveValue(stringItems[0]);

      await user.keyboard('{Backspace}{Backspace}');
      await user.tab();
      expect(cbox).toHaveValue(stringItems[0]);
    });
  });

  describe('Combobox', () => {
    it('should render a no results message', async () => {
      const user = userEvent.setup();
      const msg = 'Empty state message';
      render(<Combobox options={stringItems} emptyState={msg} />);
      const cbox = screen.getByRole('combobox');

      await user.tab();
      await user.type(cbox, 'nothing to see here');

      const cboxMenu = screen.getByRole('listbox');
      expect(cboxMenu).toHaveTextContent(msg);
    });

    it('should show matching items from a partial query', async () => {
      const user = userEvent.setup();
      render(<Combobox options={stringItems} />);
      const cbox = screen.getByRole('combobox');

      await user.tab();
      await user.type(cbox, stringItems[0].substring(0, 1));

      const cboxOptions = screen.getByRole('option');

      expect(cboxOptions).toHaveTextContent(stringItems[0]);
    });
  });
});

const stringItems = ['first', 'second', 'third'];

type ObjectItem = Record<string, string>;
const objectItems: ObjectItem[] = [
  { pokemon: 'squirtle' },
  { pokemon: 'wartortle' },
  { pokemon: 'blastoise' },
];
