API Reference:

Cars:

		GET:
			/api/cars/:carId/cart    			<get "Active" carts which contain the provided carID>
			/api/cars				 							<get all cars>
		POST:
			/api/cars				 		 					<create new car - checks to see if there is an existing car>
		PATCH: 
			/api/cars/:carId		  		 		<updates an existing car>

Cart_Items:

		PATCH:
			/api/cart_items/:cartItemId		 <updates cart item - used to update price>
		DELETE:
			/api/cart_items/:cartItemId		 <deletes an item from the cart>


Cart:

		GET:
			/api/cart 										<gets all active carts - user must be admin>
		POST:
			/api/cart											<creates a new cart for the user>
			/api/cart/:cartId/cars				<used to add a car to a user's cart>
		PATCH:
			/api/cart/:cartItemId					<updates a users cart - used to change favorites or active>
		DELETE:
			/api/cart/:cartItemId					<deletes a user's cart>


Users:

		GET:
			/api/users/me									<gets logged in user's information>
			/api/users/:username/cart 		<gets a list of user's carts and its attached cart_items>
		POST:
			/api/users/register						<allows for registering of a new user - requires username/password>
			/api/users/login							<allows registered user to login - returns JWT bearer token>