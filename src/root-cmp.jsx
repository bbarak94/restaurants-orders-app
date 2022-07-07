import { Routes, Route } from 'react-router'
import { connect } from 'react-redux'
import { createContext, useState } from 'react'
import routes from './routes'

import { AppNavigation } from './cmps/app-navigation'
import { AppFooter } from './cmps/app-footer'

export const ThemeContext = createContext(null)

function _RootCmp() {
    // const [theme, setTheme] = useState('dark')

    // const toggleTheme = () => {
    //     console.log('theme toggled')
    //     setTheme((curr) => ((curr === 'light') ? 'dark' : 'light'))
    // }
    return (
        <>
            {/* <main id={theme}> */}
            <main>
                {/* <AppNavigation theme={theme} toggleTheme={toggleTheme} /> */}
                <AppNavigation/>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
                <AppFooter />
            </main>
        </>
    )
}


function mapDispatchToProps(storeState) {
    return {}
}

function mapStateToProps(storeState) {
    return {}
}

export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp)
