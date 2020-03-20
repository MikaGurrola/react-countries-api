import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Countries from '../../pages/Countries/Countries'
import Country from '../../pages/Country/Country'

function Main() {
  return (
    <main> 
      <Switch>
        <Route exact path="/" component={Countries} />
        <Route path="/country/:country" component={Country} />
      </Switch>
    </main>
  )
}

export default Main