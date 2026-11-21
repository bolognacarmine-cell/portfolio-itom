/**
 * Bolly Ink Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Platforms: 'blog' (used for all tattoo-related content)
 */

export const PLATFORM_CONFIG = {
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '📷',
        label: 'Instagram',
        shape: 'phone',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: '𝕏',
        label: 'X (Twitter)',
        shape: 'monitor',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'LinkedIn',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Codrops',
        shape: 'monitor',
    },
};

// Tattoo Studio content data - flash art & artist collection
const RAW_CONTENT_DATA = [
    // ============ Tattoo Styles ============
    {
        id: 'style-001',
        platform: 'blog',
        title: 'BLACKWORK',
        description: 'Bold black ink, geometric patterns, solid fills. Strong contrast, modern traditional style. Custom pieces for personal stories.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-03-15',
        views: '—',
    },
    {
        id: 'style-002',
        platform: 'blog',
        title: 'REALISM',
        description: 'Life-like portraits, animals, nature. Shading, depth, realistic textures. Tribute pieces and custom commissions.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-04-20',
        views: '—',
    },
    {
        id: 'style-003',
        platform: 'blog',
        title: 'ORNAMENTAL',
        description: 'Intricate patterns, mandalas, floral designs. Fine line work, repetitive geometry. Spiritual and decorative motifs.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-05-10',
        views: '—',
    },
    {
        id: 'style-004',
        platform: 'blog',
        title: 'LETTERING',
        description: 'Script & lettering - quotes, names, dates. Fine line work, decorative flourishes. Personal meaning in every curve.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-06-05',
        views: '—',
    },
    {
        id: 'style-005',
        platform: 'blog',
        title: 'COVER-UP',
        description: 'Transforming old tattoos into new art. Creative cover-up techniques, dark to light, integrating old ink into new designs.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-07-20',
        views: '—',
    },

    // ============ Artist Spotlight ============
    {
        id: 'artist-001',
        platform: 'blog',
        title: 'CHRISTIAN - Lead Artist',
        description: 'Specializing in blackwork & realism since 2015. Studio philosophy: every tattoo tells a personal story. Hygiene, precision, custom design.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-02-10',
        views: '—',
    },
    {
        id: 'artist-002',
        platform: 'blog',
        title: 'STUDIO TOUR',
        description: 'Behind the scenes: equipment, setup, hygiene protocols. The creative space where ink meets skin.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-01-15',
        views: '—',
    },

    // ============ Aftercare & Process ============
    {
        id: 'aftercare-001',
        platform: 'blog',
        title: 'AFTERCARE GUIDE',
        description: 'How to care for your new tattoo: cleaning, moisturizing, protection from sun. Healing timeline tips.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-08-01',
        views: '—',
    },
    {
        id: 'aftercare-002',
        platform: 'blog',
        title: 'PAIN LEVELS',
        description: 'What to expect: pain scale by placement, numbing options, breathing techniques. Managing discomfort.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-08-15',
        views: '—',
    },

    // ============ Client Testimonials ============
    {
        id: 'testimonial-001',
        platform: 'blog',
        title: '\"The best decision I ever made\"',
        description: 'Client review: 6-hour session, blackwork sleeve. Healing great, love the result. Highly recommend Christian at Bolly Ink.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-05-30',
        views: '—',
    },
    {
        id: 'testimonial-002',
        platform: 'blog',
        title: '\"Professional and talented\"',
        description: 'Client review: cover-up session. Old tattoo transformed into new art. Precise work, great communication. 10/10.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        url: 'https://example.com',
        date: '2024-06-12',
        views: '—',
    },
];

const tattooTextures = [
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
    '/textures/studio/monitor_front.webp',
];

let tattooIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            tattooTextures[tattoIdx++ % tattooTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            // Use same base texture for painted if not specified
            item.frontTexture.replace('.webp', '_painted.webp')
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};