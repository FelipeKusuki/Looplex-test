import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { reaction } from "mobx"
import { WishList, WishListItem } from "./WishList.js";

let item = null;
let list = null;

beforeEach(() => {
    item = WishListItem.create({
        name: "PlayStation 5",
        price: 5000
    })

    list = WishList.create({
        items: [
            {
                name: "Garrafa de água",
                price: 5.50
            }
        ]
    })
});

it("Cria instancia do model", () => {
    expect(item.price).toBe(5000);
    expect(item.image).toBe("");
})

it("Cria uma lista de desejos", () => {
    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(5.50);
})

it("Adicionando novos itens na lista com Patches", () => {
    const list = WishList.create()
    const patches = []
    onPatch(list, patch => {
        patches.push(patch)
    })
    list.add(item)
    list.items[0].changeName("PlayStation 5")
    expect(patches).toMatchSnapshot()
})

it("can add new items", () => {
    const list = WishList.create()
    const states = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })

    list.add(item)

    expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe("PlayStation 5")

    list.items[0].changeName("Xbox")

    expect(list.items[0].name).toBe("Xbox")
    expect(getSnapshot(list)).toMatchSnapshot()
    expect(states).toMatchSnapshot()
})
