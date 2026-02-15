export const STATUS_CONFIG = {
  operational: { label: 'Operational', color: 'status-operational', icon: '✓' },
  degraded: { label: 'Degraded Performance', color: 'status-degraded', icon: '!' },
  partial: { label: 'Partial Outage', color: 'status-partial', icon: '⚠' },
  major: { label: 'Major Outage', color: 'status-major', icon: '✕' },
  maintenance: { label: 'Under Maintenance', color: 'status-maintenance', icon: '🔧' },
}

export const INCIDENT_STATUS = {
  investigating: { label: 'Investigating', color: 'text-red-500' },
  identified: { label: 'Identified', color: 'text-orange-500' },
  monitoring: { label: 'Monitoring', color: 'text-yellow-500' },
  resolved: { label: 'Resolved', color: 'text-green-500' },
}

export const IMPACT_LEVELS = {
  none: { label: 'None', color: 'text-gray-500' },
  minor: { label: 'Minor', color: 'text-yellow-500' },
  major: { label: 'Major', color: 'text-orange-500' },
  critical: { label: 'Critical', color: 'text-red-500' },
}

export function getStatusConfig(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG.operational
}

export function getIncidentStatus(status) {
  return INCIDENT_STATUS[status] || INCIDENT_STATUS.investigating
}

export function getImpactLevel(impact) {
  return IMPACT_LEVELS[impact] || IMPACT_LEVELS.none
}

export function getOverallStatus(services) {
  if (!services || services.length === 0) return 'operational'
  if (services.some((s) => s.status === 'major')) return 'major'
  if (services.some((s) => s.status === 'partial')) return 'partial'
  if (services.some((s) => s.status === 'degraded')) return 'degraded'
  if (services.some((s) => s.status === 'maintenance')) return 'maintenance'
  return 'operational'
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(dateString) {
  if (!dateString) return ''
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
