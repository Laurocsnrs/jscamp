import styles from "./JobCard.module.css"
import { useState } from "react"

export function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false)

    const handleApllyClick = () => {
        setIsApplied(true)
    }

    const buttonClasses = isApplied ? styles.isApplied : styles.buttonApplyJob
    const buttonText = isApplied ? "Aplicado" : "Aplicar"

    return (
        <article
            className={styles.jobListingCard}
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
        >
            <div>
                <h3>{job.titulo}</h3>
                <small>{job.empresa} | {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <button
                className={buttonClasses}
                onClick={handleApllyClick}
            >
                {buttonText}
            </button>
        </article>
    )
}
