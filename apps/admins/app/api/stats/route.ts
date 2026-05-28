// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const timeframe = searchParams.get('timeframe') || 'all'
    const includeDetails = searchParams.get('details') === 'true'

    // Date range calculations
    let dateFilter: any = {}
    const now = new Date()
    
    if (timeframe !== 'all') {
      const startDate = new Date()
      switch (timeframe) {
        case 'day':
          startDate.setDate(now.getDate() - 1)
          break
        case 'week':
          startDate.setDate(now.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1)
          break
      }
      dateFilter = { gte: startDate }
    }

    // Execute all queries in parallel
    const [
      totalTemplates,
      approvedTemplates,
      pendingTemplates,
      rejectedTemplates,
      pausedTemplates,
      archivedTemplates,
      totalMessages,
      sentMessages,
      failedMessages,
      queuedMessages,
      deliveredMessages,
      readMessages,
      simpleMessages,
      templateMessages,
      mediaMessages,
      messagesLast24h,
      messagesLast7d,
      messagesLast30d,
      totalBulkJobs,
      runningBulkJobs,
      completedBulkJobs,
      failedBulkJobs,
      cancelledBulkJobs,
      totalContacts,
      validContacts,
      optedOutContacts,
      invalidContacts,
      newContactsLast7d,
      newContactsLast30d,
      totalMediaFiles,
      totalMediaSize,
    ] = await Promise.all([
      // Template counts
      prisma.waTemplate.count(),
      prisma.waTemplate.count({ where: { status: 'APPROVED' } }),
      prisma.waTemplate.count({ where: { status: 'PENDING' } }),
      prisma.waTemplate.count({ where: { status: 'REJECTED' } }),
      prisma.waTemplate.count({ where: { status: 'PAUSED' } }),
      prisma.waTemplate.count({ where: { status: 'ARCHIVED' } }),
      
      // Message counts
      prisma.waMessage.count(),
      prisma.waMessage.count({ where: { status: 'SENT' } }),
      prisma.waMessage.count({ where: { status: 'FAILED' } }),
      prisma.waMessage.count({ where: { status: 'QUEUED' } }),
      prisma.waMessage.count({ where: { status: 'DELIVERED' } }),
      prisma.waMessage.count({ where: { status: 'READ' } }),
      prisma.waMessage.count({ where: { type: 'TEXT' } }),
      prisma.waMessage.count({ where: { type: 'TEMPLATE' } }),
      prisma.waMessage.count({ 
        where: { type: { in: ['IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO'] } }
      }),
      
      // Timeframe based message counts
      prisma.waMessage.count({ where: { createdAt: dateFilter } }),
      prisma.waMessage.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
      prisma.waMessage.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } }),
      
      // Bulk job counts
      prisma.waBulkJob.count(),
      prisma.waBulkJob.count({ where: { status: 'RUNNING' } }),
      prisma.waBulkJob.count({ where: { status: 'COMPLETED' } }),
      prisma.waBulkJob.count({ where: { status: 'FAILED' } }),
      prisma.waBulkJob.count({ where: { status: 'CANCELLED' } }),
      
      // Contact counts
      prisma.waContact.count(),
      prisma.waContact.count({ where: { isValid: true, optedOut: false } }),
      prisma.waContact.count({ where: { optedOut: true } }),
      prisma.waContact.count({ where: { isValid: false } }),
      
      // New contacts
      prisma.waContact.count({ 
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
      }),
      prisma.waContact.count({ 
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
      }),
      
      // Media stats
      prisma.waTemplateMedia.count(),
      prisma.waTemplateMedia.aggregate({
        _sum: { sizeBytes: true }
      }),
    ])

    // Fix: Use correct table name "wa_messages" (with double quotes for case sensitivity)
    let avgDeliveryTime = { avg_seconds: 0 }
    try {
      const result = await prisma.$queryRaw<{ avg_seconds: number }[]>`
        SELECT AVG(EXTRACT(EPOCH FROM ("deliveredAt" - "sentAt"))) as avg_seconds
        FROM "wa_messages"
        WHERE "sentAt" IS NOT NULL 
          AND "deliveredAt" IS NOT NULL
          AND "sentAt" > NOW() - INTERVAL '30 days'
      `
      avgDeliveryTime = result[0] || { avg_seconds: 0 }
    } catch (err) {
      console.warn('Could not calculate average delivery time:', err)
    }

    // Calculate derived metrics
    const messageSuccessRate = totalMessages > 0 
      ? ((sentMessages + deliveredMessages + readMessages) / totalMessages * 100).toFixed(2)
      : '0'
    
    const templateUsageRate = totalMessages > 0
      ? (templateMessages / totalMessages * 100).toFixed(2)
      : '0'

    const bulkJobSuccessRate = totalBulkJobs > 0
      ? (completedBulkJobs / totalBulkJobs * 100).toFixed(2)
      : '0'

    const contactValidityRate = totalContacts > 0
      ? (validContacts / totalContacts * 100).toFixed(2)
      : '0'

    // Prepare response
    const statsData: any = {
      templates: {
        total: totalTemplates,
        approved: approvedTemplates,
        pending: pendingTemplates,
        rejected: rejectedTemplates,
        paused: pausedTemplates,
        archived: archivedTemplates,
        approvalRate: totalTemplates > 0 
          ? (approvedTemplates / totalTemplates * 100).toFixed(2)
          : '0',
      },
      messages: {
        total: totalMessages,
        sent: sentMessages,
        delivered: deliveredMessages,
        read: readMessages,
        failed: failedMessages,
        queued: queuedMessages,
        simple: simpleMessages,
        template: templateMessages,
        media: mediaMessages,
        successRate: parseFloat(messageSuccessRate),
        templateUsageRate: parseFloat(templateUsageRate),
        trends: {
          last24h: messagesLast24h,
          last7d: messagesLast7d,
          last30d: messagesLast30d,
        },
      },
      bulkJobs: {
        total: totalBulkJobs,
        running: runningBulkJobs,
        completed: completedBulkJobs,
        failed: failedBulkJobs,
        cancelled: cancelledBulkJobs,
        successRate: parseFloat(bulkJobSuccessRate),
      },
      contacts: {
        total: totalContacts,
        valid: validContacts,
        optedOut: optedOutContacts,
        invalid: invalidContacts,
        validityRate: parseFloat(contactValidityRate),
        newLast7d: newContactsLast7d,
        newLast30d: newContactsLast30d,
      },
      media: {
        totalFiles: totalMediaFiles,
        totalSizeBytes: totalMediaSize._sum.sizeBytes || 0,
        totalSizeMB: ((totalMediaSize._sum.sizeBytes || 0) / (1024 * 1024)).toFixed(2),
      },
      performance: {
        avgDeliveryTimeSeconds: Math.round(avgDeliveryTime.avg_seconds || 0),
        avgDeliveryTimeFormatted: formatDuration(Math.round(avgDeliveryTime.avg_seconds || 0)),
      },
    }

    // Add detailed stats if requested
    if (includeDetails) {
      try {
        // Fix: Use correct table name "wa_messages"
        const messagesByDay = await prisma.$queryRaw<{ date: string; count: number }[]>`
          SELECT DATE("createdAt") as date, COUNT(*) as count
          FROM "wa_messages"
          WHERE "createdAt" > NOW() - INTERVAL '7 days'
          GROUP BY DATE("createdAt")
          ORDER BY date DESC
        `

        const statusDistribution = await prisma.waMessage.groupBy({
          by: ['status'],
          _count: true
        })

        const topTemplates = await prisma.waTemplate.findMany({
          take: 5,
          orderBy: {
            messages: { _count: 'desc' }
          },
          select: {
            id: true,
            name: true,
            status: true,
            _count: {
              select: { messages: true }
            }
          }
        })

        const recentActivity = await prisma.waMessage.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            template: { select: { name: true } },
            contact: { select: { name: true, phone: true } }
          }
        })

        const topContacts = await prisma.waContact.findMany({
          take: 5,
          orderBy: {
            messages: { _count: 'desc' }
          },
          select: {
            id: true,
            name: true,
            phone: true,
            _count: {
              select: { messages: true }
            }
          }
        })

        statsData.details = {
          topTemplates: topTemplates.map(t => ({
            id: t.id,
            name: t.name,
            status: t.status.toLowerCase(),
            messageCount: t._count.messages
          })),
          recentActivity: recentActivity.map(msg => ({
            id: msg.id,
            to: msg.to,
            type: msg.type.toLowerCase(),
            status: msg.status.toLowerCase(),
            templateName: msg.template?.name,
            contactName: msg.contact?.name,
            createdAt: msg.createdAt
          })),
          messagesByDay,
          statusDistribution: statusDistribution.reduce((acc, curr) => {
            acc[curr.status.toLowerCase()] = curr._count
            return acc
          }, {} as Record<string, number>),
          topContacts: topContacts.map(c => ({
            id: c.id,
            name: c.name,
            phone: c.phone,
            messageCount: c._count.messages
          }))
        }
      } catch (err) {
        console.warn('Could not fetch detailed stats:', err)
        statsData.details = { error: 'Could not fetch details' }
      }
    }

    return NextResponse.json({
      success: true,
      data: statsData,
      timeframe,
      generatedAt: new Date().toISOString()
    })

  } catch (err: any) {
    console.error('GET /api/stats error:', err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Failed to fetch statistics' 
    }, { status: 500 })
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`
  return `${Math.floor(seconds / 3600)} hours ${Math.floor((seconds % 3600) / 60)} minutes`
}