import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { useMagnetic } from '../../hooks/useMagnetic';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
  to?: undefined;
}

interface ButtonAsAnchor extends BaseProps {
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
}

interface ButtonAsLink extends BaseProps {
  to: string;
  href?: undefined;
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    'bg-paper text-ink-950 hover:bg-clay hover:text-paper border border-transparent',
  ghost: 'bg-transparent text-paper hover:bg-paper/[0.06] border border-transparent',
  outline: 'bg-transparent text-paper border border-line-strong hover:border-paper/60 hover:bg-paper/[0.04]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-fluid-xs gap-2',
  md: 'h-11 px-6 text-fluid-sm gap-2.5',
  lg: 'h-[3.25rem] px-7 text-fluid-sm gap-3',
};

const shell =
  'group relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-swift will-change-transform';

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', icon, className, children, magnetic = true } = props;
  const { ref: magneticRef, style, handlers } = useMagnetic<HTMLElement>({ enabled: magnetic, strength: 0.28 });

  const classes = cn(shell, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="flex transition-transform duration-300 ease-swift group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  const assignRef = (node: HTMLElement | null): void => {
    magneticRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} ref={assignRef as never} className={classes} style={style} {...handlers}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        ref={assignRef}
        className={classes}
        style={style}
        {...handlers}
      >
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, icon: _i, magnetic: _m, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _i; void _m; void _c; void _ch;

  return (
    <button ref={assignRef} className={classes} style={style} {...rest} {...handlers}>
      {content}
    </button>
  );
});
