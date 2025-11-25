import '../../src/index.css'
import { SearchFormSection } from '../components/SearchFormSection'
import { JobListings } from '../components/JobListings'
import { Pagination } from '../components/Pagintation'
import { useFilter } from '../hooks/useFilter'

export function SearchPage() {

    const {
        jobs,
        total,
        loading,
        totalPages,
        currentPage,
        hasActiveFilters,
        filters,
        errors,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilter,
    } = useFilter()

    const title = loading
        ? `Cargando... - DevJobs`
        : `Resultados: ${total}, Pagina ${currentPage} - DevJobs`

    return (
        <main>
            <title>{title}</title>
            <SearchFormSection
                filters={filters}
                onSearch={handleSearch}
                onTextFilter={handleTextFilter}
                onClearFilter={handleClearFilter}
                hasActiveFilters={hasActiveFilters}
            />
            <section>
                <JobListings jobs={jobs} loading={loading} errors={errors} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>
        </main>
    )
}