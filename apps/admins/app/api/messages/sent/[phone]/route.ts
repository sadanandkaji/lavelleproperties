// app/api/messages/sent/[phone]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'

type Params = { params: Promise<{ phone: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { phone } = await params

  const messages = await prisma.waMessage.findMany({
    where: {
      to: { contains: phone },
      direction: 'OUTBOUND'
    },
    orderBy: { createdAt: 'desc' },
    include: {
      template: { select: { name: true } },
      media: true
    }
  })

  return NextResponse.json({
    success: true,
    total: messages.length,
    phone,
    data: messages
  })
}