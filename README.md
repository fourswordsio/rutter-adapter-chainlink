# rutter-adapter-chainlink

## Chainlink External Adapter + WooCommerce RestAPI

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

