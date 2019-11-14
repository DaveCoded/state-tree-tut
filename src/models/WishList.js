import { types, getParent, destroy } from 'mobx-state-tree';

export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ''
    })
    .actions(self => ({
        changeName(newName) {
            self.name = newName;
        },
        changePrice(newPrice) {
            self.price = newPrice;
        },
        changeImage(newImage) {
            self.image = newImage;
        },
        remove() {
            // 2 means we want to go up two levels; one would take us into
            // the array of items, two into the WishList
            getParent(self, 2).remove(self);
        }
    }));

export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item);
        },
        remove(item) {
            destroy(item);
        }
    }))
    .views(self => ({
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0);
        }
    }));
