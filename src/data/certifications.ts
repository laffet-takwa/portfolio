import type { CertificationEntry } from '../types';

/**
 * Certifications are listed as earned titles only. No dates, no certificate
 * identifiers and no issuing bodies beyond what is stated are invented.
 */
export const certifications: CertificationEntry[] = [
  { id: 'cisco-intro', name: 'Cisco Cybersecurity Introduction', issuer: 'Cisco', group: 'cisco' },
  { id: 'cisco-ethical-hacker', name: 'Cisco Ethical Hacker', issuer: 'Cisco', group: 'cisco' },
  { id: 'cisco-threat-mgmt', name: 'Cisco Threat Management', issuer: 'Cisco', group: 'cisco' },
  { id: 'cisco-network-defense', name: 'Cisco Network Defense', issuer: 'Cisco', group: 'cisco' },
  { id: 'cisco-endpoint-security', name: 'Cisco Endpoint Security', issuer: 'Cisco', group: 'cisco' },
  { id: 'cisco-ccna', name: 'Cisco CCNA modules', issuer: 'Cisco', group: 'cisco' },
  {
    id: 'cisco-junior-analyst',
    name: 'Cisco Junior Cybersecurity Analyst',
    issuer: 'Cisco',
    group: 'cisco',
  },
  {
    id: 'aws-cloud-security',
    name: 'AWS Academy Cloud Security Foundations',
    issuer: 'AWS Academy',
    group: 'cloud',
  },
  { id: 'lfd121', name: 'Linux Foundation LFD121', issuer: 'Linux Foundation', group: 'linux' },
];

export const certificationGroups = [
  { id: 'cisco', label: 'Cisco', icon: 'globe' },
  { id: 'linux', label: 'Linux Foundation', icon: 'terminal' },
  { id: 'cloud', label: 'Cloud', icon: 'cloud' },
  { id: 'other', label: 'Other', icon: 'award' },
] as const;