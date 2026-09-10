'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main-content" className="wrap page-space empty-state"><h1>A little pause.</h1><p>We couldn’t load this page. Please try again.</p><button className="button" onClick={reset}>Try again</button></main>}
