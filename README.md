# rutter-adapter-chainlink

## Chainlink External Adapter + Rutter/POBA API

Platforms:


Endpoints:

APIs Supported
Shopify:        Products, Orders, Customers, Transactions, Store
Squarespace:    Products, Orders, Customers, Transactions, Payouts, Store
BigCommerce:    Products, Orders, Customers, Transactions, Store
WooCommerce:    Products, Orders, Customers, Transactions, Store
Square:         Products, Orders, Customers, Transactions, Payouts, Store
Wix:            Products, Orders, Customers, Transactions, Store
Magento:        Products, Orders, Customers, Transactions, Store
Amazon:         Products, Orders, Customers, Transactions, Payouts, Store, Inventory Events
eBay:           Products, Orders, Customers, Transactions, Payouts, Store
Etsy:           Products, Orders, Customers, Transactions, Payouts, Store
PrestaShop:     Products, Orders, Customers, Transactions, Store
Shoper:         Products, Orders, Customers, Transactions, Store
Walmart:        Products, Orders, Customers, Transactions, Store
Stripe:         Transactions, Payouts
Paypal:         Transactions, Payouts



### Install
```bash
sudo npm install
```

### Docker
```bash
sudo docker build . -t poba
sudo docker run -d --name rutter -p 85:85 --env-file=.env -it rutter local n 
```

This will run the adapter at http://localhost:85



## Parameters
The following API endpoints are supported with the related parameters

