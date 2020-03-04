import React, { Component, createContext } from 'react'

export const ScrumContext2 = createContext()

export default class ScrumContext extends Component {




    render() {
        return (
            <ScrumContext2.Provider >
                {this.props.children}
            </ScrumContext2.Provider>
        )
    }
}
