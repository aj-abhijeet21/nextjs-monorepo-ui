import { Root } from '@radix-ui/react-label';
import { clsx } from 'clsx';
import type { WithClassName } from '../../types';

type Props = WithClassName & {
  title: string;
  htmlFor: string;
  hidden?: boolean;
  id?: string;
};

export const Label = (props: Props): JSX.Element => {
  return (
    <Root asChild={true} htmlFor={props.htmlFor} id={props.id}>
      <div className={clsx(props.className, props.hidden && 'sr-only', text)}>
        {props.title}
      </div>
    </Root>
  );
};

const text = `
  text-zinc-800
  text-sm
  dark:text-white
`;
