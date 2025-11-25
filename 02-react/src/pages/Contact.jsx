import { useState } from "react"

export const Contact = () => {

    const [error, setError] = useState("")
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
        message: ""
    })

    console.log(error)

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        const newForm = {
            name: formData.get("name"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            message: formData.get("message")
        }

        const errors = []

        for (const key in newForm) {
            if (!newForm[key].trim()) {
                errors.push(`El campo <strong>${key}</strong> es obligatorio`)
            }
        }

        if (errors.length > 0) {
            setError(errors.join(" - "))
            return
        }

        setForm(newForm)
    }

    return (
        <main className="contact">
            <section>
                <h1>Contacto</h1>
                <form
                    id="empleos-search-form"
                    onSubmit={handleSubmit}
                >
                    {error && <div className="errors">{error}</div>}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            id="name"
                            name="name"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Apellido"
                            id="lastName"
                            name="lastName"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="email@email.com"
                            id="email"
                            name="email"
                        />
                    </div>

                    <div>
                        <input
                            type="textarea"
                            placeholder="Mensaje"
                            id="message"
                            name="message"
                        />
                    </div>

                    <button>Enviar</button>

                </form>
                <span id="filter-selected-value"></span>
            </section >
        </main>
    )
}
