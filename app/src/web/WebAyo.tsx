export function WebAyo({ className = '', pose = 'idle' }: {
  className?: string;
  pose?: 'idle' | 'greet' | 'celebrate';
}) {
  return <picture className={className}>
    <source media="(prefers-reduced-motion: no-preference)" srcSet={`./art/ayo-${pose}-160.webp`} />
    <img src="./art/ayo-study-320.webp" width="160" height="160" alt="Ayo tutor" />
  </picture>;
}
