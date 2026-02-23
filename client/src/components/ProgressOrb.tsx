interface ProgressOrbProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressOrb({ progress, size = 'md' }: ProgressOrbProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Background orb image */}
      <img 
        src="https://private-us-east-1.manuscdn.com/sessionFile/FBrkBNkixwaXRUnXWMhdiS/sandbox/JkqqIQQSJwU9BF6vaa9ivv-img-2_1771814039000_na1fn_bWlsZXN0b25lLW9yYg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRkJya0JOa2l4d2FYUlVuWFdNaGRpUy9zYW5kYm94L0prcXFJUVFTSndVOUJGNnZhYTlpdnYtaW1nLTJfMTc3MTgxNDAzOTAwMF9uYTFmbl9iV2xzWlhOMGIyNWxMVzl5WWcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Aqvj0yDtw8Owk3S29lXl0b8CykZgLQqNlpxXvpIt~pmWeZzZWdOlqac4u1ixcatPvUH~8Z6B6~PSXabj5P2EVMrwxDfWlkTs5GmBosvS-cuh7WPCaR~yVy7h8CNiwIQGMdGedJNLNUenSx7N06ioIZBDQHX0dz92XAKLcNgl4xFdDco4v3zZRotpI3qJ71o1YXpGmDIl48lx0b8ICIpY-Y7JTACBDE502MkzzSwxACmvsgbWKICjZOxbg2-bjwYeIMCcmVrpCbAxyNpiyS~o1BbhPm3YHcO9SeZCBSKMFMo0C9DbkHglLIXRZ-edr6ArK5wgpTW3hf1dlVF1jEMpdQ__"
        alt="Progress Orb"
        className="w-full h-full object-contain animate-pulse-slow"
        style={{
          filter: `brightness(${0.6 + (progress / 100) * 0.4}) saturate(${0.8 + (progress / 100) * 0.4})`
        }}
      />
      
      {/* Progress ring */}
      <svg 
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="oklch(0.75 0.15 45 / 0.2)"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="oklch(0.75 0.15 45)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 4px oklch(0.75 0.15 45 / 0.6))'
          }}
        />
      </svg>
      
      {/* Progress percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-display text-primary font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
