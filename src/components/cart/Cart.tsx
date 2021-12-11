import CartItem from '../cartItem/CartItem';
// Styles
import { CartWrapper } from './Cart.styles';
// Types
import { CartItemType } from '../../App';

type CartProps = {
	cartItems: CartItemType[];
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};
const Cart = ({ cartItems, addToCart, removeFromCart }: CartProps) => {
	const calculateTotal = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
	return (
		<CartWrapper>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 ? <p>No items in cart.</p> : null}
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h2>Total: $ {calculateTotal(cartItems).toFixed(2)}</h2>
		</CartWrapper>
	);
};

export default Cart;
