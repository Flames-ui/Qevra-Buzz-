export interface RepoFile {
  id: string;
  filename: string;
  title: string;
  category: 'Overview' | 'Architecture' | 'Discovery & Relevance' | 'Ingestion & Media' | 'Ecosystem' | 'Governance';
  description: string;
  content: string;
}

export const REPO_DESCRIPTION = "Open-web discovery architecture, relevance systems, RSS ingestion, publisher distribution, and scalable content discovery — documented through the QEVRA project.";
export const REPO_NAME = "qevra-open-web-discovery";
export const REPO_URL = "https://github.com/qevra/qevra-open-web-discovery";
export const QEVRA_WEBSITE = "https://qevra.buzz";

export const GITHUB_TOPICS = [
  "qevra",
  "web-discovery",
  "content-discovery",
  "rss",
  "recommendation-system",
  "search",
  "content-ranking",
  "publishers",
  "creators",
  "web-platform"
];
