import './index.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { SearchPage } from './pages/Search'
import { Route } from './components/Route'
import { Contact } from './pages/Contact'

function App() {

    return (
        <>
            <Header />
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/contact" component={Contact} />
            <Footer />
        </>
    )
}

export default App
