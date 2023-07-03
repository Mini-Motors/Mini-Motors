API Reference:

Cars:

		GET:
			/api/cars/:carId/cart    		<get "Active" carts which contain the provided carID>  <<Ajax inputs: { carId }>>
			/api/cars				<get all cars>
		POST:
			/api/cars				<create new car - requires isAdmin = true>  <<Ajax inputs: { manufacturer, model, type, color, price } >>
		PATCH: 
			/api/cars/:carId		  	<updates an existing car - requires isAdmin = true>  <<Ajax inputs: { carId }>>
		DELETE:
			/api/cars/:carID			<deletes a car from the database - requires isAdmin = true>  <<Ajax inputs: { carId }>>


Cart_Items:

		PATCH:
			/api/cart_items/:cartItemId		<updates cart item - used to update price - requires bearer token>  <<Ajax inputs: { cart_item.Id, currentPrice }>>
		DELETE:
			/api/cart_items/:cartItemId		<deletes an item from the cart - requires bearer token>  <<Ajax inputs: { cart_item.Id }>>


Cart:

		GET:
			/api/cart 				<gets all active carts - requires user isAdmin = true>
		POST:
			/api/cart				<creates a new cart for the user>
			/api/cart/:cartId/cars			<used to add a car to a user's cart>  <<Ajax inputs: { cart.Id, car.Id }>>
		PATCH:
			/api/cart/:cartItemId			<updates a users cart - used to change favorites or active>  <<Ajax inputs: { cart.Id, favorites, isActive }>>
		DELETE:
			/api/cart/:cartItemId			<deletes a user's cart>  <<Ajax inputs: { cart.Id }>>


Users:

		GET:
			/api/users/me				<gets logged in user's information - requires bearer token>
			/api/users/:username/cart 		<gets a list of user's carts and its attached cart_items - requires bearer token>   <<Ajax inputs: { username }>>
		POST:
			/api/users/register			<allows for registering of a new user - requires username/password> <<Ajax inputs: { username, password, isAdmin }>>
			/api/users/login			<allows registered user to login - returns JWT bearer token>  <<Ajax inputs: { username, password }>>
