'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Rocket, Zap, Cpu, Package, Sparkles,
  FileText, Search, MessageSquare, CheckSquare, Columns2, Palette,
  Settings, Download, ChevronDown, ChevronUp, Check, X,
  ArrowRight, HelpCircle, ExternalLink, RefreshCw
} from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import FooterWatermark from './components/FooterWatermark';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive mock diff state
  const [isSplit, setIsSplit] = useState(true);
  const [activeTheme, setActiveTheme] = useState<'dracula' | 'night-owl' | 'vs-dark'>('dracula');
  const [isViewed, setIsViewed] = useState(false);

  const faqs = [
    {
      question: "Why Kensa instead of GitHub's native PR view?",
      answer: "GitHub's PR interface freezes on large PRs, caps files at 1MB or 20,000 lines, and forces repeated 'Load Diff' clicks. Kensa fetches raw patches via the API and renders locally with web workers â€” zero freezes, 100% complete diffs."
    },
    {
      question: "How is my personal access token stored?",
      answer: "Your PAT lives in browser.storage.local â€” never leaves your machine. It's only sent directly to GitHub's API. Zero telemetry, zero external servers."
    },
    {
      question: "Is Kensa free and open-source?",
      answer: "Yes. 100% free, open-source, MIT-licensed. Inspect the source, build from source, or contribute on GitHub."
    },
    {
      question: "Which browsers are supported?",
      answer: "Chrome, Brave, Firefox, Edge, and Safari. Uses the WebExtension API standard for maximum compatibility."
    }
  ];

  // Map theme states to Prism themes
  const themeObjects = {
    dracula: themes.dracula,
    'night-owl': themes.nightOwl,
    'vs-dark': themes.vsDark
  };

  // Theme configuration details for wrapper styling
  const wrapperThemes = {
    dracula: {
      bg: '#282a36',
      border: '#191a21',
      gutterBg: '#1e1f29',
      gutterBorder: '#191a21',
      gutterText: '#6272a4',
      addedBg: 'rgba(80, 250, 123, 0.15)',
      deletedBg: 'rgba(255, 85, 85, 0.15)',
      addedLineBg: 'rgba(80, 250, 123, 0.06)',
      deletedLineBg: 'rgba(255, 85, 85, 0.06)',
    },
    'night-owl': {
      bg: '#011627',
      border: '#010a10',
      gutterBg: '#011220',
      gutterBorder: '#010a10',
      gutterText: '#4c566a',
      addedBg: 'rgba(163, 190, 140, 0.22)',
      deletedBg: 'rgba(191, 97, 106, 0.22)',
      addedLineBg: 'rgba(163, 190, 140, 0.08)',
      deletedLineBg: 'rgba(191, 97, 106, 0.08)',
    },
    'vs-dark': {
      bg: '#1e1e1e',
      border: '#111',
      gutterBg: '#1a1a1a',
      gutterBorder: '#111',
      gutterText: '#858585',
      addedBg: 'rgba(56, 139, 253, 0.22)',
      deletedBg: 'rgba(248, 81, 73, 0.22)',
      addedLineBg: 'rgba(56, 139, 253, 0.08)',
      deletedLineBg: 'rgba(248, 81, 73, 0.08)',
    }
  };

  const selectedTheme = themeObjects[activeTheme];
  const styleTheme = wrapperThemes[activeTheme];

  // Defined code panes for Split View
  const leftSplitLines = [
    { text: 'const reviewPR = async (pr) => {', type: 'normal', lineNum: 14 },
    { text: '  const res = await fetchNativePR(pr);', type: 'deleted', lineNum: 15 },
    { text: '  if (res.size > 1000000) return;', type: 'deleted', lineNum: 16 },
    { text: '', type: 'spacer', lineNum: null },
    { text: '', type: 'spacer', lineNum: null },
    { text: '  const diff = parseDiff(patch);', type: 'normal', lineNum: 17 },
    { text: '  renderDiff(diff);', type: 'normal', lineNum: 18 },
    { text: '};', type: 'normal', lineNum: 19 }
  ];

  const rightSplitLines = [
    { text: 'const reviewPR = async (pr) => {', type: 'normal', lineNum: 14 },
    { text: '', type: 'spacer', lineNum: null },
    { text: '', type: 'spacer', lineNum: null },
    { text: '  // Background web workers parse patches', type: 'added', lineNum: 15 },
    { text: '  const patch = await Kensa.fetchRawPatch(pr);', type: 'added', lineNum: 16 },
    { text: '  const diff = parseDiff(patch);', type: 'normal', lineNum: 17 },
    { text: '  renderDiff(diff);', type: 'normal', lineNum: 18 },
    { text: '};', type: 'normal', lineNum: 19 }
  ];

  // Code string for syntax highlighting compilation
  const leftSplitCode = leftSplitLines.map(l => l.text).join('\n');
  const rightSplitCode = rightSplitLines.map(l => l.text).join('\n');

  // Unified view lines sequence
  const unifiedLines = [
    { text: 'const reviewPR = async (pr) => {', type: 'normal', leftLine: 14, rightLine: 14 },
    { text: '  const res = await fetchNativePR(pr);', type: 'deleted', leftLine: 15, rightLine: null },
    { text: '  if (res.size > 1000000) return;', type: 'deleted', leftLine: 16, rightLine: null },
    { text: '  // Background web workers parse patches', type: 'added', leftLine: null, rightLine: 15 },
    { text: '  const patch = await Kensa.fetchRawPatch(pr);', type: 'added', leftLine: null, rightLine: 16 },
    { text: '  const diff = parseDiff(patch);', type: 'normal', leftLine: 17, rightLine: 17 },
    { text: '  renderDiff(diff);', type: 'normal', leftLine: 18, rightLine: 18 },
    { text: '};', type: 'normal', leftLine: 19, rightLine: 19 }
  ];

  const unifiedCode = unifiedLines.map(l => l.text).join('\n');

  return (
    <div>
      {/* â”€â”€â”€ Navbar â”€â”€â”€ */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <Link href="/" className="brand">
            <div className="logo-square">
              <img src="/logo.png" alt="Kensa" />
            </div>
            <span className="brand-title">Kensa</span>
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link nav-link--orange">Features</a>
            <a href="#comparison" className="nav-link nav-link--blue">GitHub vs Kensa</a>
            <a href="#how-it-works" className="nav-link nav-link--pink">How it Works</a>
            <a href="#faq" className="nav-link nav-link--yellow">FAQ</a>
            <Link href="/docs" className="nav-link nav-link--green">Docs</Link>
            <a
              href="https://github.com/codewithevilxd/kensa"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-button brutal-button-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* â”€â”€â”€ Hero Section â”€â”€â”€ */}
      <header className="container hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="brutal-badge brutal-badge--tilted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Rocket size={12} /> Open Source</span>
            <span className="brutal-badge" style={{ background: 'var(--accent-green)', color: '#fff', borderColor: 'var(--border-color)', transform: 'rotate(1deg)' }}>v1.0 Stable</span>
          </div>
          <h1>Review Code<br /><span className="italic-curve">Like a Pro</span></h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '580px' }}>
            A lightweight browser extension that replaces GitHub's <span className="highlight-orange">sluggish PR interface</span> with a fast, full-screen, continuous-scroll diff viewer. No caps. <span className="highlight-green">No UI freezes.</span>
          </p>

          <div className="hero-ctas">
            <a
              href="https://github.com/codewithevilxd/kensa/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-button brutal-button-primary"
            >
              <Download size={16} />
              Install Extension
            </a>
            <Link href="/docs" className="brutal-button">
              {"Read the Docs ->"}
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--border-color)' }}>Supported on:</span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Chrome */}
              <a href="https://github.com/CodewithEvilxd/Kensa/releases/download/v1/kensa-1.0.0-chrome.zip" className="brutal-badge" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transform: 'rotate(-1deg)', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05) rotate(-1deg)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--border-color)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'rotate(-1deg)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-color)'; }}>
                <img src="https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/chrome/chrome.svg" alt="Chrome" style={{ width: '16px', height: '16px', display: 'block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>Chrome</span>
              </a>
              {/* Firefox */}
              <a href="https://github.com/CodewithEvilxd/Kensa/releases/download/v1/kensa-1.0.0-firefox.zip" className="brutal-badge" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transform: 'rotate(1.5deg)', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05) rotate(1.5deg)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--border-color)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'rotate(1.5deg)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-color)'; }}>
                <img src="https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/firefox/firefox.svg" alt="Firefox" style={{ width: '16px', height: '16px', display: 'block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>Firefox</span>
              </a>
              {/* Safari */}
              <a href="https://github.com/CodewithEvilxd/Kensa/releases/download/v1/kensa-1.0.0-safari.zip" className="brutal-badge" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transform: 'rotate(-0.5deg)', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05) rotate(-0.5deg)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--border-color)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'rotate(-0.5deg)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-color)'; }}>
                <img src="https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/safari/safari.svg" alt="Safari" style={{ width: '16px', height: '16px', display: 'block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>Safari</span>
              </a>
              {/* Edge */}
              <a href="https://github.com/CodewithEvilxd/Kensa/releases/download/v1/kensa-1.0.0-edge.zip" className="brutal-badge" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transform: 'rotate(1.2deg)', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05) rotate(1.2deg)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--border-color)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'rotate(1.2deg)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-color)'; }}>
                <img src="https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/edge/edge.svg" alt="Edge" style={{ width: '16px', height: '16px', display: 'block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>Edge</span>
              </a>
            </div>
          </div>
        </div>

        {/* â”€â”€â”€ LIVE 1000% REAL INTERACTIVE DIFF VIEWER â”€â”€â”€ */}
        <div style={{ width: '100%', maxWidth: '940px', marginTop: '2.5rem' }}>
          <div className="brutal-card" style={{ padding: '0', overflow: 'hidden', boxShadow: '8px 8px 0px var(--border-color)', background: styleTheme.bg }}>
            
            {/* Mockup Toolbar Header */}
            <div style={{ background: 'var(--card-white)', padding: '0.75rem 1.25rem', borderBottom: '3.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              
              {/* Left Side: Mock Window Buttons + File Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', border: '1.5px solid var(--border-color)' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', border: '1.5px solid var(--border-color)' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '1.5px solid var(--border-color)' }}></span>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '850', fontFamily: 'monospace', background: 'var(--accent-yellow)', padding: '0.15rem 0.35rem', border: '1.5px solid var(--border-color)', borderRadius: '4px' }}>DIFF</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '750', fontFamily: 'monospace', color: 'var(--text-color)' }}>src/components/app/review.tsx</span>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800', background: 'rgba(16,185,129,0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px', border: '1.5px solid #10b981', marginLeft: '0.25rem' }}>+2</span>
                  <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '800', background: 'rgba(239,68,68,0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px', border: '1.5px solid #ef4444' }}>-2</span>
                </div>
              </div>

              {/* Right Side: Interactive Demo Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                
                {/* Viewed Checkbox */}
                <button 
                  onClick={() => setIsViewed(!isViewed)}
                  className="brutal-button" 
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', background: isViewed ? 'var(--accent-green)' : '#fff', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '6px' }}
                >
                  <input type="checkbox" checked={isViewed} readOnly style={{ marginRight: '4px', cursor: 'pointer' }} />
                  {isViewed ? 'Viewed' : 'Mark Viewed'}
                </button>

                {/* View Mode Toggle */}
                <button 
                  onClick={() => setIsSplit(!isSplit)}
                  className="brutal-button" 
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', background: '#fff', boxShadow: '2px 2px 0px var(--border-color)', borderRadius: '6px' }}
                >
                  Layout: <strong>{isSplit ? 'Split' : 'Unified'}</strong>
                </button>

                {/* Theme Selector */}
                <div style={{ display: 'flex', gap: '0.25rem', border: '2px solid var(--border-color)', padding: '0.15rem', borderRadius: '6px', background: '#fff' }}>
                  {(['dracula', 'night-owl', 'vs-dark'] as const).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setActiveTheme(theme)}
                      style={{
                        padding: '0.2rem 0.45rem',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        border: activeTheme === theme ? '1.5px solid var(--border-color)' : 'none',
                        borderRadius: '4px',
                        background: activeTheme === theme ? 'var(--accent-yellow)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      {theme === 'night-owl' ? 'nord' : theme === 'vs-dark' ? 'github' : theme}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Code Diff Display Pane */}
            <div 
              style={{ 
                background: styleTheme.bg, 
                color: '#fff', 
                fontFamily: '"SF Mono", "Fira Code", Monaco, Consolas, monospace', 
                fontSize: '0.82rem', 
                minHeight: '260px',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'auto'
              }}
            >
              
              {/* Header metadata row */}
              <div style={{ 
                background: styleTheme.gutterBg, 
                color: styleTheme.gutterText, 
                padding: '0.4rem 1rem', 
                borderBottom: `1.5px solid ${styleTheme.border}`,
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                @@ -14,6 +14,6 @@ const reviewPR = async (pr) =&gt; &#123;
              </div>

              {isSplit ? (
                /* â”€â”€â”€ SPLIT VIEW LAYOUT WITH REAL PRISM SYNTAX HIGHLIGHTING â”€â”€â”€ */
                <div style={{ display: 'flex', width: '100%', flexGrow: 1, minWidth: '780px' }}>
                  {/* Left Column (Original/Deleted) */}
                  <div style={{ width: '50%', borderRight: `2px solid ${styleTheme.border}`, display: 'flex', flexDirection: 'column' }}>
                    <Highlight theme={selectedTheme} code={leftSplitCode} language="tsx">
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {tokens.map((lineTokens, i) => {
                            const config = leftSplitLines[i];
                            if (config.type === 'spacer') {
                              return (
                                <div key={`left-spacer-${i}`} style={{ display: 'flex', height: '22px', background: 'rgba(0,0,0,0.06)' }}>
                                  <div style={{ width: '45px', background: styleTheme.gutterBg, borderRight: `1.5px solid ${styleTheme.border}` }}></div>
                                  <div style={{ flexGrow: 1 }}></div>
                                </div>
                              );
                            }

                            const isDel = config.type === 'deleted';
                            const rowBg = isDel ? styleTheme.deletedLineBg : 'transparent';
                            const gutterBg = isDel ? styleTheme.deletedBg : styleTheme.gutterBg;

                            return (
                              <div key={`left-line-${i}`} style={{ display: 'flex', height: '22px', background: rowBg, alignItems: 'center' }}>
                                <div style={{
                                  width: '45px',
                                  background: gutterBg,
                                  color: styleTheme.gutterText,
                                  textAlign: 'right',
                                  paddingRight: '0.6rem',
                                  userSelect: 'none',
                                  fontSize: '0.75rem',
                                  borderRight: `1.5px solid ${styleTheme.border}`,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end'
                                }}>
                                  {config.lineNum}
                                </div>
                                <div style={{
                                  paddingLeft: '0.75rem',
                                  whiteSpace: 'pre',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}>
                                  {isDel && <span style={{ color: '#ef4444', marginRight: '0.4rem', fontWeight: '800' }}>-</span>}
                                  {!isDel && <span style={{ marginRight: '0.4rem', opacity: 0 }}> </span>}
                                  {lineTokens.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Highlight>
                  </div>

                  {/* Right Column (Modified/Added) */}
                  <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                    <Highlight theme={selectedTheme} code={rightSplitCode} language="tsx">
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {tokens.map((lineTokens, i) => {
                            const config = rightSplitLines[i];
                            if (config.type === 'spacer') {
                              return (
                                <div key={`right-spacer-${i}`} style={{ display: 'flex', height: '22px', background: 'rgba(0,0,0,0.06)' }}>
                                  <div style={{ width: '45px', background: styleTheme.gutterBg, borderRight: `1.5px solid ${styleTheme.border}` }}></div>
                                  <div style={{ flexGrow: 1 }}></div>
                                </div>
                              );
                            }

                            const isAdd = config.type === 'added';
                            const rowBg = isAdd ? styleTheme.addedLineBg : 'transparent';
                            const gutterBg = isAdd ? styleTheme.addedBg : styleTheme.gutterBg;

                            return (
                              <div key={`right-line-${i}`} style={{ display: 'flex', height: '22px', background: rowBg, alignItems: 'center' }}>
                                <div style={{
                                  width: '45px',
                                  background: gutterBg,
                                  color: styleTheme.gutterText,
                                  textAlign: 'right',
                                  paddingRight: '0.6rem',
                                  userSelect: 'none',
                                  fontSize: '0.75rem',
                                  borderRight: `1.5px solid ${styleTheme.border}`,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end'
                                }}>
                                  {config.lineNum}
                                </div>
                                <div style={{
                                  paddingLeft: '0.75rem',
                                  whiteSpace: 'pre',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}>
                                  {isAdd && <span style={{ color: '#10b981', marginRight: '0.4rem', fontWeight: '800' }}>+</span>}
                                  {!isAdd && <span style={{ marginRight: '0.4rem', opacity: 0 }}> </span>}
                                  {lineTokens.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Highlight>
                  </div>
                </div>
              ) : (
                /* â”€â”€â”€ UNIFIED VIEW LAYOUT WITH REAL PRISM SYNTAX HIGHLIGHTING â”€â”€â”€ */
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1 }}>
                  <Highlight theme={selectedTheme} code={unifiedCode} language="tsx">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {tokens.map((lineTokens, i) => {
                          const config = unifiedLines[i];
                          const isAdd = config.type === 'added';
                          const isDel = config.type === 'deleted';
                          
                          let rowBg = 'transparent';
                          if (isAdd) rowBg = styleTheme.addedLineBg;
                          else if (isDel) rowBg = styleTheme.deletedLineBg;

                          return (
                            <div key={`unified-line-${i}`} style={{ display: 'flex', height: '22px', background: rowBg, alignItems: 'center' }}>
                              {/* Original left line number */}
                              <div style={{
                                width: '45px',
                                background: isDel ? styleTheme.deletedBg : styleTheme.gutterBg,
                                color: styleTheme.gutterText,
                                textAlign: 'right',
                                paddingRight: '0.65rem',
                                userSelect: 'none',
                                fontSize: '0.75rem',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                borderRight: `1px solid ${styleTheme.border}`
                              }}>
                                {config.leftLine}
                              </div>
                              {/* Modified right line number */}
                              <div style={{
                                width: '45px',
                                background: isAdd ? styleTheme.addedBg : styleTheme.gutterBg,
                                color: styleTheme.gutterText,
                                textAlign: 'right',
                                paddingRight: '0.65rem',
                                userSelect: 'none',
                                fontSize: '0.75rem',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                borderRight: `1.5px solid ${styleTheme.border}`
                              }}>
                                {config.rightLine}
                              </div>
                              {/* Code field */}
                              <div style={{
                                paddingLeft: '0.75rem',
                                whiteSpace: 'pre',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                              }}>
                                {isDel && <span style={{ color: '#ef4444', marginRight: '0.4rem', fontWeight: '800' }}>-</span>}
                                {isAdd && <span style={{ color: '#10b981', marginRight: '0.4rem', fontWeight: '800' }}>+</span>}
                                {!isDel && !isAdd && <span style={{ marginRight: '0.4rem', opacity: 0 }}> </span>}
                                {lineTokens.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Highlight>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* ─── Why Kensa (3-column info bar) ─── */}
      <section className="container" style={{ paddingBottom: '3rem' }}>
        <div className="brutal-card why-kensa-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div className="why-kensa-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} style={{ color: 'var(--accent-orange)' }} /> Bypasses <span className="highlight-orange">GitHub Caps</span>
            </h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              No more capped diff files. Kensa streams large pull requests seamlessly by processing raw patches.
            </p>
          </div>
          <div className="why-kensa-col why-kensa-col--border">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} style={{ color: 'var(--accent-blue)' }} /> Zero <span className="highlight-blue">UI Freezes</span>
            </h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Code highlighting and structure parsing are offloaded to background <code style={{ fontFamily: 'monospace', fontWeight: '800' }}>web workers</code>.
            </p>
          </div>
          <div className="why-kensa-col why-kensa-col--border">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={18} style={{ color: 'var(--accent-green)' }} /> Under <span className="highlight-green">2 MB</span>
            </h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Includes syntax support for <code style={{ fontFamily: 'monospace', fontWeight: '800' }}>100+ languages</code> and 50+ customizable styles in a minimal footprint.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GitHub Native vs Kensa Comparison Table ─── */}
      <section id="comparison" className="section" style={{ background: 'var(--card-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="brutal-badge brutal-badge--tilted" style={{ marginBottom: '0.75rem' }}>Feature Matchup</span>
            <h2>GitHub Native vs Kensa</h2>
            <p>Why modern development teams prefer reviewing patches with Kensa.</p>
          </div>

          <div className="brutal-card" style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: 'var(--card-cream)', borderBottom: '3px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', fontWeight: '800' }}>Feature</th>
                  <th style={{ padding: '1rem', fontWeight: '800', borderLeft: '3px solid var(--border-color)' }}>Native GitHub UI</th>
                  <th style={{ padding: '1rem', fontWeight: '800', borderLeft: '3px solid var(--border-color)', background: 'var(--bg-teal)' }}>Kensa Extension</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '3.5px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '800' }}>Loading Large PRs</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)' }}>Slow / Forces "Load Diff" button clicks</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)', fontWeight: '750', background: 'rgba(126,203,194,0.15)' }}>Instant prefetching of raw patches</td>
                </tr>
                <tr style={{ borderBottom: '3.5px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '800' }}>Diff View Limits</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)' }}>Caps files at 1MB or 20,000 lines</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)', fontWeight: '750', background: 'rgba(126,203,194,0.15)' }}>Unlimited local streaming limits</td>
                </tr>
                <tr style={{ borderBottom: '3.5px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '800' }}>Customization & Themes</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)' }}>2 styles (Light / Dark)</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)', fontWeight: '750', background: 'rgba(126,203,194,0.15)' }}>50+ Editor themes (Dracula, Nord, etc)</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: '800' }}>UI Freeze Status</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)' }}>High freeze rates on massive files</td>
                  <td style={{ padding: '1rem', borderLeft: '3px solid var(--border-color)', fontWeight: '750', background: 'rgba(126,203,194,0.15)' }}>Zero UI Freezes (Web Worker parsed)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Features Grid â”€â”€â”€ */}
      <section id="features" className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="brutal-badge brutal-badge--tilted" style={{ marginBottom: '0.75rem' }}>Features</span>
            <h2>Built for <span className="highlight-pink">Serious</span> Code Reviews</h2>
            <p>Everything you need to audit, inspect, and approve PRs at record speed.</p>
          </div>

          <div className="features-grid">
            
            {/* Feature 1: Scroll */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-orange)' }}>
                <FileText size={20} style={{ color: 'var(--accent-orange)' }} />
              </div>
              <h3>Continuous <span className="highlight-orange">Scroll</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Scroll entire PR diffs in one single continuous window layout. Avoid jumping back and forth.
              </p>
            </div>

            {/* Feature 2: Search */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-blue)' }}>
                <Search size={20} style={{ color: 'var(--accent-blue)' }} />
              </div>
              <h3>File <span className="highlight-blue">Search</span> Panel</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Quickly locate changed files with a real-time sidebar directory tree with comment badges.
              </p>
            </div>

            {/* Feature 3: Batch reviews */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-yellow)' }}>
                <MessageSquare size={20} style={{ color: 'var(--accent-yellow)' }} />
              </div>
              <h3>Batch <span className="highlight-yellow">Review</span> Comments</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Draft review comments locally, and commit everything together as a single review review step.
              </p>
            </div>

            {/* Feature 4: viewed progress */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-green)' }}>
                <CheckSquare size={20} style={{ color: 'var(--accent-green)' }} />
              </div>
              <h3>Viewed <span className="highlight-green">Checkboxes</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Easily collapse finished review files. Checked states sync back directly with GitHub.
              </p>
            </div>

            {/* Feature 5: split or unified */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-pink)' }}>
                <Columns2 size={20} style={{ color: 'var(--accent-pink)' }} />
              </div>
              <h3>Split or <span className="highlight-pink">Unified</span> View</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Toggle side-by-side split screen and stacked layout in real-time with keyboard shortcuts.
              </p>
            </div>

            {/* Feature 6: Themes (With actual color swatches gallery) */}
            <div className="brutal-card">
              <div className="feature-icon-wrapper" style={{ borderColor: 'var(--accent-orange)' }}>
                <Palette size={20} style={{ color: 'var(--accent-orange)' }} />
              </div>
              <h3>50+ <span className="highlight-orange">Editor Themes</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Pick comfortable styling presets optimized for night and day review sessions.
              </p>
              
              {/* Mini Color Swatches Gallery */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.8rem' }}>
                {/* Dracula swatch */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1.5px solid var(--border-color)', borderRadius: '4px', padding: '2px', background: '#282a36' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff79c6' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#50fa7b' }}></span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', textAlign: 'center', opacity: 0.8 }}>Dracula</span>
                </div>
                {/* Nord swatch */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1.5px solid var(--border-color)', borderRadius: '4px', padding: '2px', background: '#011627' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#82aaff' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ecc48d' }}></span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', textAlign: 'center', opacity: 0.8 }}>NightOwl</span>
                </div>
                {/* VS Dark swatch */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1.5px solid var(--border-color)', borderRadius: '4px', padding: '2px', background: '#1e1e1e' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#569cd6' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ec9b0' }}></span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', textAlign: 'center', opacity: 0.8 }}>VSDark</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ How It Works (With step illustrations/mockups) â”€â”€â”€ */}
      <section id="how-it-works" className="section section--dark">
        <div className="container">
          <div className="section-header">
            <span className="brutal-badge brutal-badge--tilted" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Settings size={12} /> Workflow
            </span>
            <h2>How It Works</h2>
            <p>From first install to your next PR approval in four steps.</p>
          </div>
          <div className="steps-list">
            
            {/* Step 1 */}
            <div className="step-card step-card--orange">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="step-number">1</div>
                {/* Illustration Mockup: Address bar with extension logo */}
                <div style={{ border: '2px solid rgba(255,255,255,0.25)', padding: '0.4rem 0.6rem', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></span>
                  <div style={{ flexGrow: 1, height: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }}></div>
                  <div style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src="/logo.png" alt="Kensa" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.22)' }} />
                  </div>
                </div>
              </div>
              <h3>Install <span className="highlight-orange">Extension</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Download Kensa from the web store and enable it in your browser.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card step-card--pink">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="step-number">2</div>
                {/* Illustration Mockup: Input box for Token */}
                <div style={{ border: '2px solid rgba(255,255,255,0.25)', padding: '0.4rem 0.6rem', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--accent-pink)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>ghp_â€¢â€¢â€¢â€¢</span>
                </div>
              </div>
              <h3>Configure <span className="highlight-pink">Token</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Paste your GitHub Personal Access Token securely into the popup.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card step-card--blue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="step-number">3</div>
                {/* Illustration Mockup: Mini GitHub Button Mock */}
                <div style={{ border: '2px solid rgba(255,255,255,0.3)', padding: '0.3rem 0.6rem', borderRadius: '8px', background: 'var(--accent-green)', color: '#1a1a2e', fontSize: '0.68rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '3px', boxShadow: '2px 2px 0px rgba(0,0,0,0.25)' }}>
                  <Sparkles size={11} /> View Diff
                </div>
              </div>
              <h3>Click <span className="highlight-blue">View Diff</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Click Kensa's button on GitHub's toolbar to open the full-screen viewer.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card step-card--green">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="step-number">4</div>
                {/* Illustration Mockup: Checklist list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.5rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.15)', width: '60px' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-green)' }}><Check size={8} style={{ color: '#1a1a2e', strokeWidth: '4px' }} /></span>
                    <span style={{ width: '22px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-green)' }}><Check size={8} style={{ color: '#1a1a2e', strokeWidth: '4px' }} /></span>
                    <span style={{ width: '14px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></span>
                  </div>
                </div>
              </div>
              <h3>Inspect & <span className="highlight-green">Review</span></h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Audit files, post threads, and submit reviews. Instantly syncs with GitHub.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€â”€ FAQ â”€â”€â”€ */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <span className="brutal-badge brutal-badge--tilted" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <HelpCircle size={12} /> Questions
            </span>
            <h2>Frequently Asked</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="brutal-card faq-item"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  {activeFaq === index ? (
                    <ChevronUp size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
                  )}
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p style={{ fontSize: '0.9rem' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Meet the Mascot (Original Compact Card) â”€â”€â”€ */}
      <section className="section section--cream" style={{ padding: '5rem 0', borderBottom: 'var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="brutal-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem', 
            padding: '2.25rem 2.5rem', 
            maxWidth: '640px', 
            width: '100%', 
            background: 'var(--card-white)', 
            boxShadow: '8px 8px 0px var(--border-color)', 
            borderRadius: '16px', 
            border: '3px solid var(--border-color)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            
            {/* Mascot Pebble wrapper with hover animation */}
            <div className="logo-pebble" style={{ 
              width: '100px', 
              height: '100px', 
              boxShadow: '4px 4px 0px var(--border-color)',
              flexShrink: 0 
            }}>
              <img src="/logo.png" alt="Inspector Raccoon" />
            </div>

            {/* Mascot details */}
            <div style={{ flex: '1', minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ textTransform: 'none', margin: 0, fontFamily: 'Bricolage Grotesque', fontSize: '1.45rem', fontWeight: '850', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-yellow)', fill: 'var(--accent-yellow)' }} />
                  Meet Inspector Raccoon
                </h3>
                <span className="brutal-badge brutal-badge--tilted" style={{ background: 'var(--accent-pink)', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.45rem', border: '1.5px solid var(--border-color)', display: 'inline-flex' }}>Official Mascot</span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0 0 0.75rem 0' }}>
                Meet Kensa's official helper! Built directly into the review overlay's error panel, the inspector diagnostics pop up whenever GitHub rate-limits you or a patch fails to load.
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--accent-orange)', background: 'rgba(239, 68, 68, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1.5px solid rgba(239, 68, 68, 0.15)', width: '100%' }}>
                <span>ðŸ¦</span> Friendly diagnostics, immediate PAT token setup, &amp; instant retries.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        {/* Giant KENSA curved animated watermark */}
        <FooterWatermark />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="footer-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="brand">
                <div className="logo-square">
                  <img src="/logo.png" alt="Kensa" />
                </div>
                <span className="brand-title" style={{ color: '#fff' }}>Kensa</span>
              </div>
              <p style={{ maxWidth: '300px', fontSize: '0.85rem' }}>
                Ultra-fast GitHub PR diff viewer. Built for developers who value speed and clarity.
              </p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="https://github.com/codewithevilxd/kensa" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub</a></li>
                <li><a href="mailto:codewithevilxd@gmail.com">Email</a></li>
                <li><a href="https://nishantdev.space" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>nishantdev.space <ExternalLink size={11} /></a></li>
                <li><a href="https://rajdev.me" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>rajdev.me <ExternalLink size={11} /></a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Kensa · Built with 🦝 by <a href="https://nishantdev.space" target="_blank" rel="noopener noreferrer">Nishant Gaurav</a></p>
            <p>MIT Licensed · Open Source</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
