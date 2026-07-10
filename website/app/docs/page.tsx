'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap, Settings, MessageSquare, Keyboard, AlertTriangle,
  ExternalLink, ArrowRight, Eye, Shield, Terminal, BookOpen,
  Code, RefreshCw, Cpu
} from 'lucide-react';
import FooterWatermark from '../components/FooterWatermark';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');

  // Multi-color cute brush highlighter helper component (with clean padding and fit-content styling)
  const Highlight = ({ children, color = 'yellow' }: { children: React.ReactNode, color?: 'yellow' | 'pink' | 'blue' | 'green' }) => {
    let gradient = 'linear-gradient(100deg, rgba(245, 212, 90, 0.15) 1%, rgba(245, 212, 90, 0.85) 6%, rgba(245, 212, 90, 0.9) 92%, rgba(245, 212, 90, 0.2) 98%)'; // yellow
    
    if (color === 'pink') {
      gradient = 'linear-gradient(100deg, rgba(240, 143, 160, 0.15) 1%, rgba(240, 143, 160, 0.85) 6%, rgba(240, 143, 160, 0.9) 92%, rgba(240, 143, 160, 0.2) 98%)';
    } else if (color === 'blue') {
      gradient = 'linear-gradient(100deg, rgba(107, 170, 220, 0.15) 1%, rgba(107, 170, 220, 0.85) 6%, rgba(107, 170, 220, 0.9) 92%, rgba(107, 170, 220, 0.2) 98%)';
    } else if (color === 'green') {
      gradient = 'linear-gradient(100deg, rgba(74, 186, 122, 0.15) 1%, rgba(74, 186, 122, 0.85) 6%, rgba(74, 186, 122, 0.9) 92%, rgba(74, 186, 122, 0.2) 98%)';
    }

    return (
      <span style={{
        background: gradient,
        padding: '0.15rem 0.4rem',
        borderRadius: '6px',
        fontWeight: '800',
        color: 'var(--border-color)',
        display: 'inline',
        lineHeight: '1.2',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone'
      }}>
        {children}
      </span>
    );
  };

  return (
    <div className="docs-page">
      {/* ─── Navbar ─── */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <Link href="/" className="brand docs-navbar-brand">
              <div className="logo-square">
                <img src="/logo.png" alt="Kensa" />
              </div>
              <span className="brand-title">Kensa</span>
            </Link>
            <span className="brutal-badge docs-badge">Docs v1.0.0</span>
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link nav-link-home">Home</Link>
            <a
              href="https://github.com/codewithevilxd/kensa"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-button brutal-button-primary docs-github-cta"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Header Hero ─── */}
      <header className="docs-hero">
        <div className="hero-watermark-wrap">
          <svg viewBox="0 0 1200 240" xmlns="http://www.w3.org/2000/svg" className="hero-watermark-svg">
            <path id="hero-curve" d="M 50,150 L 1150,150" fill="none" />
            <text fill="#ffffff" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '130px', fontWeight: 950, letterSpacing: '2px', textAnchor: 'middle' }}>
              <textPath xlinkHref="#hero-curve" startOffset="50%">
                documentation
              </textPath>
            </text>
          </svg>
        </div>

        <div className="container hero-inner">
          <div className="hero-badge-wrap">
            <span className="hero-badge">GUIDES &amp; SPECS</span>
          </div>
          
          <h1 className="docs-hero-title">
            <span className="docs-hero-title-highlight">
              Kensa Documentation
            </span>
          </h1>

          <p className="docs-hero-subtitle">
            Explore deep architecture insights, custom settings, advanced hotkeys, and rate limit optimizations to supercharge your pull requests.
          </p>
        </div>
      </header>

      {/* ─── Docs Layout ─── */}
      <main className="container docs-layout docs-main">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <div className="brutal-card docs-sidebar-card">
            <div className="docs-nav-group">
              <span className="docs-group-title" style={{ color: 'var(--accent-orange)', fontSize: '0.7rem', letterSpacing: '0.12em', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><BookOpen size={12} /> CORE GUIDES</span>
              <a href="#getting-started" className={`docs-nav-link ${activeSection === 'getting-started' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('getting-started')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Getting Started</a>
              <a href="#configuration" className={`docs-nav-link ${activeSection === 'configuration' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('configuration')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Token Setup</a>
            </div>
            
            <div className="docs-nav-group" style={{ marginTop: '1.75rem' }}>
              <span className="docs-group-title" style={{ color: 'var(--accent-pink)', fontSize: '0.7rem', letterSpacing: '0.12em', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Code size={12} /> FEATURES IN-DEPTH</span>
              <a href="#split-view" className={`docs-nav-link ${activeSection === 'split-view' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('split-view')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Dual Diff Split View</a>
              <a href="#batch-reviews" className={`docs-nav-link ${activeSection === 'batch-reviews' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('batch-reviews')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Batch Comments</a>
              <a href="#shortcuts" className={`docs-nav-link ${activeSection === 'shortcuts' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('shortcuts')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Keyboard Shortcuts</a>
            </div>

            <div className="docs-nav-group" style={{ marginTop: '1.75rem' }}>
              <span className="docs-group-title" style={{ color: 'var(--accent-green)', fontSize: '0.7rem', letterSpacing: '0.12em', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Cpu size={12} /> UNDER THE HOOD</span>
              <a href="#architecture" className={`docs-nav-link ${activeSection === 'architecture' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('architecture')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Architecture Details</a>
              <a href="#rate-limits" className={`docs-nav-link ${activeSection === 'rate-limits' ? 'docs-nav-link-active' : ''}`} onClick={() => setActiveSection('rate-limits')} style={{ fontWeight: '700', fontSize: '0.95rem' }}>Rate Limit Tuning</a>
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="docs-content" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Section: Getting Started */}
          <div id="getting-started" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <Zap size={24} style={{ color: 'var(--accent-orange)' }} /> Getting Started
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Kensa integrates <Highlight color="yellow">seamlessly directly</Highlight> into your GitHub pull request page. It replaces the default sluggish, page-heavy diff rendering engine with a <Highlight color="blue">lightning-fast custom view client</Highlight> to minimize code review fatigue.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { step: "01", title: "Installation", desc: "Install the Kensa extension from the official Chrome Web Store or Firefox Add-ons repository. Alternatively, developers can download the latest unpacked development zip directly from our GitHub releases panel." },
                { step: "02", title: "Token Generation", desc: "Generate a secure GitHub Personal Access Token (PAT) with read permissions. This is critical to bypass standard API rate limiting configurations." },
                { step: "03", title: "Instant Activation", desc: "Open any pull request page on GitHub. The extension injects a highly visible 'View with Kensa' button onto the files toolbar for instant launching." }
              ].map((item, idx) => (
                <div key={idx} className="docs-step-card">
                  <span style={{ fontSize: '1.65rem', fontWeight: '950', color: 'var(--accent-orange)', fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: '1' }}>{item.step}</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', fontWeight: '900', fontSize: '1.15rem', color: 'var(--border-color)', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.975rem', lineHeight: '1.75', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Configuration */}
          <div id="configuration" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <Settings size={24} style={{ color: 'var(--accent-orange)' }} /> Token Configuration
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              To review private repositories or avoid request limitations, configure a <Highlight color="pink">GitHub Classic PAT</Highlight>. Kensa stores this token <Highlight color="yellow">strictly in the local sandboxed</Highlight> browser storage to ensure complete data privacy.
            </p>
            
            <div style={{ background: 'rgba(232, 145, 79, 0.05)', border: '2.5px solid var(--border-color)', padding: '1.5rem', borderRadius: '12px', margin: '1rem 0 1.5rem 0', boxShadow: '4px 4px 0px var(--border-color)' }}>
              <h5 style={{ margin: '0 0 0.45rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--border-color)', fontWeight: '900', fontSize: '1.05rem', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                <Shield size={18} style={{ color: 'var(--accent-orange)' }} /> RECOMMENDED SECURITY SCOPES
              </h5>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                Ensure you check the <Highlight color="green">repo scope checkbox</Highlight> when creating classic tokens. If you only review public-facing codebases, you can leave all checkboxes blank to create a public-only token.
              </p>
            </div>

            <div className="code-block code-block--path">
              <span className="code-block-pathway">PATHWAY</span>
              GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
            </div>
          </div>

          {/* Section: Split View */}
          <div id="split-view" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <Eye size={24} style={{ color: 'var(--accent-orange)' }} /> Dual Split View
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Kensa features a fully customizable side-by-side split layout to review changes <Highlight color="blue">without side-scrolling</Highlight>. This speeds up cognitive processing times for developers during code checkups.
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.75' }}>
              <li><strong>Toggle Split:</strong> Switch between Unified (single column inline) and Split views at the press of a hotkey.</li>
              <li><strong>Responsive Wrapping:</strong> Long lines wrap automatically to avoid awkward horizontally scrolling text containers.</li>
              <li><strong>Syntax Highlight:</strong> Fully optimized Prism rendering themes that <Highlight color="pink">seamlessly match</Highlight> your code editor style.</li>
            </ul>
          </div>

          {/* Section: Batch Reviews */}
          <div id="batch-reviews" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <MessageSquare size={24} style={{ color: 'var(--accent-orange)' }} /> Batch Review Pipeline
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Reduce email spam and noise on your repository by saving comments locally inside the browser. Submit them all as a <Highlight color="green">single unified review</Highlight>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#fefcf5', padding: '1.5rem', borderRadius: '12px', border: '2.5px solid var(--border-color)', boxShadow: '4px 4px 0px var(--border-color)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--border-color)', fontSize: '1.15rem', fontWeight: '900', fontFamily: "'Bricolage Grotesque', sans-serif" }}>Local Queuing</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>Write reviews file-by-file and click "Queue Comment". Your reviews are staged <Highlight color="yellow">safely in local storage</Highlight> without publishing immediately.</p>
              </div>
              <div style={{ background: '#fefcf5', padding: '1.5rem', borderRadius: '12px', border: '2.5px solid var(--border-color)', boxShadow: '4px 4px 0px var(--border-color)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--border-color)', fontSize: '1.15rem', fontWeight: '900', fontFamily: "'Bricolage Grotesque', sans-serif" }}>Single Submit</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>Click the final submit review button, select a status (Approve, Comment, or Request Changes), and post the <Highlight color="blue">complete review batch</Highlight>.</p>
              </div>
            </div>
          </div>

          {/* Section: Shortcuts */}
          <div id="shortcuts" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <Keyboard size={24} style={{ color: 'var(--accent-orange)' }} /> Keyboard Navigation
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Increase your velocity with zero-mouse interaction shortcuts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: "J", action: "Move select highlight to the next file card in list" },
                { key: "K", action: "Move select highlight to the previous file card in list" },
                { key: "Tab", action: "Toggle split view layout vs inline unified view" },
                { key: "Esc", action: "Exit active editor panels or fullscreen overlay models" }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#fefcf5', borderRadius: '10px', border: '2.5px solid var(--border-color)', boxShadow: '3px 3px 0px var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <kbd style={{
                      display: 'inline-block',
                      padding: '0.45rem 0.8rem',
                      fontFamily: 'monospace',
                      fontSize: '0.95rem',
                      fontWeight: '800',
                      background: '#fff',
                      color: 'var(--border-color)',
                      border: '2.5px solid var(--border-color)',
                      borderRadius: '6px',
                      boxShadow: '2px 2px 0px var(--border-color)',
                      minWidth: '40px',
                      textAlign: 'center',
                      lineHeight: '1'
                    }}>{item.key}</kbd>
                  </div>
                  <span style={{ fontSize: '0.975rem', fontWeight: '700', color: 'var(--text-muted)' }}>{item.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Architecture */}
          <div id="architecture" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <Terminal size={24} style={{ color: 'var(--accent-orange)' }} /> Architecture & Web Workers
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              GitHub normally builds HTML trees sequentially. On massive code changes, rendering locks the main thread and freezes the tab. Kensa <Highlight color="pink">bypasses this constraint completely</Highlight>.
            </p>

            {/* Visual Workflow / Flowchart Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fefcf5', padding: '1.75rem', borderRadius: '12px', border: '2.5px solid var(--border-color)', marginBottom: '2rem', boxShadow: '4px 4px 0px var(--border-color)' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '800', fontSize: '1.1rem', color: 'var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Cpu size={16} style={{ color: 'var(--accent-orange)' }} /> ASYNCHRONOUS DATA FLOW MAP
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                <div className="docs-flow-step">
                  <div className="box-fixed box-accent">GitHub API Call</div>
                  <span className="arrow-desktop">→</span>
                  <span className="arrow-mobile">↓</span>
                  <div className="box-fluid">Retrieves raw diff patches</div>
                </div>

                <div className="docs-flow-step">
                  <div className="box-fixed box-dark">Web Worker (Bg)</div>
                  <span className="arrow-desktop">→</span>
                  <span className="arrow-mobile">↓</span>
                  <div className="box-fluid">Parses files <Highlight color="blue">concurrently</Highlight> into virtual AST segments</div>
                </div>

                <div className="docs-flow-step">
                  <div className="box-fixed box-accent">Virtual Scroller</div>
                  <span className="arrow-desktop">→</span>
                  <span className="arrow-mobile">↓</span>
                  <div className="box-fluid">Renders DOM incrementally inside <Highlight color="yellow">viewport only</Highlight></div>
                </div>
              </div>
            </div>

            <div className="flow-grid">
              {[
                { title: "Parallel Diff Parsing", desc: "Raw patches are transferred directly to background Web Workers. The worker threads parse diff changes into virtual AST objects asynchronously without ever halting UI frames." },
                { title: "Incremental DOM Render", desc: "Parsed structures are rendered on the UI main thread using virtual scrolling. Only the code lines visible in your active viewport are drawn, enabling infinite-length files." }
              ].map((item, idx) => (
                <div key={idx} className="flow-card">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Rate Limits */}
          <div id="rate-limits" className="brutal-card docs-section">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', color: 'var(--border-color)' }}>
              <AlertTriangle size={24} style={{ color: 'var(--accent-orange)' }} /> Rate Limit Tuning
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Anonymous public API requests on GitHub are limited to <Highlight color="pink">60 requests per hour</Highlight>. These requests are identified by your IP address. High-volume review cycles can exhaust this limit instantly.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Authenticating with your Personal Access Token increases your quota to <Highlight color="green">5,000 requests per hour</Highlight>. Kensa monitors API quota dynamically and prints usage metrics directly inside the diagnostics panel.
            </p>
          </div>

        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="footer" style={{ marginTop: '5rem' }}>
        <div className="container" style={{ position: 'relative' }}>
          <FooterWatermark />
          <div className="footer-grid" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="logo-square" style={{ borderRadius: '10px' }}>
                  <img src="/logo.png" alt="Kensa" />
                </div>
                <span className="brand-title" style={{ color: '#fff', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: '900' }}>Kensa</span>
              </Link>
              <p style={{ maxWidth: '300px', fontSize: '0.85rem' }}>
                Ultra-fast GitHub PR diff viewer. Built for developers who value <span style={{ background: '#f5d45a', padding: '0.25rem 0.75rem', fontWeight: '800', color: '#1a1a2e', borderRadius: '95% 4% 92% 5% / 4% 95% 6% 95%', display: 'inline-block', transform: 'rotate(-1.5deg)', border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px var(--border-color)' }}>speed and clarity</span>.
              </p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link href="/">Home</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="https://github.com/codewithevilxd/kensa" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub</a></li>
                <li><a href="mailto:codewithevilxd@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>Email</a></li>
                <li><a href="https://nishantdev.space" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>nishantdev.space <ExternalLink size={11} /></a></li>
                <li><a href="https://rajdev.me" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>rajdev.me <ExternalLink size={11} /></a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ position: 'relative', zIndex: 1 }}>
            <p>© {new Date().getFullYear()} Kensa · Built with 🦝 by <a href="https://nishantdev.space" target="_blank" rel="noopener noreferrer" style={{ background: '#f08fa0', padding: '0.25rem 0.75rem', fontWeight: '800', color: '#1a1a2e', borderRadius: '95% 4% 92% 5% / 4% 95% 6% 95%', display: 'inline-block', transform: 'rotate(1.5deg)', border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px var(--border-color)' }}>Nishant Gaurav</a></p>
            <p><span style={{ background: '#6baadc', padding: '0.25rem 0.75rem', fontWeight: '800', color: '#1a1a2e', borderRadius: '95% 4% 92% 5% / 4% 95% 6% 95%', display: 'inline-block', transform: 'rotate(-1.2deg)', border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px var(--border-color)' }}>MIT Licensed</span> · Open Source</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
