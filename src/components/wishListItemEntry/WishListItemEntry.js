import React, { Component } from "react"
import { observer } from "mobx-react"

import WishListItemEdit from "../wishListItemEdit/WishListItemEdit"

import { WishListItem } from "../../models/wishList/WishList"

class WishListItemEntry extends Component {
    constructor() {
        super()
        this.state = {
            entry: WishListItem.create({
                name: "",
                price: 0
            })
        }
    }

    render() {
        return (
            <div>
                <WishListItemEdit item={this.state.entry} />
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }

    onAdd = () => {
        this.props.wishList.add(this.state.entry)
        this.setState({
            entry: WishListItem.create({ name: "", price: 0 })
        })
    }
}

export default observer(WishListItemEntry)