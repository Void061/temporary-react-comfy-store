import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    // In questo caso l'id finale, sarà una combinazione tra
    // Id dell'elemento ed il suo colore scelto
    const { id, color, amount, product } = action.payload;
    // Certa tra gli items nella cart, uno che ha stessa combinazione di id e colore
    // Del prodotto che si sta provando ad aggiungere
    const tempItem = state.cart.find((i) => i.id === id + color);

    if (tempItem) {
      // Se esiste già, incrementiamo la sua quantità, sempre se non è al massimo
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          // Ritorniamo tutte le proprietà del prodotto, modificando solo l'amount
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      // Se non esiste, dobbiamo aggiungerlo
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        // Definisce quante unità massimo, si possono comprare
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);

    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
           return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } 
        return item;
      
    });

    return { ...state, cart: tempCart };
  }


  if(action.type === COUNT_CART_TOTALS){
    // Conteggio dei totali tornati con .reduce (JS)
    // total, rappresenta ciò che vogliamo tornare, cartItem, è l'elemento

    // Stiamo ritornando l'oggetto total, che ha come proprietà total_items a 0 e total amount a 0
    // Riprendiamo amount e price dall'elemento nella cart e sommiamo, per il totale di elementi gli amount
    // mentre per il prezzo, si fa, ogni quantità * prezzo
    // Si ritorna alla fine l'oggetto total che non avrà più i defaults a 0
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem;
      total.total_items += amount;
      total.total_amount += price * amount;
      return total;
    }, {
      total_items: 0, total_amount: 0
    });
    return { ...state, total_items, total_amount}
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
