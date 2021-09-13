import React from "react"
import { observer } from "mobx-react"

import WishListItemView from "../wishListItemView/WishListItemView"
import WishListItemEntry from "../wishListItemEntry/WishListItemEntry"

const WishListView = ({ wishList, readonly }) => (
    <div className="list">
        <ul>
            {wishList.items.map((item, idx) => (
                <WishListItemView key={idx} item={item} readonly={readonly} />
            ))}
        </ul>
        Total: R$ {wishList.totalPrice} {!readonly && <WishListItemEntry wishList={wishList} />}
    </div>
)

export default observer(WishListView)