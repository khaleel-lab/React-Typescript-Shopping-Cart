import { Button } from '@material-ui/core';
// Types
import { CartItemType } from '../../App';
// Styles
import { ItemWrapper } from './Item.styles';

type ItemProps = {
	item: CartItemType;
	handleAddToCart: (clickedItem: CartItemType) => void;
};

// export const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => (
// 	<ItemWrapper>
// 		<img src={item.image} alt={item.title} />
// 		<div>
// 			<h3>{item.title}</h3>
// 			<p>{item.description}</p>
// 			<h3>{item.price}</h3>
// 		</div>
// 		<Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
// 	</ItemWrapper>
// );

export const Item = ({ item, handleAddToCart }: ItemProps) => {
	return (
		<ItemWrapper>
			<img src={item.image} alt={item.title} />
			<div>
				<h3>{item.title}</h3>
				<p>{item.description}</p>
				<h3>$ {item.price}</h3>
			</div>
			<Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
		</ItemWrapper>
	);
};
