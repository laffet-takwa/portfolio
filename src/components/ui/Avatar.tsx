import profilePhoto from '../../assets/takwa laffet.jpg';

interface AvatarProps {
  size?: number;
  label: string;
  /** Small availability dot in the corner. */
  status?: 'available' | 'none';
  statusLabel?: string;
  className?: string;
  /** Corner radius of the photo frame. */
  rounded?: string;
}

/** Profile photograph. */
export function Avatar({
  size = 96,
  label,
  status = 'none',
  statusLabel,
  className = '',
  rounded = 'rounded-2xl',
}: AvatarProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={profilePhoto}
        alt={label}
        width={size}
        height={size}
        className={`h-full w-full border border-[var(--border)] object-cover shadow-[var(--shadow-soft)] ${rounded}`}
      />
      {status === 'available' ? (
        <span
          aria-hidden="true"
          title={statusLabel}
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--window-content)] bg-[var(--success)]/20 text-[10px] text-[var(--success)]"
        >
          ●
        </span>
      ) : null}
    </div>
  );
}
