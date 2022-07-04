import { Routes, Route } from 'react-router'
import { connect } from 'react-redux'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'

function _RootCmp() {
    return (
        <>
            <main>
            <AppHeader />
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
