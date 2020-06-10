import React, { Component } from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const SortableItem = SortableElement(({value}) => <li>{value}</li>);
 
const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});
const arrayMove = (oldIndex,newIndex)=>{
    console.log(oldIndex);
    console.log(newIndex);
}
export default class Order extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
      };
      onSortEnd = ({oldIndex, newIndex}) => {
          let newArr = [...this.state.items];
         let spliced = newArr.splice(oldIndex,1)[0];
        //  newArr.splice(oldIndex,1);
        newArr.splice(newIndex,0,spliced);
            console.log(newArr);
        this.setState({
            items:newArr
        })
        console.log(oldIndex);
        console.log(newIndex)
      };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;


    }
}
