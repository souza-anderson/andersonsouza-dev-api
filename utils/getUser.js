

const getUser = async (username) => {
  const resUser = await fetch(`https://api.github.com/users/${username}`)
  const user = await resUser.json()

  const resRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  const originalRepos = await resRepos.json()

  const dontShowRepo = [`${username}/modulos-testes`, `${username}/acesso-bd-exemplos`]
  const isNotFork = repo => !repo.fork
  const dontShowFilter = repo => dontShowRepo.indexOf(repo.full_name) === -1
  const extractData = repo => {
    return {
      id: repo.id,
      full_name: repo.full_name,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
    }
  }
  const repos = originalRepos
    .filter(isNotFork)
    .filter(dontShowFilter)
    .map(extractData)

    return { repos, user }
}

export default getUser