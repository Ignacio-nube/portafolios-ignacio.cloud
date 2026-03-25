'use client';

import { Github, Linkedin, Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-[1] py-8 px-6 border-t border-[#111111]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cloud size={14} className="text-[#00E5FF]" strokeWidth={2} />
          <span className="font-mono text-xs text-[#333333]">
            © 2025 ignacio.cloud
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/ignaciomarquez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#333333] hover:text-[#888888] transition-colors duration-200"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/ignaciomarquez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#333333] hover:text-[#888888] transition-colors duration-200"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
