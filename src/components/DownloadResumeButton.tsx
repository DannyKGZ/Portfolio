import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, DownloadSimple } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { trackGoal } from '@/lib/analytics';

type Status = 'idle' | 'loading' | 'done';

const DOWNLOAD_DURATION_MS = 1100;
const DONE_RESET_MS = 2500;

const DownloadResumeButton = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resetTimerRef.current);
    };
  }, []);

  const triggerDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = PROFILE.resumePath;
    link.download = PROFILE.resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleClick = useCallback(() => {
    if (status !== 'idle') return;

    trackGoal('resume_download');
    setStatus('loading');
    setProgress(0);

    const start = performance.now();

    const animate = (now: number) => {
      const nextProgress = Math.min(100, Math.round(((now - start) / DOWNLOAD_DURATION_MS) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      triggerDownload();
      setStatus('done');

      resetTimerRef.current = setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, DONE_RESET_MS);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [status, triggerDownload]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === 'loading'}
      className={`btn-outline btn-download-resume${status === 'done' ? ' btn-download-resume--done' : ''}`}
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      <span
        className="btn-download-resume__fill"
        style={{ width: `${status === 'idle' ? 0 : progress}%` }}
        aria-hidden
      />
      <span className="btn-download-resume__label">
        {status === 'done' ? (
          <>
            <Check size={18} weight="bold" />
            100%
          </>
        ) : status === 'loading' ? (
          `${progress}%`
        ) : (
          <>
            <DownloadSimple size={18} />
            Скачать резюме
          </>
        )}
      </span>
    </button>
  );
};

export default DownloadResumeButton;
