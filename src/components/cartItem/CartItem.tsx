import { Button } from '@material-ui/core';
// Types
import { CartItemType } from '../../App';
// Styles
import { CartItemWrapper } from './CartItem.styles';

type CartItemProps = {
	item: CartItemType;
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};
const CartItem = ({ item, addToCart, removeFromCart }: CartItemProps) => {
	return (
		<CartItemWrapper>
			<div>
				<h3>{item.title}</h3>
				<div className='information'>
					<p>Price: $ {item.price}</p>
					<p>Total: $ {(item.quantity * item.price).toFixed(2)}</p>
				</div>
				<div className='buttons'>
					<Button
						size='small'
						disableElevation
						variant='contained'
						onClick={() => removeFromCart(item.id)}
					>
						-
					</Button>
					<p>{item.quantity}</p>
					<Button
						size='small'
						disableElevation
						variant='contained'
						onClick={() => addToCart(item)}
					>
						+
					</Button>
				</div>
			</div>
			<img src={item.image} alt={item.title} />
		</CartItemWrapper>
	);
};

export default CartItem;
