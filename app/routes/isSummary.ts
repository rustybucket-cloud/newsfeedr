import { prisma } from '~/utils/db.server';
import type { LoaderArgs } from '@remix-run/node';

// eslint-disable-next-line import/prefer-default-export
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get('url');
  const fn = url.searchParams.get('fn');
  if (fn === 'create') {
    const summary = url.searchParams.get('summary');
    await prisma.summary.create({
      data: {
        id,
        summary,
      },
    });
    return { ok: true };
  }
  const summary = await prisma.summary.findUnique({
    where: {
      id,
    },
  });
  if (summary) return { summary: summary.summary };
  return { summary: null };
}
