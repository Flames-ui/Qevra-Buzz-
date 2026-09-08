import { RepoFile, GITHUB_TOPICS, QEVRA_WEBSITE, REPO_DESCRIPTION, REPO_NAME, REPO_URL } from './repoFiles';

import readmeContent from '../../README.md?raw';
import archContent from '../../ARCHITECTURE.md?raw';
import discoveryContent from '../../DISCOVERY.md?raw';
import relevanceContent from '../../RELEVANCE.md?raw';
import rssContent from '../../RSS-INGESTION.md?raw';
import imageContent from '../../IMAGE-DELIVERY.md?raw';
import publisherContent from '../../PUBLISHER-DISTRIBUTION.md?raw';
import creatorContent from '../../CREATOR-DISCOVERY.md?raw';
import searchVsDiscContent from '../../SEARCH-VS-DISCOVERY.md?raw';
import scalingContent from '../../SCALING.md?raw';
import seoContent from '../../SEO.md?raw';
import securityContent from '../../SECURITY.md?raw';
import contributingContent from '../../CONTRIBUTING.md?raw';
import codeOfConductContent from '../../CODE_OF_CONDUCT.md?raw';
import licenseContent from '../../LICENSE.md?raw';
import changelogContent from '../../CHANGELOG.md?raw';

export const REPO_FILES: RepoFile[] = [
  {
    id: 'readme',
    filename: 'README.md',
    title: 'QEVRA — Open Web Discovery Overview',
    category: 'Overview',
    description: 'Main project documentation introducing QEVRA and the open-web discovery paradigm.',
    content: readmeContent
  },
  {
    id: 'architecture',
    filename: 'ARCHITECTURE.md',
    title: 'System Architecture Specification',
    category: 'Architecture',
    description: 'Decoupled engineering subsystems, pipeline flows, and public vs authenticated traffic separation.',
    content: archContent
  },
  {
    id: 'discovery',
    filename: 'DISCOVERY.md',
    title: 'Open-Web Discovery Paradigm',
    category: 'Discovery & Relevance',
    description: 'Contrast between social feeds, search engines, and open-web discovery.',
    content: discoveryContent
  },
  {
    id: 'relevance',
    filename: 'RELEVANCE.md',
    title: 'Relevance-Based Content Scoring',
    category: 'Discovery & Relevance',
    description: 'Multi-factor signal taxonomy, decay math, and domain diversity constraints.',
    content: relevanceContent
  },
  {
    id: 'search-vs-discovery',
    filename: 'SEARCH-VS-DISCOVERY.md',
    title: 'Search vs Discovery Deep-Dive',
    category: 'Discovery & Relevance',
    description: 'Intent-driven vs interest-driven retrieval models and behavioral comparisons.',
    content: searchVsDiscContent
  },
  {
    id: 'rss-ingestion',
    filename: 'RSS-INGESTION.md',
    title: 'RSS Ingestion Architecture',
    category: 'Ingestion & Media',
    description: 'Feed polling, content normalization, SHA-256 deduplication, and backoff.',
    content: rssContent
  },
  {
    id: 'image-delivery',
    filename: 'IMAGE-DELIVERY.md',
    title: 'Open-Web Image Delivery',
    category: 'Ingestion & Media',
    description: 'Media extraction, SSRF security guards, dynamic WebP optimization, and CDN caching.',
    content: imageContent
  },
  {
    id: 'scaling',
    filename: 'SCALING.md',
    title: 'Scaling & The Million-Publisher Problem',
    category: 'Architecture',
    description: 'Candidate reduction funnels, 1,500,000:1 information compression, and edge caching.',
    content: scalingContent
  },
  {
    id: 'publisher-distribution',
    filename: 'PUBLISHER-DISTRIBUTION.md',
    title: 'Publisher Content Distribution',
    category: 'Ecosystem',
    description: 'Topical and regional discovery opportunities for independent media.',
    content: publisherContent
  },
  {
    id: 'creator-discovery',
    filename: 'CREATOR-DISCOVERY.md',
    title: 'Creator Discovery Beyond Social Walled Gardens',
    category: 'Ecosystem',
    description: 'Indexing non-platform-bound creators, video channels, blogs, and audio feeds.',
    content: creatorContent
  },
  {
    id: 'seo',
    filename: 'SEO.md',
    title: 'Technical SEO & Open Web Discoverability',
    category: 'Ecosystem',
    description: 'Standards-based HTML semantics, canonical hygiene, and JSON-LD structured data.',
    content: seoContent
  },
  {
    id: 'security',
    filename: 'SECURITY.md',
    title: 'Security Policy & Vulnerability Guidelines',
    category: 'Governance',
    description: 'SSRF defense, payload limits, secret isolation, and vulnerability disclosure.',
    content: securityContent
  },
  {
    id: 'contributing',
    filename: 'CONTRIBUTING.md',
    title: 'Contribution Guidelines',
    category: 'Governance',
    description: 'Workflow for submitting relevance algorithms, feed benchmarks, and docs.',
    content: contributingContent
  },
  {
    id: 'code-of-conduct',
    filename: 'CODE_OF_CONDUCT.md',
    title: 'Contributor Code of Conduct',
    category: 'Governance',
    description: 'Community standards based on the Contributor Covenant.',
    content: codeOfConductContent
  },
  {
    id: 'license',
    filename: 'LICENSE.md',
    title: 'MIT License Terms',
    category: 'Governance',
    description: 'Open-source software and documentation license terms.',
    content: licenseContent
  },
  {
    id: 'changelog',
    filename: 'CHANGELOG.md',
    title: 'Release History & Changelog',
    category: 'Governance',
    description: 'Semantic version history and release logs.',
    content: changelogContent
  }
];

export { GITHUB_TOPICS, QEVRA_WEBSITE, REPO_DESCRIPTION, REPO_NAME, REPO_URL };
