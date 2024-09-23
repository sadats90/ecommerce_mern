export const addDecimals = (num) => {
    return (Math.round(num)*100 / 100).toFixed(2)
    }


   export const updateCart = (state)=> {
        
            // calculate item prices
            state.itemPrice = addDecimals(state.cartItems.reduce((total,item)=>
                total + (item.price * item.qty)
            , 0))

            // add shipping price
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10)

            // calculate tax
            state.taxPrice = addDecimals(Number((0.05 * state.itemPrice).toFixed(2)))

            // total price 
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)


            localStorage.setItem('cart',JSON.stringify(state))

            return state
            
    }