// SVG Decoration components for Sugandh Agarbatti E-Commerce

// Animated smoke wisps rising from incense tip
export function SmokeWisps({ color = 'white', opacity = 0.5, size = 60 }) {
  return (
    <svg
      width={size}
      height={size * 2}
      viewBox="0 0 60 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Wip 1 */}
      <path
        className="smoke-particle"
        d="M30 115 Q35 95 28 75 Q22 58 32 42 Q40 28 30 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
      />
      {/* Wisp 2 */}
      <path
        className="smoke-particle"
        d="M30 115 Q24 98 30 80 Q36 63 26 48 Q18 35 28 18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity={opacity * 0.7}
        style={{ animationDelay: '0.9s' }}
      />
      {/* Wisp 3 */}
      <path
        className="smoke-particle"
        d="M30 115 Q38 100 32 82 Q27 66 35 50 Q42 36 34 22"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity={opacity * 0.5}
        style={{ animationDelay: '1.8s' }}
      />
    </svg>
  )
}

// Decorative agarbatti stick SVG
export function IncenseStickSvg({ height = 200, glowColor = '#FF6B00' }) {
  return (
    <svg
      width={height * 0.35}
      height={height}
      viewBox="0 0 70 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Holder base */}
      <ellipse cx="35" cy="192" rx="14" ry="5" fill="#8B4513" opacity="0.7" />
      <rect x="30" y="182" width="10" height="12" rx="3" fill="#6B3410" />

      {/* Stick body */}
      <rect x="33.5" y="48" width="3" height="136" rx="1.5" fill="#8B4513" />

      {/* Incense coated part (darker tip area) */}
      <rect x="33" y="48" width="4" height="60" rx="2" fill="#5D2E0C" />

      {/* Glowing tip */}
      <circle cx="35" cy="48" r="4" fill={glowColor} className="flame-anim" />
      <circle cx="35" cy="48" r="7" fill={glowColor} opacity="0.35" className="flame-anim" />
      <circle cx="35" cy="48" r="11" fill={glowColor} opacity="0.15" className="flame-anim" />

      {/* Smoke wisps */}
      <path
        className="smoke-particle"
        d="M35 44 Q40 32 34 22 Q29 13 35 3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        className="smoke-particle"
        d="M35 44 Q29 34 33 22 Q37 11 30 2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        style={{ animationDelay: '1s' }}
      />
      <path
        className="smoke-particle"
        d="M35 40 Q42 28 38 16 Q34 5 40 -4"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
        style={{ animationDelay: '2s' }}
      />
    </svg>
  )
}

// Mandala / rangoli pattern background
export function MandalaPattern({ size = 200, color = 'white', opacity = 0.08, animate = false }) {
  const style = animate
    ? { animation: 'mandalaRotate 30s linear infinite', transformOrigin: 'center' }
    : {}
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, ...style }}
    >
      {/* Outer ring petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="8"
          ry="35"
          fill={color}
          transform={`rotate(${angle} 100 100)`}
          opacity="0.6"
        />
      ))}
      {/* Middle ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="5"
          ry="20"
          fill={color}
          transform={`rotate(${angle} 100 100) translate(0 -30)`}
          opacity="0.5"
        />
      ))}
      {/* Inner circles */}
      <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx="100" cy="100" r="20" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="100" cy="100" r="10" fill={color} opacity="0.5" />
      {/* Outer ring circle */}
      <circle cx="100" cy="100" r="48" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="4 3" opacity="0.5" />
      <circle cx="100" cy="100" r="58" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
    </svg>
  )
}

// Wave/separator SVG
export function WaveSeparator({ color = '#F2F2EE', height = 40 }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z"
        fill={color}
      />
    </svg>
  )
}

// Leaf/botanical decoration
export function LeafDecor({ color = '#1B4332', opacity = 0.15, size = 80, flipped = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, transform: flipped ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M10 70 C10 70 20 30 50 20 C70 12 72 8 72 8 C72 8 68 18 62 32 C54 50 40 60 20 68 L10 70 Z"
        fill={color}
      />
      <path
        d="M12 68 C22 55 38 46 55 30"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M18 65 C25 55 35 48 48 36"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

// Floating dot particles
export function FloatingDots({ count = 8, color = '#FFD700', opacity = 0.3 }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    cx: 10 + (i * 11) % 85,
    cy: 10 + (i * 17) % 80,
    r: 1 + (i % 3),
    delay: i * 0.3,
    dur: 2.5 + (i % 4) * 0.5,
  }))
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color}>
          <animate
            attributeName="cy"
            values={`${d.cy};${d.cy - 8};${d.cy}`}
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

// Decorative cross/sparkle pattern (like the existing one in HeroBanner)
export function CrossPattern({ color = '#ffffff', opacity = 0.05, size = 60 }) {
  const svgStr = `%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(color)}' fill-opacity='1'%3E%3Cpath d='M${size * 0.6} ${size * 0.57}v-${size * 0.067}h-${size * 0.033}v${size * 0.067}h-${size * 0.067}v${size * 0.033}h${size * 0.067}v${size * 0.067}h${size * 0.033}v-${size * 0.067}h${size * 0.067}v-${size * 0.033}h-${size * 0.067}z'/%3E%3C/g%3E%3C/svg%3E`
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgStr}")`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
