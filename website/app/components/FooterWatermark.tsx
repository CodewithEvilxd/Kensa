'use client';

export default function FooterWatermark() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '1200px',
      height: '240px',
      pointerEvents: 'none',
      userSelect: 'none',
      overflow: 'visible',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      zIndex: 0
    }}>
      {/* SVG Curved Text Overlay */}
      <svg
        viewBox="0 0 1200 240"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="kensa-cursive-curve"
            d="M 50,180 Q 600,40 1150,180"
            fill="none"
          />
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glow shadow text */}
        <text
          fill="var(--accent-orange)"
          opacity="0.04"
          filter="url(#soft-glow)"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: '290px',
            fontWeight: 950,
            letterSpacing: '-6px',
            textAnchor: 'middle',
          }}
        >
          <textPath
            xlinkHref="#kensa-cursive-curve"
            startOffset="45%"
          >
            kensa
          </textPath>
        </text>

        {/* Main curved text */}
        <text
          fill="#ffffff"
          opacity="0.02"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: '290px',
            fontWeight: 950,
            letterSpacing: '-6px',
            textAnchor: 'middle',
          }}
        >
          <textPath
            xlinkHref="#kensa-cursive-curve"
            startOffset="45%"
          >
            kensa
          </textPath>
        </text>
      </svg>
    </div>
  );
}
