'use strict';

function printReceipt(inputs) {
  console.log(createReceipt(inputs));
}

function isBarCodeValid(barcodes) {
  const database = loadAllItems();
  let flag = true;
  const barcodeList = database.map((data) => data.barcode);
  barcodes.forEach(barcode => {
    if (barcodeList.indexOf(barcode) === -1) {
      flag = false;
    }
  });
  return flag;
}

function calculateTotalPrice(barcodes) {
  let price = 0;
  const database = loadAllItems();
  barcodes.forEach(barcode => {
    
  });
  // for (let i = 0; i < database.length; i++) {
  //   const data = database[i];
  //   barcodes.forEach(element => {
  //     if (data.barcode === element) {
  //       price = price + data.price;
  //     }
  //   });
  // }
  return price;
}

function countBarcodeNumber(barcodes) {
  let newBarcodes = [];
  let barcodeNum = [];
  for (let i = 0; i < barcodes.length; i++) {
    const barcode = barcodes[i];
    if (newBarcodes.indexOf(barcode) >= 0) {
      barcodeNum[newBarcodes.indexOf(barcode)]++;
    } else {
      newBarcodes.push(barcode);
      barcodeNum.push(1);
    }
  }
  return { barcodes: newBarcodes, barcodeNum: barcodeNum };
}

// arr.reduce((p,k) => (p[k]++ || (p[k] = 1),p),{});

function createReceipt(barcodes) {
  if (isBarCodeValid(barcodes)) {
    const totalPrice = calculateTotalPrice(barcodes);
    let Receipts = "***<没钱赚商店>收据***\n";
    const barcodeItem = countBarcodeNumber(barcodes);
    for (let i = 0; i < barcodeItem.barcodes.length; i++) {
      const barcode = barcodeItem.barcodes[i];
      for (let j = 0; j < database.length; j++) {
        const data = database[j];
        if (barcode === data.barcode) {
          Receipts += "名称：" + data.name + "，数量：" + barcodeItem.barcodeNum[i] + data.unit + "，单价：" + data.price.toFixed(2) + "(元)，小计：" + (data.price * barcodeItem.barcodeNum[i]).toFixed(2) + "(元)" + "\n";
        }
      }
    }
    Receipts += "----------------------\n总计：" + totalPrice.toFixed(2) + "(元)\n**********************";
    return Receipts;
  }
  return null;
}