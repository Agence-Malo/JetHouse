import { Octokit } from 'octokit'

const GitHubActionsTrigger = async () =>
  await new Octokit({ auth: process.env.GITHUB_PAT }).request(
    'POST /repos/{owner}/{repo}/dispatches',
    {
      owner: 'Agence-Malo',
      repo: 'JetHouse',
      event_type: 'content-update',
    },
  )

export default GitHubActionsTrigger
