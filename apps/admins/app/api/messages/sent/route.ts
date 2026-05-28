// app/api/messages/sent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '50')
  const skip = (page - 1) * limit

  const where: any = { direction: 'OUTBOUND' }
  if (phone) where.to = { contains: phone }
  if (status) where.status = status

  const [messages, total] = await Promise.all([
    prisma.waMessage.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        template: { select: { name: true } },
        contact: { select: { name: true, phone: true } }
      }
    }),
    prisma.waMessage.count({ where })
  ])

  return NextResponse.json({
    success: true,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    data: messages
  })
}