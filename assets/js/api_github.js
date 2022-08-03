const img_Foto = document.getElementById('foto');
const userImage = document.getElementById('foto')
const userName = document.getElementById('name')
const githubUserName = "gabrielback"



const getUserRepositories = (user) => {
    fetch(`http://api.github.com/users/${user}/repos`)
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        let repo = await res.json()
        renderizarRepositorios(repo)
    })
    .then(
        fetch('../json/content.json')
        .then(response => response.json())
        .then(data => {
            renderizarDashboard(data)
        })
        .then(
            fetch(`https://api.github.com/users/${githubUserName}`)
            .then(response => response.json())
            .then(data => {
                renderizarUsuario(data)
            })
        )
    )
}
getUserRepositories(githubUserName)


const url = data => data.url

const renderiza_foto = (foto) => img_Foto.src = `${foto}`

const renderizarRepositorios = repositories => {
    const conteudoGithub = document.querySelector('.conteudoGithub');
    conteudoGithub.insertAdjacentHTML("afterbegin", `<h1>My Git Repositories</h1><div id="lista-repositorios">`)
    let listaDeRepositorios = conteudoGithub.firstChild.nextSibling
    repositories.map(repository => {
        let privacy = repository.private ? "private" : "public"
        let updatedAt = Intl.DateTimeFormat('pt-br').format(new Date(repository.updated_at))
        
        listaDeRepositorios.innerHTML += 
        ` 
        <div onclick="loadGithub(this)" class="repositorio ${privacy}">
        <h1>${repository.name}</h1>
        <p>${privacy}</p>
        <div>
        <p class="language">${repository.language ? repository.language : ""}<p>
        <p class="date">Last update: ${updatedAt}</p>
        <div>
        <div>
        `
    })
    conteudoGithub.innerHTML += "</div>"
}

const renderizarDashboard = data => {
    let dashboard = document.getElementById('dashboard')
    dashboard.insertAdjacentHTML("afterbegin", `
    <h1>${data[0].title}</h1>
        <div>
            <iframe id="pbi" width="100%" height="100%" src="" frameborder="0" allowFullScreen="true"></iframe>
        <div>`)
    let powerBI = document.getElementById('pbi')
    powerBI.src = data[0].url
}

const renderizarUsuario = data => {
        document.querySelector('.content').insertAdjacentHTML(
            "afterbegin",
            `
            <div class="header">
            <div style="display: flex;">
            <img id="foto" src="${data.avatar_url}">
            <div id="user-name"></div>
            </div>
            </div>
            `
            )
            document.getElementById('user-name').innerHTML =
            `
            <h1>${data.name}</h1>
            `
        }
       