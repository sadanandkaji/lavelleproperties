// app/api/messages/bulk/[jobId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'

type Params = { params: Promise<{ jobId: string }> }

// GET /api/messages/bulk/:jobId — poll job progress
export async function GET(_req: NextRequest, { params }: Params) {
  const { jobId } = await params
  
  const job = await prisma.waBulkJob.findUnique({
    where: { id: jobId },
    include: {
      template: {
        select: { name: true, category: true }
      },
      recipients: {
        where: { status: 'FAILED' },
        take: 50,
        select: {
          phone: true,
          errorMsg: true,
          status: true
        }
      }
    }
  })
  
  if (!job) {
    return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 })
  }

  const processed = job.sent + job.failed
  const progress = job.total > 0 ? Math.round((processed / job.total) * 100) : 0

  return NextResponse.json({
    success: true,
    data: {
      id: job.id,
      label: job.label,
      type: job.type.toLowerCase(),
      templateName: job.template?.name,
      status: job.status.toLowerCase(),
      total: job.total,
      sent: job.sent,
      failed: job.failed,
      cancelled: job.cancelled,
      progress,
      errors: job.recipients.map(r => ({ phone: r.phone, reason: r.errorMsg })),
      createdAt: job.createdAt,
      completedAt: job.completedAt,
    }
  })
}

// PATCH /api/messages/bulk/:jobId — cancel a running job
export async function PATCH(_req: NextRequest, { params }: Params) {
  const { jobId } = await params
  
  const job = await prisma.waBulkJob.findUnique({
    where: { id: jobId }
  })
  
  if (!job) {
    return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 })
  }
  
  if (job.status !== 'RUNNING') {
    return NextResponse.json({ 
      success: false, 
      error: `Job is already ${job.status.toLowerCase()}` 
    }, { status: 400 })
  }
  
  // Update job status
  await prisma.waBulkJob.update({
    where: { id: jobId },
    data: {
      status: 'CANCELLED',
      completedAt: new Date()
    }
  })
  
  // Cancel all queued recipients
  await prisma.waBulkRecipient.updateMany({
    where: {
      bulkJobId: jobId,
      status: 'QUEUED'
    },
    data: { status: 'CANCELLED' }
  })
  
  // Count cancelled recipients
  const cancelledCount = await prisma.waBulkRecipient.count({
    where: {
      bulkJobId: jobId,
      status: 'CANCELLED'
    }
  })
  
  // Update cancelled count
  await prisma.waBulkJob.update({
    where: { id: jobId },
    data: { cancelled: cancelledCount }
  })
  
  return NextResponse.json({ success: true, message: 'Job cancelled' })
}

// DELETE /api/messages/bulk/:jobId — remove job from history
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { jobId } = await params
  
  const job = await prisma.waBulkJob.findUnique({
    where: { id: jobId }
  })
  
  if (!job) {
    return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 })
  }
  
  // Delete related recipients first (Prisma will cascade, but explicit for clarity)
  await prisma.waBulkRecipient.deleteMany({
    where: { bulkJobId: jobId }
  })
  
  // Delete the job
  await prisma.waBulkJob.delete({
    where: { id: jobId }
  })
  
  return NextResponse.json({ success: true, message: 'Job removed' })
}