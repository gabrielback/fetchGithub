const img_Foto = document.getElementById('foto');
const userImage = document.getElementById('foto')
const userName = document.getElementById('name')
const githubUserName = "gabrielback"

const getJson = data => fetch(data).then(response => response.json())
const url = data => data.url
const renderiza_foto = (foto) => img_Foto.src = `${foto}`
const loadPage = (url) => window.location.assign(url)

const headers = new Headers();
headers.append('Authorization', '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');

const getUserRepositories = (user) => {
    fetch("http://api.github.com/users/"+user+"/repos", {
        headers:headers
    })
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        let repo = await res.json()
        renderizarRepositorios(repo)
    })
    .then(
        getJson('../json/content.json')
        .then(data => {
            renderizarDashboard(data)
        })
        .then(
            getJson(`https://api.github.com/users/${githubUserName}`)
            .then(data => {
                renderizarUsuario(data)
            })
        )
    )
}
getUserRepositories(githubUserName)



const renderizarRepositorios = repositories => {
    const conteudoGithub = document.querySelector('.conteudoGithub');
    conteudoGithub.insertAdjacentHTML("afterbegin", `<h1>My Git Repositories</h1><div id="lista-repositorios">`)
    let listaDeRepositorios = conteudoGithub.firstChild.nextSibling
    repositories.map(repository => {
        let privacy = repository.private ? "private" : "public"
        let updatedAt = Intl.DateTimeFormat('pt-br').format(new Date(repository.updated_at))
        listaDeRepositorios.innerHTML += 
        ` 
        <div onclick="loadGithub('${repository.html_url}')" class="repositorio ${privacy}">
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

function renderizarDashboard(data){
    let dashboard = document.getElementById('dashboard')
    dashboard.insertAdjacentHTML("afterbegin", `
    <h1>${data[0].title}</h1>
        <div>
            <iframe id="pbi" width="100%" height="100%" src="" frameborder="0" allowFullScreen="true"></iframe>
        <div>`)
    let powerBI = document.getElementById('pbi')
    powerBI.src = data[0].url
}

const followers = (url) => {
    getJson(url)
    .then(data => data.map(user => {
        return user
    }))
}

followers("https://api.github.com/users/gabrielback/followers")

const renderizarUsuario = data => {
        document.querySelector('.content').insertAdjacentHTML(
            "afterbegin",
            `
            <div class="header">
            <div style="display: flex;">
            <img id="foto" src="${data.avatar_url}">
            <div id="user-name"></div>
            <div id="user-info">
                <div onclick="loadPage('${data.followers_url}')">Followers: ${data.followers}
                <div onclick="loadPage('${data.following_url}')">Following: ${data.following}
            </div>
            </div>
            </>
            </div>
            `
            )
            document.getElementById('user-name').innerHTML =
            `
            <h1>${data.name}</h1>
            `
        }
        