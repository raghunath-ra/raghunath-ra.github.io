import { renderCard, pngResponse } from '../lib/og';
import { profile } from '../data/profile';

/** The site's default social card, generated from profile.ts so it never drifts from the copy. */
export async function GET() {
  return pngResponse(
    await renderCard({
      kicker: 'Essays & research',
      title: profile.pov.statement,
      emphasis: profile.pov.emphasis,
      subtitle: 'At the crossroads of AI and cybersecurity, with B2B technology as the primary focus.',
    }),
  );
}
