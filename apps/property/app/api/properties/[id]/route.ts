import { NextRequest, NextResponse } from 'next/server';
import { prisma} from '@repo/db';


export async function GET(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: 'Property ID is required' },
      { status: 400 }
    );
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // ── Normalize enum values back to readable strings ─────────────────────
    // Prisma stores enums as their @map values in the DB, but returns the
    // enum key name. We convert them to clean display strings for the frontend.

    const layoutMap: Record<string, string> = {
      BHK1:   '1BHK',
      BHK2:   '2BHK',
      BHK2_5: '2.5BHK',
      BHK3:   '3BHK',
      BHK3_5: '3.5BHK',
      BHK4:   '4BHK',
      BHK5:   '5BHK',
      BHK5P:  '5BHK+',
    };

    const subTypeMap: Record<string, string> = {
      FLAT:               'Flat',
      STANDALONE_HOUSE:   'Standalone House',
      INDEPENDENT_VILLA:  'Independent Villa',
      PENTHOUSE:          'Penthouse',
    };

    const furnishingMap: Record<string, string> = {
      FURNISHED:      'Furnished',
      SEMIFURNISHED:  'Semi Furnished',
      UNFURNISHED:    'Unfurnished',
    };

    const normalized = {
      id:              property.id,
      title:           property.title,
      location:        property.location,
      price:           property.price,
      imageUrl:        property.imageUrl ?? null,
      description:     property.description,
      type:            property.type,                           // RENT | LEASE | SALE
      subType:         subTypeMap[property.subType]  ?? property.subType,
      layoutType:      layoutMap[property.layoutType] ?? property.layoutType,
      furnishing:      furnishingMap[property.furnishing] ?? property.furnishing,
      amenityCategory: property.amenityCategory,               // BASIC | FULL
      createdAt:       property.createdAt.toISOString(),
    };

    return NextResponse.json(normalized, { status: 200 });

  } catch (error) {
    console.error('[GET /api/property/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}