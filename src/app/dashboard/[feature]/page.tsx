'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Label, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils'
import { MOCK_InvoiceExceptions, MOCK_Invoices, MOCK_DemoUsers, MOCK_Clients } from '@/lib/data'
import { Search, Plus, Download, Eye, Tag, Calendar, User, DollarSign } from 'lucide-react'

// Helper constants for dropdowns
const exceptionTypes = [
  'missing_approval',
  'incorrect_amount',
  'duplicate_entry',
  'unsupported_format',
  'late_submission',
  'data_mismatch',
  'vendor_dispute',
  'other',
] as const;
const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
const resolutionStatuses = [
  'open',
  'in_review',
  'pending_action',
  'resolved',
  'escalated',
  'closed',
] as const;

export default function FeaturePage() {
  const params = useParams