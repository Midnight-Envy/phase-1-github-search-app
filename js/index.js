document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#github-form")
  const input = document.querySelector("#search")
  const userList = document.querySelector("#user-list")
  const repoList = document.querySelector("#repos-list")

  form.addEventListener("submit", event => {
    event.preventDefault()

    const searchTerm = input.value

    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    })
      .then(response => response.json())
      .then(data => {
        userList.textContent = ""
        repoList.textContent = ""

        data.items.forEach(user => {
          const li = document.createElement("li")

          const h3 = document.createElement("h3")
          h3.textContent = user.login

          const img = document.createElement("img")
          img.src = user.avatar_url
          img.alt = user.login
          img.width = 100

          const a = document.createElement("a")
          a.href = user.html_url
          a.textContent = "View GitHub Profile"
          a.target = "_blank"

          li.append(h3, img, a)

          li.addEventListener("click", () => {
            fetch(`https://api.github.com/users/${user.login}/repos`, {
              headers: {
                Accept: "application/vnd.github.v3+json"
              }
            })
              .then(response => response.json())
              .then(repos => {
                repoList.textContent = ""

                repos.forEach(repo => {
                  const repoLi = document.createElement("li")
                  repoLi.textContent = repo.name
                  repoList.append(repoLi)
                })
              })
          })

          userList.append(li)
        })
      })
  })
})