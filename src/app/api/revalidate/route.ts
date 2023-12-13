import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ category: string; slug: { _type: string; current: string } }>(req, process.env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return Response.json({ message: 'Invalid signature', isValidSignature, body }, { status: 401 });
    }

    if (!body?.category || !body?.slug) {
      return Response.json({ message: 'Bad Request', body }, { status: 400 });
    }

    revalidatePath(`/${body.category}`); // revalidate category page
    revalidatePath(`/${body.category}/${body.slug.current}`); // revalidate product details page

    return NextResponse.json({ body });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
