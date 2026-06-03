import { useState } from 'react';

const btnBase = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  border: 'none',
  transition: 'transform 0.2s ease',
  textDecoration: 'none',
};

const labelStyle = {
  background: '#1e293b',
  color: '#fff',
  fontSize: '12px',
  padding: '4px 10px',
  borderRadius: '6px',
  whiteSpace: 'nowrap',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  pointerEvents: 'none',
};

const SupportButton = () => {
  const [open, setOpen] = useState(false);
  const [whatsappHover, setWhatsappHover] = useState(false);
  const [telegramHover, setTelegramHover] = useState(false);
  const [mainHover, setMainHover] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {/* WhatsApp */}
      {open && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideUp 0.2s ease',
          }}
        >
          {whatsappHover && <span style={labelStyle}>WhatsApp</span>}
          <a
            href="https://wa.me/251924384865"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onMouseEnter={() => setWhatsappHover(true)}
            onMouseLeave={() => setWhatsappHover(false)}
            style={{
              ...btnBase,
              background: '#25D366',
              transform: whatsappHover ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      )}

      {/* Telegram */}
      {open && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideUp 0.15s ease',
          }}
        >
          {telegramHover && <span style={labelStyle}>Telegram</span>}
          <a
            href="https://t.me/Yeabsega"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on Telegram"
            onMouseEnter={() => setTelegramHover(true)}
            onMouseLeave={() => setTelegramHover(false)}
            style={{
              ...btnBase,
              background: '#0088cc',
              transform: telegramHover ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>
      )}

      {/* Main support button */}
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setMainHover(true)}
        onMouseLeave={() => setMainHover(false)}
        aria-label="Support Center"
        style={{
          ...btnBase,
          width: '56px',
          height: '56px',
          background: open ? '#475569' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
          boxShadow: '0 4px 16px rgba(59,130,246,0.45)',
          transform: mainHover ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {open ? (
          /* Close X */
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Headset icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SupportButton;
