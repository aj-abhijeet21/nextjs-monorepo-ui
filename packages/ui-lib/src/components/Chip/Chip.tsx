import { X as RemoveIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

type ChipProps = {
  value: string;
  Icon?: ReactNode;
  onDelete?: (event: unknown) => void;
};

const Chip = ({ value, Icon, onDelete }: ChipProps) => {
  return (
    <div className="ring-normal flex items-center gap-1 rounded-full border border-pink-500/10 bg-pink-50 py-1 pl-3 pr-1.5 text-pink-800 dark:bg-pink-700 dark:text-pink-100">
      {!!Icon && Icon}
      {value}
      {onDelete && (
        <button
          onClick={onDelete}
          id={value}
          type="button"
          className="rounded-full p-1 hover:bg-black/10"
          aria-label="Remove"
          title="Remove"
        >
          <RemoveIcon weight="bold" className="size-3" />
        </button>
      )}
    </div>
  );
};

export type { ChipProps };
export { Chip };
