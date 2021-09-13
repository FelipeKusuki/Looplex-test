import { destroy, getParent, types } from "mobx-state-tree"

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    image: ""
})
.actions(obj => ({
    changeName(newName) {
        obj.name = newName
    },
    changePrice(newPrice) {
        obj.price = newPrice
    },
    changeImage(newImage) {
        obj.image = newImage
    },
    remove() {
        getParent(obj, 2).remove(obj)
    }
}))

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), [])
})
.actions(obj => ({
    add(item) {
        obj.items.push(item)
    },
    remove(item) {
        destroy(item)
    }
}))
.views(obj => ({
    get totalPrice() {
        return obj.items.reduce((sum, entry) => sum + entry.price, 0)
    }
}))