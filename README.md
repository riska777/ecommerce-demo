# EcommerceDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## App Documentation

The Application starts on the home page.
You can navigate to Products, and Cart.

When navigating to Products page, products are fetched from the backend, and stored to persist among components.
Here you can add items to your cart in the specific amount set in the quantity number input field.
The quantity cannot be lower than 0 and cannot be higher than the available amount.
You can toggle the type of view between 'List' and 'Grid', and you can also sort the list by Price High or Low first.
When max amount of an item is put in the cart, the "Add to Cart" button gets disabled, as well as the quantity input.

When navigating to Cart page, the productsResolver checks if we have a product list and also if we have a cart with items,
it reduces the quantity if it is higher than the available amount, and reduces the available amount in the store.
The productsResolver also syncs cart prices with store, so for existing products the prices displayed will be always in sync with fetched prices.
Here you can also remove products from cart individually.

If you empty your cart or remove items from it, the quantity doesnt automatically gets loaded back to the products list, but it does when you reload
the page. This could be improved further, but we shouldnt rely on cart data to fill back to products, so there could be a store reload automatically, 
or some other logic.

On the Cart page, the cart list gives warnings if the minimum required order quantity is not reached.
Here you can also empty your cart, and there is also a button 'Reduce Amount', that reduces the amount in the cart to the max available quantity.

The content of the cart is stored to localstorage also, and its being reloaded and synced with store when revisiting the application.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
