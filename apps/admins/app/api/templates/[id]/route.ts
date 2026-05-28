// app/api/templates/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { deleteTemplateFromMeta } from '../../../lib/whatsapp-template-service'

type Params = { params: Promise<{ id: string }> }

// Helper function to extract variables from body text
function extractVariables(bodyText: string): string[] {
  const vars: string[] = []
  const rx = /\{\{([^}]+)\}\}/g
  let m
  while ((m = rx.exec(bodyText)) !== null) {
    const p = `{{${m[1]}}}`
    if (!vars.includes(p)) vars.push(p)
  }
  return vars
}

// Helper function to determine parameter format
function determineParameterFormat(bodyText: string): string {
  const positionalMatch = bodyText.match(/\{\{(\d+)\}\}/)
  if (positionalMatch) return 'POSITIONAL'
  return 'NAMED'
}

// GET /api/templates/:id — Get single template by ID
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    const template = await prisma.waTemplate.findUnique({
      where: { id },
      include: {
        buttons: {
          orderBy: { index: 'asc' }
        },
        media: true,
        messages: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            to: true,
            status: true,
            sentAt: true,
            createdAt: true,
            wamid: true
          }
        },
        bulkJobs: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            label: true,
            status: true,
            total: true,
            sent: true,
            failed: true,
            createdAt: true,
            completedAt: true
          }
        },
        _count: {
          select: {
            messages: true,
            bulkJobs: true
          }
        }
      }
    })

    if (!template) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }

    // Transform to match expected API response format
    const transformedTemplate = {
      id: template.id,
      metaTemplateId: template.metaTemplateId,
      name: template.name,
      category: template.category.toLowerCase(),
      language: template.language,
      body: template.body,
      variables: template.variables,
      status: template.status.toLowerCase(),
      reason: template.rejectionReason,
      headerFormat: template.headerFormat?.toLowerCase(),
      headerText: template.headerText,
      footer: template.footer,
      parameterFormat: template.parameterFormat.toLowerCase(),
      components: template.components,
      buttons: template.buttons.map(btn => ({
        type: btn.type.toLowerCase(),
        text: btn.text,
        url: btn.url,
        phone: btn.phone
      })),
      media: template.media,
      usageStats: {
        totalMessages: template._count.messages,
        totalBulkJobs: template._count.bulkJobs,
        recentMessages: template.messages,
        recentBulkJobs: template.bulkJobs
      },
      createdAt: template.createdAt,
      updatedAt: template.updatedAt
    }

    return NextResponse.json({ 
      success: true, 
      data: transformedTemplate 
    })

  } catch (err: any) {
    console.error('GET /api/templates/[id] error:', err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Failed to fetch template' 
    }, { status: 500 })
  }
}

// PUT /api/templates/:id — Update template
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    // Check if template exists
    const existingTemplate = await prisma.waTemplate.findUnique({
      where: { id },
      include: {
        buttons: true
      }
    })

    if (!existingTemplate) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }

    const body = await req.json()
    const now = new Date()

    // Prepare update data
    const updateData: any = {
      updatedAt: now
    }

    // Update basic fields if provided
    if (body.name) updateData.name = body.name.trim()
    if (body.category) updateData.category = body.category.toUpperCase()
    if (body.language) updateData.language = body.language
    
    // Update body with variable extraction
    if (body.body) {
      updateData.body = body.body
      updateData.variables = extractVariables(body.body)
      updateData.parameterFormat = determineParameterFormat(body.body)
    }
    
    // Update optional fields
    if (body.footer !== undefined) updateData.footer = body.footer
    if (body.headerFormat) updateData.headerFormat = body.headerFormat.toUpperCase()
    if (body.headerText !== undefined) updateData.headerText = body.headerText
    if (body.status) updateData.status = body.status.toUpperCase()
    
    // Update components if provided
    if (body.components) updateData.components = body.components

    // Update the template
    const updatedTemplate = await prisma.waTemplate.update({
      where: { id },
      data: updateData,
      include: {
        buttons: {
          orderBy: { index: 'asc' }
        },
        media: true
      }
    })

    // Update buttons if provided
    if (body.buttons && Array.isArray(body.buttons)) {
      // Delete existing buttons
      await prisma.waTemplateButton.deleteMany({
        where: { templateId: id }
      })
      
      // Create new buttons
      if (body.buttons.length > 0) {
        await prisma.waTemplateButton.createMany({
          data: body.buttons.map((btn: any, idx: number) => ({
            templateId: id,
            index: idx,
            type: btn.type.toUpperCase(),
            text: btn.text,
            url: btn.url || null,
            phone: btn.phone || null
          }))
        })
      }
    }

    // Fetch the complete updated template with new buttons
    const completeTemplate = await prisma.waTemplate.findUnique({
      where: { id },
      include: {
        buttons: { orderBy: { index: 'asc' } },
        media: true
      }
    })

    // Transform response
    const transformedTemplate = {
      id: completeTemplate!.id,
      metaTemplateId: completeTemplate!.metaTemplateId,
      name: completeTemplate!.name,
      category: completeTemplate!.category.toLowerCase(),
      language: completeTemplate!.language,
      body: completeTemplate!.body,
      variables: completeTemplate!.variables,
      status: completeTemplate!.status.toLowerCase(),
      reason: completeTemplate!.rejectionReason,
      headerFormat: completeTemplate!.headerFormat?.toLowerCase(),
      headerText: completeTemplate!.headerText,
      footer: completeTemplate!.footer,
      parameterFormat: completeTemplate!.parameterFormat.toLowerCase(),
      buttons: completeTemplate!.buttons.map(btn => ({
        type: btn.type.toLowerCase(),
        text: btn.text,
        url: btn.url,
        phone: btn.phone
      })),
      media: completeTemplate!.media,
      createdAt: completeTemplate!.createdAt,
      updatedAt: completeTemplate!.updatedAt
    }

    return NextResponse.json({ 
      success: true, 
      data: transformedTemplate,
      message: 'Template updated successfully'
    })

  } catch (err: any) {
    console.error('PUT /api/templates/[id] error:', err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Invalid JSON or update failed' 
    }, { status: 400 })
  }
}

// PATCH /api/templates/:id — Partial update (for status changes)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    const existingTemplate = await prisma.waTemplate.findUnique({
      where: { id }
    })

    if (!existingTemplate) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }

    const body = await req.json()
    const now = new Date()

    // Only allow updating specific fields via PATCH
    const allowedUpdates = ['status', 'rejectionReason', 'name', 'category']
    const updateData: any = { updatedAt: now }

    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        if (field === 'status') {
          updateData.status = body.status.toUpperCase()
        } else if (field === 'category') {
          updateData.category = body.category.toUpperCase()
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const updatedTemplate = await prisma.waTemplate.update({
      where: { id },
      data: updateData,
      include: {
        buttons: { orderBy: { index: 'asc' } },
        media: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: {
        id: updatedTemplate.id,
        name: updatedTemplate.name,
        status: updatedTemplate.status.toLowerCase(),
        category: updatedTemplate.category.toLowerCase(),
        updatedAt: updatedTemplate.updatedAt
      },
      message: 'Template updated successfully'
    })

  } catch (err: any) {
    console.error('PATCH /api/templates/[id] error:', err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Failed to update template' 
    }, { status: 400 })
  }
}

// DELETE /api/templates/:id — Delete template
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    // Check if template exists and get details
    const template = await prisma.waTemplate.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            messages: true,
            bulkJobs: true
          }
        }
      }
    })

    if (!template) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }

    // Check if template is in use
    if (template._count.messages > 0 || template._count.bulkJobs > 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Cannot delete template that is in use. It has ${template._count.messages} messages and ${template._count.bulkJobs} bulk jobs associated.`,
        inUse: true,
        usageCounts: {
          messages: template._count.messages,
          bulkJobs: template._count.bulkJobs
        }
      }, { status: 409 })
    }

    let metaDeleted = false
    let metaError = null

    // Delete from Meta if it has a metaTemplateId or came from Meta
    if (template.metaTemplateId || id.startsWith('meta_')) {
      try {
        const metaResult = await deleteTemplateFromMeta(template.name)
        if (metaResult.success) {
          metaDeleted = true
        } else {
          metaError = metaResult.error
          console.warn('Meta delete failed:', metaResult.error)
          // Continue with local deletion even if Meta fails
        }
      } catch (err: any) {
        metaError = err.message
        console.warn('Meta delete error:', err)
        // Continue with local deletion
      }
    }

    // Delete related records first (Prisma will cascade, but explicit for clarity)
    await prisma.waTemplateButton.deleteMany({
      where: { templateId: id }
    })

    await prisma.waTemplateMedia.deleteMany({
      where: { templateId: id }
    })

    // Delete the template
    await prisma.waTemplate.delete({
      where: { id }
    })

    const response: any = {
      success: true,
      message: 'Template deleted successfully',
      data: {
        id: template.id,
        name: template.name,
        deletedAt: new Date().toISOString()
      }
    }

    // Add Meta deletion info to response
    if (template.metaTemplateId || id.startsWith('meta_')) {
      response.meta = {
        deleted: metaDeleted,
        error: metaError
      }
      if (!metaDeleted) {
        response.message += ' (Template removed locally but Meta deletion failed)'
      }
    }

    return NextResponse.json(response)

  } catch (err: any) {
    console.error('DELETE /api/templates/[id] error:', err)
    
    // Handle specific Prisma errors
    if (err.code === 'P2025') {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }
    
    if (err.code === 'P2003') {
      return NextResponse.json({ 
        success: false, 
        error: 'Cannot delete template because it is referenced by other records' 
      }, { status: 409 })
    }

    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Failed to delete template' 
    }, { status: 500 })
  }
}