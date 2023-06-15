const {workerData, parentPort } = require('worker_threads');
const {getProductFromPOS} = require('./PosProduct');
const {update_Products_To_Shopify} = require('./setProductToShopify');
// const fs = require("fs");

const process = async (shop_products, number_of_pages, number_of_browsers, onetime, index_of_browser) => {
    // let result = [];

    // const products = await getProductFromPOS(4, 15);
    // result = [...result, ...products];
    // for (let i =from; i< to; i++) {
      const products = await getProductFromPOS(number_of_pages, number_of_browsers, onetime, index_of_browser);
      // console.log("repeat>>>>", i);
  
    //   update_Products_To_Shopify(shop_products, JSON.stringify(products));
  
    //     result = [...result, ...products];
    // // }

    const jsonResult = JSON.stringify(products, null, 2);

    return(jsonResult);
  }

  process(workerData.shop_products, workerData.number_of_pages, workerData.number_of_browsers, workerData.onetime, workerData.index_of_browser)
  .then((result) => {
    parentPort.postMessage(result);
    parentPort.close();
  })
  .catch ((error) =>{
    parentPort.postMessage(error);
  });


