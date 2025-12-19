// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id') || '';

    const res = await fetch(`https://medusa.p-hertz.oaklab.cloud/store/products/${productId}`, {
        method: 'GET',
        headers: {
            'X-Publishable-Api-Key': process.env.MEDUSA_API_KEY || '',
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch Medusa products' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data.product);
}
