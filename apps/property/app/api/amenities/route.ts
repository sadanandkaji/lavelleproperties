// app/api/amenities/route.ts
import { NextResponse } from 'next/server';
import { prisma} from '@repo/db';


export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { name: 'asc' },
    });

    // Group by category
    const basic = amenities
      .filter((a) => a.category === 'BASIC')
      .map((a) => a.name);

    const full = amenities
      .filter((a) => a.category === 'FULL')
      .map((a) => a.name);

    return NextResponse.json({ basic, full }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/amenities]', error);
    return NextResponse.json(
      { error: 'Failed to fetch amenities' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}