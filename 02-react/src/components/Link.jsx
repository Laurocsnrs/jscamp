import { useRouter } from "../hooks/useRouter"

export default function Link({ href, children, ...restOfProps }) {

    const { navigateTo, currentPath } = useRouter()

    const handClick = (event) => {
        event.preventDefault()
        navigateTo(href)
    }

    const activeStyle = currentPath === href ? {
        color: "#09f", textDecoration: "none"
    } : {}

    return (
        <a href={href} {...restOfProps} onClick={handClick} style={activeStyle}>
            {children}
        </a >
    )
}