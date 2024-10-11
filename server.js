const gRPC = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("product.proto", {});
const gRPCObject = gRPC.loadPackageDefinition(packageDef);
const productPackage = gRPCObject.product;
const products = [];
function createProduct(call, callback) {
  const data = call.request;
  const newProductData = { ...data, id: products.length + 1 };
  products.push(newProductData);
  return callback(null, newProductData);
}
function readProduct(call, callback) {}
function readProducts(call, callback) {
  return callback(null, { products });
}

const server = new gRPC.Server();
server.addService(productPackage.Product.service, {
  createProduct,
  readProduct,
  readProducts,
});
server.bindAsync(
  "0.0.0.0:4000",
  gRPC.ServerCredentials.createInsecure(),
  () => {
    //server.start();
    console.log("server started");
  }
);
