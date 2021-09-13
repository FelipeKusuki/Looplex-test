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
            },
            {
                name: "Batata",
                price: 4.50
            }
        ]
    })
});

it("Cria instancia do model", () => {
    expect(item.price).toBe(5000);
    expect(item.image).toBe("");
})

it("Cria uma lista de desejos", () => {
    expect(list.items.length).toBe(2);
    expect(list.items[0].price).toBe(5.50);
    expect(list.items[1].price).toBe(4.50);
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

it("Adicionando novos itens na lista com Snapshot", () => {
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

it("Calculo de preço total da lista", () => {
    const newlist = WishList.create(list)

    expect(newlist.totalPrice).toBe(10)

    let changed = 0
    reaction(() => newlist.totalPrice, () => changed++)

    expect(changed).toBe(0)
    newlist.items[0].changeName("Test")
    expect(changed).toBe(0)
    newlist.items[0].changePrice(100)
})