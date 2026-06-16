import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Accountants.co.ke — Kenya’s verified accountants, matched to your business';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #0E1116 0%, #14181F 55%, #0d2b29 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#11A39A',
              color: '#0E1116',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ marginLeft: 20, display: 'flex', fontSize: 34, fontWeight: 800, color: '#fff' }}>
            <span>Accountants</span>
            <span style={{ color: '#3ecfc6' }}>.co.ke</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Kenya’s verified accountants,
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: '#3ecfc6',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            matched to your business.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: '#aeb6c2' }}>
            Verified CPA-K, ACCA &amp; CIFA firms. Free to find and get matched.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
