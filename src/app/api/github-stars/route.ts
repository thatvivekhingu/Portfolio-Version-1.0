import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? 'thatvivekhingu/portfolio-website';

interface RepoResponse {
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers,
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: RepoResponse = await response.json();

    return NextResponse.json({
      stars: data.stargazers_count,
      forks: data.forks_count,
      url: data.html_url,
      repo: GITHUB_REPO,
    });
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stars' },
      { status: 500 },
    );
  }
}
