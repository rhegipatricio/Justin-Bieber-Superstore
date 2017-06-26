# bieBay

OVERVIEW

For this project, a mock Justin Bieber online store app was made that runs on the backend and from the command line. Here a customer may purchase select merchandise. A manager may also login to be able to see how merchandise is selling as well as add to existing quantity amount and add new products. 

Here is the demonstration video link: [![IMAGE ALT TEXT](/images_for_readmebiebay_tutorial_screenshot_link.png)](https://www.youtube.com/watch?v=k0D0IMgQhIQ "bieBay Tutorial")

CUSTOMER VIEW

Command line command to run app with customer view
"node biebaycustomer" (without quotations)

![](/images_for_readme/01_original_database.png)

Here we have the set merchandice current database for products.

![](/images_for_readme/02_successful_completed_customer_transaction.png)

This is the view of a successful transaction. The customer has chosen a hat for $30. She has chosen to buy 4. As a result, the amount due is $120. The transaction is successful.

![](/images_for_readme/03_new_database_after_transaction.png)

As a result of the successful transaction, the database has changed. Since the customer has bought 4, the stock quantity of the hat (item_id 1) has gone down by 4. It was 30 and now it's 26.

![](/images_for_readme/04_error_transaction_ask_again.png)

This is an example of an error in which the customer is trying to buy more quantities than the store has. They have requested 70 posters (because they really LOVE Bieber) when the store only has 50 available. Because of this, an error message will show stating that the transaction cannot be completed due to the store not having a sufficient inventory amount. Justin Bieber is truly sorry that he states, "My bad" and requests that the user picks another number under 50. The buyer is sad, but goes with 10 posters (but still plans to buy an additional amount in the future to fulfill their Bieber love). The amount due is read and the transaction is complete so the buyer can continue to keep on Beliebing. 

![](/images_for_readme/05_new_database_after_successful_and_error_transaction.png)

The Database is now updated to show the current amount after the two transactions. The hats are down to 26 from 30 and the posters are down to 40 from the original 50.








MANAGER VIEW

Command line command to run app with manager view
"node biebaymanager" (without quotations)

Running this command will show the choices that the manager may make.

![](/images_for_readme/06_manager_choices.png)

Here lists the current choices the manager can choose by using the arrow keys and by hitting enter. 
These are:
  - View Current Products
  - View Low Inventory (anything item with a quantity below 15)
  - Add Items to Inventory (if they want to change the item quantity amount)
  - Add New Product
  
For this example, the manager chooses to "Add New Product"

![](/images_for_readme/10_manager_successful_add.png)

The manager has decided to add a Microphone. He sets the department to "merch" and the price to be $175. He has 20 in stock and the Microphone is autographed. The add has been successful because it states, "New product added to inventory in Products database"

![](/images_for_readme/08_new_database_after_added_item.png)

The database now reflects the added item. The item_id is 11. It is a Microphone added in the merch department at $175 and 20 in stock and is autographed.

![](/images_for_readme/09_manager_current_stock.png)

For another example, the manager chooses "View Current Products". This will list the current stock amount after transactions.
