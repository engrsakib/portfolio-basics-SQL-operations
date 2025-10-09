const PremiumVerifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.1"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      stroke="url(#premiumGradient)" 
      strokeWidth="2" 
      fill="none"
      strokeDasharray="2 2"
      className="animate-spin"
      style={{ animationDuration: '8s' }}
    />
    <path 
      d="M12 2L8 8h8l-4-6zM8 8l4 14 4-14H8z" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.4"
    />
    <path 
      d="M12 2L8 8h8l-4-6zM8 8l4 14 4-14H8z" 
      stroke="url(#premiumGradient)" 
      strokeWidth="1.5" 
      fill="none"
    />
    <g fill="url(#premiumGradient)" fillOpacity="0.8">
      <circle cx="7" cy="5" r="0.8" />
      <circle cx="17" cy="5" r="0.8" />
      <circle cx="19" cy="12" r="0.8" />
      <circle cx="5" cy="12" r="0.8" />
      <circle cx="7" cy="19" r="0.8" />
      <circle cx="17" cy="19" r="0.8" />
    </g>
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.6"
    />
    <path 
      d="m10.5 12 1 1 2-2" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="25%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="75%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);