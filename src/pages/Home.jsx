import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FileText, Menu } from 'lucide-react';
import { TubesBackground } from '../components/TubesBackground/TubesBackground';
import { HamburgerMenu } from '../components/HamburgerMenu/HamburgerMenu';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const FIRST_NAME = 'SOUMIK'.split('');
const LAST_NAME = 'CHAKRABORTY'.split('');

export default function Home({ onOpenResume }) {
  useDocumentMeta(
    'Soumik Chakraborty',
    'Interactive 3D portfolio homepage of Soumik Chakraborty — Full-Stack Developer and AI Application Developer.'
  );

  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);

  const renderAnimatedWord = (letters, startIndex) =>
    letters.map((char, offset) => {
      const idx = startIndex + offset;
      return (
        <motion.span
          key={`${char}-${idx}`}
          className="inline-block will-change-[transform,opacity,filter]"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, filter: 'blur(12px)', scale: 0.92, y: 8 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.65,
            delay: shouldReduceMotion ? 0 : 0.045 * idx,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      );
    });

  return (
    <section
      aria-label="Soumik Chakraborty"
      className="relative h-dvh min-h-[100dvh] w-full overflow-hidden bg-[#0a0814]"
    >
      {/* Top-right floating Menu trigger for quick access to all pages */}
      <button
        ref={menuTriggerRef}
        type="button"
        data-hero-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(true);
        }}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
        className="no-print fixed top-5 right-5 z-30 inline-flex h-11 items-center gap-2 rounded-2xl border border-[#d2c4f5]/40 bg-[rgba(16,13,28,0.68)] px-4 text-sm font-medium tracking-wide text-[#f5f3ff] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d2c4f5]/80 hover:bg-[rgba(124,109,170,0.34)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d2c4f5] sm:top-7 sm:right-8"
        style={{
          boxShadow:
            '0 10px 26px -10px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        }}
      >
        <Menu className="h-4 w-4 text-[#d2c4f5]" aria-hidden="true" />
        <span>Menu</span>
      </button>

      <TubesBackground className="h-full w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.97 }}
            animate={{ scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[2.2rem] leading-[1.06] font-extrabold tracking-[0.07em] uppercase text-[#f5f3ff] sm:gap-x-6 sm:text-[3.35rem] md:text-[3.85rem] lg:flex-nowrap lg:text-[4.25rem] xl:text-[4.85rem]"
            style={{
              textShadow:
                '0 0 32px rgba(184, 167, 232, 0.42), 0 0 68px rgba(124, 109, 170, 0.3), 0 2px 16px rgba(10, 8, 20, 0.88)',
            }}
          >
            <span className="inline-flex whitespace-nowrap">
              {renderAnimatedWord(FIRST_NAME, 0)}
            </span>
            <span className="inline-flex whitespace-nowrap">
              {renderAnimatedWord(LAST_NAME, FIRST_NAME.length)}
            </span>
          </motion.h1>

          <motion.div
            data-hero-interactive="true"
            onClick={(e) => e.stopPropagation()}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, filter: 'blur(8px)', scale: 0.98 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.18 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:mt-12 sm:gap-4"
          >
            <Link
              to="/projects"
              onClick={(e) => e.stopPropagation()}
              className="group inline-flex h-12 items-center gap-2.5 rounded-2xl border border-[#d2c4f5]/50 px-6 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d2c4f5]/85 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d2c4f5] whitespace-nowrap shrink-0 sm:px-7 sm:text-[0.95rem]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(155, 142, 196, 0.72) 0%, rgba(124, 109, 170, 0.88) 100%)',
                boxShadow:
                  '0 12px 32px -8px rgba(139, 114, 201, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
              }}
            >
              <span>View Projects</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenResume?.();
              }}
              className="group inline-flex h-12 items-center gap-2.5 rounded-2xl border border-[#d2c4f5]/45 bg-[rgba(16,13,28,0.68)] px-6 text-sm font-medium tracking-wide text-[#f5f3ff] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d2c4f5]/80 hover:bg-[rgba(124,109,170,0.34)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d2c4f5] whitespace-nowrap shrink-0 sm:px-6 sm:text-[0.95rem]"
              style={{
                boxShadow:
                  '0 10px 26px -10px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
              }}
            >
              <FileText
                className="h-4 w-4 text-[#d2c4f5] transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              />
              <span>Resume</span>
            </button>

            <Link
              to="/contact"
              onClick={(e) => e.stopPropagation()}
              className="group relative inline-flex h-12 items-center gap-2 rounded-2xl border border-[#9b8ec4]/45 bg-[rgba(12,10,22,0.68)] px-6 text-sm font-medium tracking-wide text-[#e5dcfb] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d2c4f5]/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d2c4f5] whitespace-nowrap shrink-0 sm:px-6 sm:text-[0.95rem]"
              style={{
                boxShadow: '0 10px 26px -10px rgba(0, 0, 0, 0.72)',
              }}
            >
              <span className="relative">
                Contact Me
                <span
                  aria-hidden="true"
                  className="absolute right-0 -bottom-0.5 left-0 h-[1.5px] origin-left scale-x-0 bg-[#d2c4f5] transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-[#b8a7e8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </TubesBackground>

      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuTriggerRef}
        onOpenResume={onOpenResume}
      />
    </section>
  );
}
