import React, { Component } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
export default class Order extends Component {
    render() {
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
					<span>Cemo</span>
					<span>Cemo</span>
					<span>Cemo</span>
					<span>Cemo</span>
				</DndProvider>
            </div>
        )
    }
}
