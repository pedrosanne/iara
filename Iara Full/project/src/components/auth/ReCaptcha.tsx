import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
}

export const ReCaptcha = ({ onVerify }: ReCaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;

    window.onRecaptchaLoad = () => {
      if (containerRef.current) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Demo key for testing
          theme: 'dark',
          callback: onVerify,
        });
      }
    };

    script.onload = window.onRecaptchaLoad;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onRecaptchaLoad;
    };
  }, [onVerify]);

  return <div ref={containerRef} className="mt-4" />;
};