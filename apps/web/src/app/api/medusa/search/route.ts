// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'Alexandria';

    const params = new URLSearchParams({
        q: query,
        limit: '10',
    }).toString();

    const res = await fetch(`https://medusa.p-hertz.oaklab.cloud/store/products?${params}`, {
        method: 'GET',
        headers: {
            'X-Publishable-Api-Key': process.env.MEDUSA_API_KEY || '',
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch Medusa products' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data.products);
}
