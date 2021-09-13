import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

import { getSnapshot } from "mobx-state-tree"

import { Group } from "./models/group/Group"

let initialState = { users: {} }

let group = (window.group = Group.create(initialState))

function renderApp() {
    ReactDOM.render(<App group={group} />, document.getElementById("root"))
}

renderApp()

if (module.hot) {
    module.hot.accept(["./App"], () => {
        // new components
        renderApp()
    })

    module.hot.accept(["./models/group/Group"], () => {
        // new model definitions
        const snapshot = getSnapshot(group)
        group = window.group = Group.create(snapshot)
        renderApp()
    })
}