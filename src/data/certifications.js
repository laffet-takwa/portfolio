/**
 * Certifications are listed as earned titles only. No dates and no certificate
 * identifiers are invented — `url` stays undefined when no public verification
 * link exists.
 *
 * Every `url` below was resolved against the issuer page, not guessed from the
 * file name. Two of them were LinkedIn safety redirects; they are stored decoded
 * and unwrapped to the issuer URL they point at, which is more stable.
 */
export const certifications = [
    {
        id: 'cisco-intro-cybersecurity',
        name: 'Cisco Introduction to Cybersecurity',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/f665aa4f-fb34-4114-8ce7-951862f6e8be/public_url',
    },
    {
        id: 'cisco-ethical-hacker',
        name: 'Cisco Ethical Hacker',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/277a2722-4988-4cc4-8f8d-cd44915e8059/public_url',
    },
    {
        id: 'cisco-network-defense',
        name: 'Cisco Network Defense',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/56813f24-228c-46f9-8a63-80dd1c5b076f/public_url',
    },
    {
        id: 'cisco-networking-basics',
        name: 'Cisco Networking Basics',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/dfcc44c9-911a-4ae6-a349-9fae1d05bbea/public_url',
    },
    {
        id: 'cisco-endpoint-security',
        name: 'Cisco Endpoint Security',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/ee60636b-c044-4a5c-b540-cb6004eb4120/public_url',
    },
    {
        id: 'cisco-ccna-v7',
        name: 'Cisco CCNA v7 modules',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/4759b8fa-5f03-4f82-bcc8-50adf4b8c145/public_url',
    },
    {
        id: 'cisco-junior-analyst',
        name: 'Cisco Junior Cybersecurity Analyst',
        issuer: 'Cisco',
        group: 'cisco',
        url: 'https://www.credly.com/badges/0ce25763-340a-442a-a706-f12360119fd5/public_url',
    },
    {
        id: 'aws-cloud-security',
        name: 'AWS Academy Cloud Security Foundations',
        issuer: 'AWS Academy',
        group: 'cloud',
        url: 'https://www.credly.com/go/cLu5o4e5',
    },
    {
        id: 'lfd121',
        name: 'Linux Foundation LFD121',
        issuer: 'Linux Foundation',
        group: 'linux',
        url: 'https://www.credly.com/badges/58e56ba8-5f71-4ba6-9f25-2255c6cafb1a/public_url',
    },
    {
        id: 'hashgraph-developer',
        name: 'Hashgraph Developer Certification',
        issuer: 'Hashgraph',
        group: 'other',
        url: 'https://certs.hashgraphdev.com/39d8115d-f0f9-490c-a187-ad9595c41e0b.pdf',
    },
    {
        id: 'tryhackme-completion',
        // TODO: the certificate PDF is a raster image, so the room it covers cannot
        // be read from it. Replace the title with the room name once confirmed.
        name: 'TryHackMe — Certificate of Completion',
        issuer: 'TryHackMe',
        group: 'other',
        url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-S7FDCCJEHG.pdf',
    },
];
export const certificationGroups = [
    { id: 'cisco', label: 'Cisco', icon: 'globe' },
    { id: 'cloud', label: 'AWS Academy', icon: 'cloud' },
    { id: 'linux', label: 'Linux Foundation', icon: 'terminal' },
    { id: 'other', label: 'Other', icon: 'award' },
];
