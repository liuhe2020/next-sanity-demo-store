import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(req, process.env.SANITY_WEBHOOK_SECRET);
    console.log(body);

    if (!isValidSignature) {
      return Response.json({ message: 'Invalid signature', isValidSignature, body }, { status: 401 });
    }

    if (!body?._type) {
      return Response.json({ message: 'Bad Request', body }, { status: 400 });
    }

    revalidatePath(`/${body._type}`);

    return NextResponse.json({ body });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
