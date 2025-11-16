import './index.css'
import jobsData from "./data.json"
import { Header } from './components/Header'
import { SearchFormSection } from './components/SearchFormSection'
import { JobListings } from './components/JobListings'
import { Pagination } from './components/Pagintation'
import { Footer } from './components/Footer'
import { useState } from 'react'

const RESULTS_PER_PAGE = 4

function App() {
    const [filters, setFilters] = useState({
        technology: "",
        location: "",
        experienceLevel: ""
    })
    const [textoToFilter, setTextoToFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const jobsFilteredByFilters = jobsData.filter(job => {
        return (
            (filters.technology === "" || job.data.technology === filters.technology)
        )
    })

    const jobsWithTextFilter = textoToFilter === ""
        ? jobsFilteredByFilters
        : jobsFilteredByFilters.filter(job => {
            return job.titulo.toLowerCase().includes(textoToFilter.toLowerCase())
        })

    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithTextFilter.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
    )

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

    return (
        <>
            <Header />
            <main>
                <SearchFormSection
                    onSearch={handleSearch}
                    onTextFilter={handleTextFilter}
                />
                <section>
                    <JobListings jobs={pagedResults} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default App
