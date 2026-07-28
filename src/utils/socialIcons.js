import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Code2,
  Terminal,
  MessageSquare,
  Send,
  BookOpen,
  Figma,
  Share2,
  Briefcase
} from 'lucide-react';

export const SUPPORTED_PLATFORMS = [
  'LinkedIn',
  'GitHub',
  'Instagram',
  'Facebook',
  'X (Twitter)',
  'YouTube',
  'Medium',
  'Hashnode',
  'DEV Community',
  'LeetCode',
  'HackerRank',
  'CodeChef',
  'Stack Overflow',
  'Behance',
  'Dribbble',
  'Discord',
  'Telegram',
  'Portfolio',
  'Custom Link'
];

export function formatExternalUrl(url) {
  if (!url) return '#';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return '#';
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function detectPlatform(url) {
  if (!url) return 'Custom Link';
  const lower = url.toLowerCase();
  if (lower.includes('github.com')) return 'GitHub';
  if (lower.includes('linkedin.com')) return 'LinkedIn';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'X (Twitter)';
  if (lower.includes('instagram.com')) return 'Instagram';
  if (lower.includes('facebook.com')) return 'Facebook';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
  if (lower.includes('medium.com')) return 'Medium';
  if (lower.includes('hashnode.dev') || lower.includes('hashnode.com')) return 'Hashnode';
  if (lower.includes('dev.to')) return 'DEV Community';
  if (lower.includes('leetcode.com')) return 'LeetCode';
  if (lower.includes('hackerrank.com')) return 'HackerRank';
  if (lower.includes('codechef.com')) return 'CodeChef';
  if (lower.includes('stackoverflow.com')) return 'Stack Overflow';
  if (lower.includes('behance.net')) return 'Behance';
  if (lower.includes('dribbble.com')) return 'Dribbble';
  if (lower.includes('discord.gg') || lower.includes('discord.com')) return 'Discord';
  if (lower.includes('t.me') || lower.includes('telegram.org')) return 'Telegram';
  return 'Custom Link';
}

export function getPlatformIcon(platform) {
  const p = platform ? platform.toLowerCase() : '';
  if (p.includes('github')) return Github;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('twitter') || p.includes('x (')) return Twitter;
  if (p.includes('instagram')) return Instagram;
  if (p.includes('facebook')) return Facebook;
  if (p.includes('youtube')) return Youtube;
  if (p.includes('medium') || p.includes('hashnode') || p.includes('dev')) return BookOpen;
  if (p.includes('leetcode') || p.includes('hackerrank') || p.includes('codechef') || p.includes('stack overflow')) return Code2;
  if (p.includes('behance') || p.includes('dribbble')) return Figma;
  if (p.includes('discord')) return MessageSquare;
  if (p.includes('telegram')) return Send;
  if (p.includes('portfolio')) return Briefcase;
  return Globe;
}

export function getPlatformColor(platform) {
  const p = platform ? platform.toLowerCase() : '';
  if (p.includes('github')) return 'hover:text-gray-200 hover:bg-gray-800';
  if (p.includes('linkedin')) return 'hover:text-blue-400 hover:bg-blue-900/40';
  if (p.includes('twitter') || p.includes('x')) return 'hover:text-sky-400 hover:bg-sky-900/40';
  if (p.includes('instagram')) return 'hover:text-pink-400 hover:bg-pink-900/40';
  if (p.includes('facebook')) return 'hover:text-blue-500 hover:bg-blue-900/40';
  if (p.includes('youtube')) return 'hover:text-red-500 hover:bg-red-900/40';
  if (p.includes('leetcode')) return 'hover:text-amber-400 hover:bg-amber-900/40';
  if (p.includes('dribbble')) return 'hover:text-pink-500 hover:bg-pink-900/40';
  return 'hover:text-indigo-400 hover:bg-indigo-900/40';
}