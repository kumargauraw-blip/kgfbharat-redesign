export const KGFLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Outer Ring - Sun/Chakra */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />

        {/* Inner Shape - Lotus/Flame */}
        <path d="M50 20 C 50 20, 30 50, 30 65 Q 30 85, 50 85 Q 70 85, 70 65 C 70 50, 50 20, 50 20 Z" fill="none" stroke="currentColor" strokeWidth="3" />

        {/* Central Element - 'K' stylized or Diya flame */}
        <path d="M50 35 L 50 70 M 40 55 L 60 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
)
