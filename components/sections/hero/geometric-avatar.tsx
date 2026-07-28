import { cn } from "@/utils/cn";

interface GeometricAvatarProps {
  size?: number;
  initials?: string;
  className?: string;
}

export function GeometricAvatar({
  size = 176,
  initials = "FS",
  className,
}: GeometricAvatarProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Placeholder avatar (drop /public/avatar.png to replace)"
      className={cn("select-none", className)}
    >
      <defs>
        <linearGradient id="fs-avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="60%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
        <radialGradient id="fs-avatar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="url(#fs-avatar-glow)" />

      <g stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none">
        <circle cx="100" cy="100" r="86" />
        <circle cx="100" cy="100" r="72" />
        <circle cx="100" cy="100" r="58" />
      </g>

      <circle cx="100" cy="100" r="52" fill="#0B0D12" stroke="rgba(255,255,255,0.12)" />
      <circle cx="100" cy="100" r="52" fill="url(#fs-avatar-gradient)" opacity="0.18" />

      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="42"
        fontWeight="700"
        fill="url(#fs-avatar-gradient)"
      >
        {initials}
      </text>

      <g fill="url(#fs-avatar-gradient)">
        <circle cx="100" cy="14" r="3" />
        <circle cx="186" cy="100" r="3" />
        <circle cx="100" cy="186" r="3" />
        <circle cx="14" cy="100" r="3" />
      </g>
    </svg>
  );
}
