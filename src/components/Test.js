import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      newItem: ""
    };
  }
  updateInput = (key, value) => {
    console.log(key + " " + value);
    // update react state
    this.setState({ [key]: value });
    if (key === "Enter") {
      console.log("Chamito pizza");
    }

    // update localStorage
    localStorage.setItem(key, value);
  };
  addItem() {
    // create a new item, {id, text value}
    const newItem = {
      id: Date.now(),
      value: this.state.newItem.slice()
    };

    // copy current list of items from state

    const list = [...this.state.list];

    // add the new item to the list push
    list.push(newItem);

    // update state with new list, reset the new item input (Setstate)
    this.setState({
      list,
      newItem: ""
    });
    // update localStorage
    /* Because localStorage can only store strings, 
    arrays and objects need to be passed into JSON.stringify() 
    before being passed to setItem(). */
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem", "");
  }
  deleteItem(id) {
    //Copy the current list of items
    const list = [...this.state.list];
    //filter them
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
    //Update localStorage
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  render() {
    console.log(this);
    return (
      <form onSubmit={this.addItem}>
        <label>
          TODO:
          <input
            type="text"
            onChange={e => this.updateInput("newItem", e.target.value)}
            ref={node => (this.input = node)}
          />
        </label>
        <input type="submit" value="Submit" />
        <p>{this.state.list}</p>
      </form>
    );
  }
}

export default Test; // Don’t forget to use export default!
