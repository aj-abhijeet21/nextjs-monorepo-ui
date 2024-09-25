import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe.sequential('ui / Button', () => {
  describe('Rendering', () => {
    it('should render children when present', () => {
      const button = getButton(render(<Button>Hello</Button>));

      expect(button).toHaveTextContent('Hello');
    });

    it('should render without children', () => {
      const button = getButton(render(<Button />));

      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have `role="button"` by default', () => {
      const button = getButton(render(<Button>Hi there</Button>));

      expect(button).toBeInTheDocument();
    });

    it('should be able to use other roles', () => {
      const { getByRole } = render(<Button role="menuitem">Hi there</Button>);
      const button = getByRole('menuitem');

      expect(button).toBeInTheDocument();
    });

    it('should trigger `onClick` when `Enter` is pressed', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const button = getButton(
        render(<Button onClick={onClick}>Hi there</Button>)
      );

      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should focus when `Tab` is pressed', async () => {
      const user = userEvent.setup();
      const button = getButton(render(<Button>Hi there</Button>));

      await user.tab();

      expect(button).toHaveFocus();
    });

    it('should be possible to `Tab` away', async () => {
      const user = userEvent.setup();
      const buttons = getAllButtons(
        render(
          <>
            <Button>Hi there</Button>
            <Button>Hello there</Button>
            <button type="submit">Submit</button>
          </>
        )
      );

      await user.tab();

      expect(buttons[0]).toHaveFocus();

      await user.tab();

      expect(buttons[1]).toHaveFocus();

      await user.tab();

      expect(buttons[2]).toHaveFocus();
    });

    it('should be able to be disabled', async () => {
      const button = getButton(render(<Button disabled>Hi there</Button>));

      expect(button).toBeDisabled();
    });
  });
});

const getButton = ({ getByRole }: RenderResult): HTMLElement =>
  getByRole('button');
const getAllButtons = ({ getAllByRole }: RenderResult): HTMLElement[] =>
  screen.getAllByRole('button');
