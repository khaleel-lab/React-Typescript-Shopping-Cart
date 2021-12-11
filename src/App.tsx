import { useState } from 'react';
import { isError, useQuery } from 'react-query';
// Components
import { Grid, Drawer, LinearProgress, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
// Styles
import { StyledButton, Wrapper } from './App.styles';
import { Item } from './components/item/Item';
import Cart from './components/cart/Cart';
// Types
export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	quantity: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch('https://fakestoreapi.com/products')).json();
};

const App = () => {
	const [cartIsOpen, setCartIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, error, isError } = useQuery<CartItemType[]>(
		'products',
		getProducts
	);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((acK: number, item) => acK + item.quantity, 0);

	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems((prevState) => {
			// 1. Is the item already added in the cart?
			const isItemInCart = prevState.find((item) => item.id === clickedItem.id);
			if (isItemInCart) {
				return prevState.map((item) =>
					item.id === clickedItem.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			// First time the item is added
			return [...prevState, { ...clickedItem, quantity: 1 }];
		});
	};
	const handleRemoveFromCart = (id: number) => {
		setCartItems((prev) =>
			prev.reduce((ack, item) => {
				if (item.id === id) {
					if (item.quantity === 1) return ack;
					return [...ack, { ...item, quantity: item.quantity - 1 }];
				} else {
					return [...ack, item];
				}
			}, [] as CartItemType[])
		);
	};

	console.log(data);

	if (isLoading) return <LinearProgress />;
	if (error) return <div>"Something went wrong..."</div>;

	return (
		<Wrapper>
			<Drawer
				anchor='right'
				open={cartIsOpen}
				onClose={() => setCartIsOpen(false)}
			>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
				/>
			</Drawer>
			<StyledButton onClick={() => setCartIsOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color='error'>
					<AddShoppingCart />
				</Badge>
			</StyledButton>

			<Grid container spacing={2}>
				{data?.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
