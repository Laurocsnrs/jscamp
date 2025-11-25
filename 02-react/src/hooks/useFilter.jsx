import { useEffect, useState } from "react"

const RESULTS_PER_PAGE = 4

export const useFilter = () => {
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("jobFilters")

        if (saved) {
            return JSON.parse(saved)
        }

        return {
            technology: "",
            location: "",
            experienceLevel: ""
        }
    })
    const [textoToFilter, setTextoToFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setloading] = useState(true)
    const [errors, setErrors] = useState(null)

    const hasActiveFilters = Boolean(
        filters.technology ||
        filters.location ||
        filters.experienceLevel
    )

    const handleClearFilter = () => {
        setFilters({
            technology: "",
            location: "",
            experienceLevel: ""
        })
        setCurrentPage(1)
    }

    useEffect(() => {
        localStorage.setItem("jobFilters", JSON.stringify(filters))
    }, [filters])

    useEffect(() => {
        async function fetchJobs() {
            try {
                setloading(true)

                const params = new URLSearchParams()

                if (textoToFilter) params.append("text", textoToFilter)
                if (filters.technology) params.append("technology", filters.technology)
                if (filters.location) params.append("location", filters.location)
                if (filters.experienceLevel) params.append("level", filters.experienceLevel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append("limit", RESULTS_PER_PAGE)
                params.append("offset", offset)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()

                setJobs(data.data)
                setTotal(data.total)

            } catch (error) {
                setErrors(error.message)
            } finally {
                setloading(false)
            }
        }

        fetchJobs()
    }, [filters, textoToFilter, currentPage])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextoToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return {
        loading,
        jobs,
        total,
        totalPages,
        currentPage,
        hasActiveFilters,
        filters,
        errors,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilter,
    }
}