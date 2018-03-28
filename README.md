# Vue_CRUD_Products
Vue test - CRUD operations with products.

Characteristics:
- The architecture: The test has one parent and several child components (composing). It uses VueJS library by CDN.
- The data: Data is stored in the parent component. Parent passes data down to the child via props, and the children send messages to the parent via events (emit). There is an example of how to update parent data from child.
- It uses directives, custom events and bindings to do the scaffold.

Features:
- This test shows the way to add new items to a list of products using VueJS components.
- You can delete selected items, single products or empty the cart.
