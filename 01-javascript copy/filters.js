const filterTechnology = document.querySelector('#filter-technology')
const filterLocation = document.querySelector('#filter-location')
const filterExperience = document.querySelector('#filter-experience-level')
const inputSearch = document.querySelector('#empleos-search-input')
const mensaje = document.querySelector('#filter-selected-value')

filterTechnology.addEventListener('change', () => {
    const jobs = document.querySelectorAll('.job-listing-card')

    const selectedValue = filterTechnology.value

    if (selectedValue) {
        mensaje.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    jobs.forEach(job => {
        const technology = job.getAttribute('data-technology')
        const techArray = technology.split(",")
        const isShown = selectedValue === '' || techArray.includes(selectedValue)
        job.classList.toggle('is-hidden', isShown === false)
    })
})

filterLocation.addEventListener('change', () => {
    const jobs = document.querySelectorAll('.job-listing-card')

    const selectedValue = filterLocation.value

    if (selectedValue) {
        mensaje.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    jobs.forEach(job => {
        // const modalidad = job.dataset.modalidad
        const modalidad = job.getAttribute('data-modalidad')
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', isShown === false)
    })
})

filterExperience.addEventListener('change', () => {
    const jobs = document.querySelectorAll('.job-listing-card')

    const selectedValue = filterExperience.value

    if (selectedValue) {
        mensaje.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    jobs.forEach(job => {
        const nivel = job.getAttribute('data-nivel')
        const isShown = selectedValue === '' || selectedValue === nivel
        job.classList.toggle('is-hidden', isShown === false)
    })
})

inputSearch.addEventListener('input', () => {
    const value = inputSearch.value.trim().toLowerCase()
    if (value === "") return
    const jobs = document.querySelectorAll('.job-listing-card')

    jobs.forEach(job => {
        const titulo = job.querySelector("h3").textContent.toLowerCase()
        const coincide = titulo.includes(value)
        job.classList.toggle("is-hidden", !coincide)
    })
})
