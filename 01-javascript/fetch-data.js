const container = document.querySelector('.jobs-listings')
const pagination = document.querySelector('.pagination')
const lastAnchor = pagination.querySelector('a:last-child') // el último <a> del nav

const RESULTS_PER_PAGE = 5

fetch("./data.json") /* fetch es asíncrono */
    .then((response) => {
        return response.json();
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.className = 'job-listing-card'

            article.dataset.modalidad = job.data.modalidad
            article.dataset.nivel = job.data.nivel
            article.dataset.technology = job.data.technology

            article.innerHTML = `<div>
            <h3>${job.titulo}</h3>
            <small>${job.empresa} | ${job.ubicacion}</small>
            <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`

            container.appendChild(article)
        })

        const pages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

        for (let i = 0; i <= pages; i++) {
            const anchor = document.createElement('a')
            anchor.innerText = i + 1
            pagination.insertBefore(anchor, lastAnchor)
        }


    });