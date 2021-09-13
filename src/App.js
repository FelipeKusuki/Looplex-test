import React, { Component } from "react"
import { observer } from "mobx-react"
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import logo from "./assets/santa-claus.png"
import WishListView from "./components/wishListView/WishListView"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedUser: null }
    }

    render() {
        const { group } = this.props
        const selectedUser = group?.users.get(this.state.selectedUser)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">WishList</h1>
                </header>
                <div className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={group?.reload}
                    >
                    Reload
                </Button>

                <Select
                    labelId="user-select-label"
                    id="user-select"
                    value={selectedUser}
                    onChange={this.onSelectUser}>
                    <MenuItem value={'Select user'}>- Select user -</MenuItem>
                    {Array.from(group.users.values()).map(user => (
                        <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                    ))}
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={group?.drawLots}
                    >
                    Draw lots
                </Button>
                </div>
                {selectedUser && <User user={selectedUser} />}
            </div>
        )
    }

    onSelectUser = event => {
        this.setState({ selectedUser: event.target.value })
    }
}

const User = observer(({ user }) => (
    <div>
        <WishListView wishList={user.wishList} />
        <Button
            variant="contained"
            color="primary"
            onClick={user.getSuggestions}
            >
            Suggestions
        </Button>
        <hr />
        <h2>{user.recipient ? user.recipient.name : ""}</h2>
        {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
    </div>
))

export default observer(App)