import { describe, it, expect } from 'vitest'
import {
  getStatusConfig,
  getIncidentStatus,
  getImpactLevel,
  getOverallStatus,
  formatDate,
  timeAgo,
  STATUS_CONFIG,
  INCIDENT_STATUS,
  IMPACT_LEVELS,
} from '@/utils/status'

describe('status utilities', () => {
  describe('getStatusConfig', () => {
    it('returns config for known statuses', () => {
      expect(getStatusConfig('operational').label).toBe('Operational')
      expect(getStatusConfig('degraded').label).toBe('Degraded Performance')
      expect(getStatusConfig('partial').label).toBe('Partial Outage')
      expect(getStatusConfig('major').label).toBe('Major Outage')
      expect(getStatusConfig('maintenance').label).toBe('Under Maintenance')
    })

    it('defaults to operational for unknown status', () => {
      expect(getStatusConfig('unknown')).toEqual(STATUS_CONFIG.operational)
    })
  })

  describe('getIncidentStatus', () => {
    it('returns config for known incident statuses', () => {
      expect(getIncidentStatus('investigating').label).toBe('Investigating')
      expect(getIncidentStatus('identified').label).toBe('Identified')
      expect(getIncidentStatus('monitoring').label).toBe('Monitoring')
      expect(getIncidentStatus('resolved').label).toBe('Resolved')
    })

    it('defaults to investigating for unknown', () => {
      expect(getIncidentStatus('unknown')).toEqual(INCIDENT_STATUS.investigating)
    })
  })

  describe('getImpactLevel', () => {
    it('returns config for known impact levels', () => {
      expect(getImpactLevel('none').label).toBe('None')
      expect(getImpactLevel('minor').label).toBe('Minor')
      expect(getImpactLevel('major').label).toBe('Major')
      expect(getImpactLevel('critical').label).toBe('Critical')
    })

    it('defaults to none for unknown', () => {
      expect(getImpactLevel('unknown')).toEqual(IMPACT_LEVELS.none)
    })
  })

  describe('getOverallStatus', () => {
    it('returns operational when all services are operational', () => {
      const services = [
        { status: 'operational' },
        { status: 'operational' },
      ]
      expect(getOverallStatus(services)).toBe('operational')
    })

    it('returns operational for empty array', () => {
      expect(getOverallStatus([])).toBe('operational')
    })

    it('returns operational for null/undefined', () => {
      expect(getOverallStatus(null)).toBe('operational')
      expect(getOverallStatus(undefined)).toBe('operational')
    })

    it('returns major when any service has major outage', () => {
      const services = [
        { status: 'operational' },
        { status: 'major' },
      ]
      expect(getOverallStatus(services)).toBe('major')
    })

    it('returns partial when any service has partial outage', () => {
      const services = [
        { status: 'operational' },
        { status: 'partial' },
      ]
      expect(getOverallStatus(services)).toBe('partial')
    })

    it('returns degraded when any service is degraded', () => {
      const services = [
        { status: 'operational' },
        { status: 'degraded' },
      ]
      expect(getOverallStatus(services)).toBe('degraded')
    })

    it('returns maintenance when service is under maintenance', () => {
      const services = [
        { status: 'operational' },
        { status: 'maintenance' },
      ]
      expect(getOverallStatus(services)).toBe('maintenance')
    })

    it('prioritizes major over partial', () => {
      const services = [
        { status: 'partial' },
        { status: 'major' },
      ]
      expect(getOverallStatus(services)).toBe('major')
    })

    it('prioritizes partial over degraded', () => {
      const services = [
        { status: 'degraded' },
        { status: 'partial' },
      ]
      expect(getOverallStatus(services)).toBe('partial')
    })
  })

  describe('formatDate', () => {
    it('formats a date string', () => {
      const result = formatDate('2025-06-15T14:30:00Z')
      expect(result).toContain('2025')
      expect(result).toContain('Jun')
    })

    it('returns empty string for falsy input', () => {
      expect(formatDate('')).toBe('')
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })
  })

  describe('timeAgo', () => {
    it('returns empty string for falsy input', () => {
      expect(timeAgo('')).toBe('')
      expect(timeAgo(null)).toBe('')
    })

    it('returns "just now" for recent dates', () => {
      const now = new Date().toISOString()
      expect(timeAgo(now)).toBe('just now')
    })

    it('returns minutes ago', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      expect(timeAgo(fiveMinAgo)).toBe('5m ago')
    })

    it('returns hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      expect(timeAgo(twoHoursAgo)).toBe('2h ago')
    })

    it('returns days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      expect(timeAgo(threeDaysAgo)).toBe('3d ago')
    })
  })
})
