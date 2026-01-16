
import { cookies } from "next/headers";
import WrappedSlides from "./wrapped-slides";

// Types


export type Repo = {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
};

export type LanguageMap = Record<string, number>;

export type WrappedData = {
  username: string;
  commits: number;
  stars: number;
  topLanguages: string[];
  personality: string;
  personalityDescription: string;
};


// Helpers


function getGitHubHeaders(token: string): HeadersInit {
  // TODO: return Authorization + User-Agent headers
  return {
    Authorization: `Bearer ${token}`,
    "User-Agent": "GH-Wrapped",
    Accept: "application/vnd.github+json"
  };
}


// Fetch Functions


export async function fetchGitHubUser(
  token: string
): Promise<{ username: string }> {

  const response = await fetch("https://api.github.com/user", { headers: getGitHubHeaders(token) });
  const data = await  response.json();
  const username = data.login;

  // 1. fetch https://api.github.com/user
  // 2. parse JSON
  // 3. return { username }
  return { username };
}

export async function fetchRepositories(
  token: string
): Promise<Repo[]> {
  const response = await fetch("https://api.github.com/user/repos", {headers: getGitHubHeaders(token)});
  const data = await response.json();
  const ownedRepos = data.filter((repo:any) => !repo.fork);
  const repos: Repo [] = ownedRepos.map((repo:any) => ({
    name: repo.name,
    owner: {
      login: repo.owner.login
    },
    stargazers_count: repo.stargazers_count,
  }));

  // 1. fetch https://api.github.com/user/repos
  // 2. optionally filter forks
  // 3. return minimal Repo objects
  return repos;
}

type FetchCommitCountParams = {
  owner: string;
  repo: string;
  token: string;
  username: string;
};

export async function fetchRepoCommitCount({
  owner,
  repo,
  token,
  username,
}: FetchCommitCountParams): Promise<number> {
  let page = 1;
  let totalCommits = 0;

  const since = "2025-01-01T00:00:00Z";
  const until = "2025-12-31T23:59:59Z";

  while (page <= 5) {
    const url =
      `https://api.github.com/repos/${owner}/${repo}/commits` +
      `?author=${username}` +
      `&since=${since}` +
      `&until=${until}` +
      `&per_page=100&page=${page}`;

    const res = await fetch(url, { headers: getGitHubHeaders(token) });

    if (!res.ok) break;

    const commits = await res.json();

    if (!Array.isArray(commits) || commits.length === 0) break;

    totalCommits += commits.length;
    page++;
  }

  return totalCommits;
}




export async function fetchRepoLanguages(
  owner: string,
  repo: string,
  token: string
): Promise<LanguageMap> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {headers: getGitHubHeaders(token)});
  

  // 1. fetch repo languages
  // 2. return language → bytes map
  return response.json();
}

// Aggregation Logic


export function aggregateLanguages(
  languageMaps: LanguageMap[]
): [string, number][] {
  const sum: LanguageMap = {};
  for (const map of languageMaps){
    for(const language in map){
      sum[language] = (sum[language] || 0) +map[language];
    }
  }

  // 1. sum bytes per language
  // 2. sort descending
  // 3. return [language, totalBytes]
  return Object.entries(sum).sort((a,b) => b[1] - a[1]);
}

export function getCodingPersonality(params: {
  commits: number;
  stars: number;
  topLanguage: string;
}): string {
  const { commits, stars, topLanguage } = params;
  if (commits > 800) return "The Machine 🧠⚡";
  if (stars > 200) return "The Open-Source Icon 🌍";
  if (topLanguage === "TypeScript") return "The Architect 🏗️";
  if (topLanguage === "Python") return "The Problem Solver 🐍";
  if (topLanguage === "C++") return "The Systems Engineer ⚙️";
  if (topLanguage === "JavaScript") return "The Builder 🛠️";

  return "The Explorer 🚀";

  // heuristic-based personality logic
 
}

export function getCodingPersonalityDescription(params: {
  personality: string;
}): string {
  const { personality } = params;

  if (personality === "The Machine 🧠⚡")
    return "Your year was defined by sheer momentum. A high volume of commits shows relentless consistency and hands-on problem solving — you’re always building, refining, and pushing forward.";

  if (personality === "The Open-Source Icon 🌍")
    return "Your repositories attracted significant attention, earning stars from the community. That recognition reflects the value and impact of the work you share openly.";

  if (personality === "The Architect 🏗️")
    return "TypeScript being your top language points to a focus on structure, scalability, and thoughtful design. You enjoy shaping systems that are clean, maintainable, and built to last.";

  if (personality === "The Problem Solver 🐍")
    return "With Python as your most-used language, your work leans toward problem solving, automation, and clarity. You favor elegant solutions that get straight to the point.";

  if (personality === "The Systems Engineer ⚙️")
    return "C++ standing out as your top language highlights a preference for performance, control, and low-level understanding. You’re comfortable working close to the system’s core.";

  if (personality === "The Builder 🛠️")
    return "JavaScript dominating your activity shows a strong focus on building interactive and functional products. You turn ideas into working experiences, one feature at a time.";

  return "Your activity shows curiosity and versatility. You explore different tools and approaches, adapting your style as you learn and grow as a developer.";
}


  



// Builder (Main Entry)
async function fetchYearlyCommitCount(
  token: string,
  year: number
): Promise<number> {
  const query = `
    query ($from: DateTime!, $to: DateTime!) {
      viewer {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  const variables = {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GraphQL commit count");
  }

  const json = await res.json();
  return (
    json?.data?.viewer?.contributionsCollection
      ?.totalCommitContributions ?? 0
  );
}



export async function buildWrappedData(
  token: string
): Promise<WrappedData> {
  const { username } = await fetchGitHubUser(token);

  // ⭐ Accurate yearly commits (matches GitHub)
  const commits = await fetchYearlyCommitCount(token, 2025);

  const repos = await fetchRepositories(token);

  const languageMaps = await Promise.all(
    repos.map((repo) =>
      fetchRepoLanguages(repo.owner.login, repo.name, token)
    )
  );

  const aggregatedLanguages = aggregateLanguages(languageMaps);
  const topLanguages = aggregatedLanguages
    .slice(0, 3)
    .map(([lang]) => lang);

  const stars = repos.reduce(
    (sum, r) => sum + r.stargazers_count,
    0
  );

  const personality = getCodingPersonality({
    commits,
    stars,
    topLanguage: topLanguages[0] ?? "Unknown",
  });

  const personalityDescription = getCodingPersonalityDescription({personality});

  return {
    username,
    commits,
    stars,
    topLanguages,
    personality,
    personalityDescription
  };
}

  
  // 1. fetch user
  // 2. fetch repositories
  // 3. for each repo → commits + languages
  // 4. aggregate commits
  // 5. aggregate languages
  // 6. count stars
  // 7. compute personality
  // 8. return WrappedData


export default async function WrappedPage() {
  const token = (await cookies()).get("github_token")?.value;

  if (!token) return <p>Not authenticated</p>;

  const data = await buildWrappedData(token);

  return <WrappedSlides data={data} />;
}
