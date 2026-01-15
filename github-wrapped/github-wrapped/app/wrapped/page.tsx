import { cookies } from "next/headers";
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

  while (true) {
    // Build the URL
    const url = `https://api.github.com/repos/${owner}/${repo}/commits` +
      `?author=${username}&per_page=100&page=${page}`;

    // Make the request
    const res = await fetch(url, {headers: getGitHubHeaders(token)});

  
    // if (!res.ok) {
    //   console.error(`Failed to fetch commits for ${repo}`);
    //   break;
    // }

    // Parse response
    const commits = await res.json();

    //  Stop condition
    if (commits.length === 0) {
      break;
    }

    // Accumulate
    totalCommits += commits.length;

    //  Next page
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


// Builder (Main Entry)


export async function buildWrappedData(
  token: string
): Promise<WrappedData> {
  const userResponse = await fetch("https://api.github.com/user", {headers: getGitHubHeaders(token)});
  const user = await userResponse.json();
  const { username } = await fetchGitHubUser(token);

  const reposResponse = await fetch("https://api.github.com/user/repos", {headers: getGitHubHeaders(token)});
  const repos = await fetchRepositories(token);

  let totalCommits = 0;
  for (const repo of repos) {
    totalCommits += await fetchRepoCommitCount({
      owner: repo.owner.login,
      repo: repo.name,
      token,
      username
    });
  }
const languageMaps = await Promise.all(
  repos.map((repo: any) =>
    fetchRepoLanguages(repo.owner.login, repo.name, token)
  )
);
  const aggregatedLanguages = aggregateLanguages(languageMaps);
  const topLanguages = aggregatedLanguages
    .slice(0, 3)
    .map(([lang]) => lang);

  
  const stars = repos.reduce(
    (sum: number, r: any) => sum + r.stargazers_count,
    0
  );


  const personality = getCodingPersonality({
    commits: totalCommits,
    stars,
    topLanguage: topLanguages[0] ?? "Unknown",
  });

  
  return {
    username,
    commits: totalCommits,
    stars,
    topLanguages,
    personality,
  };
  
  // 1. fetch user
  // 2. fetch repositories
  // 3. for each repo → commits + languages
  // 4. aggregate commits
  // 5. aggregate languages
  // 6. count stars
  // 7. compute personality
  // 8. return WrappedData
}

export default async function WrappedPage() {
  const token = (await cookies()).get("github_token")?.value;

  if (!token) return <p>Not authenticated</p>;

  const data = await buildWrappedData(token);

  return (
  <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
    <h1>GitHub Wrapped 🎁</h1>

    <p><strong>User:</strong> {data.username}</p>
    <p><strong>Total commits:</strong> {data.commits}</p>
    <p><strong>Total stars:</strong> {data.stars}</p>

    <p><strong>Top languages:</strong></p>
    <ul>
      {data.topLanguages.map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>

    <p><strong>Personality:</strong> {data.personality}</p>
  </main>
);
}
