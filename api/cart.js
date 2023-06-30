const express = require('express');
const cartRouter = express.Router();
const { requireUser } = require('./utils');
const {
    createCart,
    addCartToUser,
} = require("../db");

cartRouter.get("/", async (req, res, next) => {
    try {
        const items = await createCart();
        res.send(items);
    } catch (error) {
        next(error);
    }
});

cartRouter.post('/', requireUser, async (req, res, next) => {
    const { carId, currentPrice } = req.body;
    try {
        const itemTotal = await totalAmount({ carId, currentPrice });
        if (!itemTotal) {
            next({ carId, message: `An activity with name ${carId} already exists` });
        } else {
            res.send(itemTotal);
        }
    } catch (error) {
        next(error);
    }
})

router.patch("/:UserCartId", requireUser, async (req, res, next) => {
    const { UserCartId } = req.params;
    const { totalPrice } = req.body;
    const id = req.user.id;
    try {
        const cartToUpdate = await getUserCartById(UserCartId);
        // const cartId = await getCartById(cartToUpdate.cartId);

        if (!cartToUpdate) {
            next({message: "no User Cart found" });
        }
        const checkUser = await canEditCart(UserCartId, id);
        if (!checkUser) {
            next({
                message: "Error",
            });
        } else {
            const updateCart = await updateRoutineActivity({
                id: UserCartId,
                totalPrice,
            });
            res.send(updateCart);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = cartRouter;
