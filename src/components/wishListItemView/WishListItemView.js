import React, { Component } from "react"
import { observer } from "mobx-react"
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"
import Button from "@material-ui/core/Button";

import WishListItemEdit from "../wishListItemEdit/WishListItemEdit"

class WishListItemView extends Component {
constructor() {
    super()
    this.state = { isEditing: false }
}

render() {
    const { item, readonly } = this.props
    return this.state.isEditing ? (
        this.renderEditable()
    ) : (
        <li className="item">
            {/* eslint-disable-next-line*/}
            {item.image && <img src={item.image} />}
            <h3>{item.name}</h3>
            <span>R$ {item.price}</span>
            {!readonly && (
                <span>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onToggleEdit}
                        >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.remove}
                        >
                        Remove
                    </Button>
                </span>
            )}
        </li>
    )
}

renderEditable() {
    return (
        <li className="item">
            <WishListItemEdit item={this.state.clone} />
            <Button
                variant="contained"
                color="primary"
                onClick={this.onSaveEdit}
                >
                Save
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={this.onCancelEdit}
                >
                Cancel
            </Button>
        </li>
    )
}

onToggleEdit = () => {
    this.setState({
        isEditing: true,
        clone: clone(this.props.item)
    })
}

onCancelEdit = () => {
    this.setState({ isEditing: false })
}

onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))
    this.setState({
        isEditing: false,
        clone: null
    })
}
}

export default observer(WishListItemView)
