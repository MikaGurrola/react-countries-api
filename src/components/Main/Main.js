import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Countries from '../../pages/Countries/Countries'
import Country from '../../pages/Country/Country'
import ScrollIntoView from '../ScrollIntoView/ScrollIntoView'

function Main() {
  return (
    <main> 
      <ScrollIntoView>
        <Switch>
          <Route onUpdate={() => window.scrollTo(0, 0)}  exact path="/" component={Countries} />
          <Route onUpdate={() => window.scrollTo(0, 0)}  path="/country/:country" component={Country} />
        </Switch>
      </ScrollIntoView>
    </main>
  )
}

export default Main