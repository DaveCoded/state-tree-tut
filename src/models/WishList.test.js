import { getSnapshot } from 'mobx-state-tree'
import { WishListItem, WishList } from './WishList'

it("can create an instance of a model", () => {
    const item = WishListItem.create({
        name: "Chronicles of Narnia Box Set - C.S. Lewis",
        price: 28.73
    })

    expect(item.price).toBe(28.73)
    expect(item.image).toBe("")
    item.changeName("Narnia")
    expect(item.name).toBe("Narnia")
})

it("can create a wishlist", () => {
    const list = WishList.create({
        items: [
            {
                name: "Chronicles of Narnia Box Set - C.S. Lewis",
                price: 28.73
            }
        ]
    })
    expect(list.items.length).toBe(1)
    expect(list.items[0].price).toBe(28.73)
})

it("can add new items", () => {
    const list = WishList.create()
    list.add({
        name: "Chesterton",
        price: 10
    })

    expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe("Chesterton")
    list.items[0].changeName("Book of G.K. Chesterton")
    expect(list.items[0].name).toBe("Book of G.K. Chesterton")
    
    expect(getSnapshot(list)).toEqual({
        items: [{
            name: "Book of G.K. Chesterton",
            price: 10,
            image: ""
        }]
    })
})