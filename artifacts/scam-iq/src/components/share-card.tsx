import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Trophy } from 'lucide-react';

interface ShareCardProps {
  score: number;
  badge: string;
  correctCount?: number;
}

const BADGE_COLOR: Record<string, string> = {
  'Human Firewall': '#34D399',
  'Fraud Fighter': '#38BDF8',
  'Scam Spotter': '#FBBF24',
  'Cautious Clicker': '#FB923C',
  'Easy Target': '#FF4D6D',
};

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(
  ({ score, badge, correctCount }, ref) => {
    const badgeColor = BADGE_COLOR[badge] ?? '#38BDF8';
    const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://scamiq.app';

    return (
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none" aria-hidden="true">
        <div
          ref={ref}
          style={{
            width: '420px',
            height: '560px',
            background: 'linear-gradient(145deg, #0B1020 0%, #0F172A 60%, #0B1020 100%)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow orbs */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '240px', height: '240px',
            background: `radial-gradient(circle, ${badgeColor}22 0%, transparent 70%)`,
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, #38BDF822 0%, transparent 70%)',
            borderRadius: '50%',
          }} />

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '24px 28px 0',
            position: 'relative', zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#38BDF820', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield style={{ width: '18px', height: '18px', color: '#38BDF8' }} />
              </div>
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 900,
                fontSize: '20px', letterSpacing: '-0.5px', color: '#F8FAFC',
              }}>
                Scam<span style={{ color: '#38BDF8' }}>IQ</span>
              </span>
            </div>
            <span style={{
              fontSize: '11px', color: '#94A3B8', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>
              Challenge Result
            </span>
          </div>

          {/* Main score */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 28px', position: 'relative', zIndex: 10,
          }}>
            <span style={{
              fontSize: '13px', fontWeight: 700, color: '#64748B',
              textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px',
            }}>
              My ScamIQ Score
            </span>

            <div style={{
              fontSize: '108px', fontWeight: 900, lineHeight: 1,
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              background: `linear-gradient(135deg, #38BDF8, ${badgeColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
            }}>
              {score}
            </div>

            {/* Badge pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: `${badgeColor}18`,
              border: `1.5px solid ${badgeColor}50`,
              borderRadius: '999px', padding: '8px 20px', marginBottom: '24px',
            }}>
              <Trophy style={{ width: '16px', height: '16px', color: badgeColor }} />
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                fontSize: '16px', color: badgeColor,
              }}>
                {badge}
              </span>
            </div>

            {/* Stats row */}
            {correctCount !== undefined && (
              <div style={{
                display: 'flex', gap: '24px', marginBottom: '24px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#34D399', fontFamily: 'monospace' }}>
                    {correctCount}/8
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Correct
                  </div>
                </div>
                <div style={{ width: '1px', background: '#1E293B' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#FF4D6D', fontFamily: 'monospace' }}>
                    {8 - correctCount}/8
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Missed
                  </div>
                </div>
              </div>
            )}

            {/* Tagline */}
            <div style={{
              fontSize: '15px', fontWeight: 600, color: '#94A3B8',
              textAlign: 'center', maxWidth: '280px', lineHeight: 1.5,
            }}>
              Can you beat me? Test your scam instincts at
            </div>
          </div>

          {/* Bottom bar with QR */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 28px 24px',
            borderTop: '1px solid #1E293B',
            position: 'relative', zIndex: 10,
          }}>
            <div>
              <div style={{
                fontSize: '18px', fontWeight: 800, color: '#38BDF8',
                fontFamily: "'Nunito', sans-serif",
              }}>
                scamiq.app
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                Free · No login · 3 minutes
              </div>
            </div>

            <div style={{
              background: '#0F172A',
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid #1E293B',
            }}>
              <QRCodeSVG
                value={appUrl}
                size={64}
                bgColor="transparent"
                fgColor="#38BDF8"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
