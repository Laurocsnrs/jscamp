import { JobCard } from "./JobCard";
import { Spinner } from "./Spinner";

export function JobListings({ jobs, loading, errors }) {

    return (
        <>
            <h2>Resultados de búsqueda</h2>
            <div className="jobs-listings">

                {loading && <Spinner />}

                {!loading && errors && (
                    <div className="error">
                        <h2>Ocurrió un error</h2>
                        <p>{errors}</p>
                        <button onClick={() => window.location.reload()}>
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !errors && jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}

                {!loading && !errors && jobs.length === 0 && (
                    <p style={{ textAlign: "center", padding: "20px", textWrap: "balance" }}>No se han encontrado empleos que coincidan con los criterios de busqueda.</p>
                )}

            </div>
        </>
    );
}
