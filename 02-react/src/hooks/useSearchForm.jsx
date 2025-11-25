import { useState } from "react"

let timeoutId = null

export const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {
    const [searchText, setsearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target.form)

        if (event.target.name === idText) {
            return
        }

        const filters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        }

        onSearch(filters)
    }

    //unificar < >

    const handleTextChange = (event) => {
        const text = event.target.value

        setsearchText(text)

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            onTextFilter(text)
        }, 1000);
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }
}