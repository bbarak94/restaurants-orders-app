import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import routes from '../routes'

export class AppHeader extends React.Component {

   render() {
      return (
         <header className="app-header">
            <nav>
               {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>
         </header>
      )
   }
}