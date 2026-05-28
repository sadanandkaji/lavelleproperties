// app/lib/store.ts


export interface Template {
  id:               string
  metaTemplateId?:  string
  name:             string
  category:         string
  language:         string
  body:             string
  variables:        string[]
  components?:      any[]
  status:           'pending' | 'approved' | 'rejected'
  reason?:          string
  rejectionReason?: string
  rejectionInfo?: any

  createdAt:        string
  updatedAt:        string
}

export interface Message {
  id:                 string
  to:                 string
  body:               string
  type:               string
  status:             'sent' | 'failed' | 'pending'
  templateId?:        string
  variables?:         Record<string, string>
  error?:             string
  sentAt?:            string
  createdAt:          string
  whatsappMessageId?: string
}

export interface Recipient {
  phone:      string
  variables?: Record<string, string>
  name?:      string
}

export interface BulkJob {
  id:            string
  label:         string
  type:          'simple' | 'template'
  templateId?:   string
  templateName?: string
  message?:      string
  recipients:    Recipient[]
  total:         number
  sent:          number
  failed:        number
  status:        'running' | 'completed' | 'failed' | 'cancelled'
  createdAt:     string
  completedAt?:  string
  errors:        { phone: string; reason: string }[]
}

export interface ConversationMessage {
  role:      'user' | 'assistant'
  content:   string
  timestamp: string
}

export interface Conversation {
  id:        string           // phone number
  messages:  ConversationMessage[]
  updatedAt: string
}

// In-memory stores
export const templates     = new Map<string, Template>()
export const messages      = new Map<string, Message>()
export const bulkJobs      = new Map<string, BulkJob>()
export const conversations = new Map<string, Conversation>()