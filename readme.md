# gRPC Node service

## The service definition

In gRPC, the service keyword is used to define a service. This service definition includes one or more Remote Procedure Call (RPC) methods that the client can remotely invoke on the server, as well as each method’s request and response messages. The service definition is typically written in a .proto file in a language-agnostic format called Protocol Buffers (Protobuf). Protobuf serializes data into binary form, making it more compact and therefore faster to transport over a network.

## What is Protobuf?

Protocol Buffers (Protobuf) is a language-agnostic, platform-neutral mechanism for serializing structured data, developed by Google. It allows you to define how data should be structured using a simple schema language, and then generates code to encode and decode the data efficiently. Protobuf is designed to be smaller and faster than formats like XML or JSON, making it ideal for communication between services, particularly in distributed systems and APIs, where performance and bandwidth efficiency are crucial.

```proto
syntax = "proto3";
package product;

service Product{
    rpc CreateProduct(ProductItem) returns (ProductItem);
    rpc ReadProduct(ProductID) returns (ProductItem);
    rpc ReadProducts(VoidParam) returns (ProductItems);
}

enum Category {
    SMARTPHONE = 0;
    CAMERA = 1;
    HEADPHONES = 2;
    TELEVISION = 3;
    KEYBOARD = 4;
    DESKTOP = 5;
    MONITOR = 6;
}

message VoidParam {}

message ProductID {
    int32 id = 1;
}

message ProductItem {
    int32 id = 1;
    string name = 2;
    string description = 3;
    float price = 4;
    Category category = 5;
}

message ProductItems {
    repeated ProductItem products = 1;
}
```

## Explanation:

- • syntax = "proto3";: This specifies the version of Protobuf being used (proto3 is the latest version).
- • ProductItem: The main message (data structure).
- • ProductItems: A nested message that contains product array.
- • repeated: Denotes that the field can have multiple values.
- • enum Category: Defines a set of constants to classify the type of products

## The server

In gRPC, the server listens and responds to RPC calls from clients. The server implements the service defined in the .proto files and contains the actual implementation logic. This logic might handle mutating existing data, creating new data, or fetching data from a database.

## The client

A client in gRPC is an application that connects to and communicates with a gRPC server using the RPC framework. Similar to the server, the client uses Protobuf for data serialization and deserialization.

# gRPC Product Service

This is a simple gRPC server implementation using Node.js and the @grpc/grpc-js and @grpc/proto-loader libraries. The server provides basic product-related functionalities such as creating and reading products.

Features

- • Create a product: Adds a new product to an in-memory array.
- • Read all products: Retrieves the list of all created products.

## dependencies

```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

## How the Code Works

- • Product Proto Definition: The product.proto file defines the Product service with three RPC methods:
- • createProduct: Creates a new product and returns the created product with a unique ID.
- • readProduct: This is not implemented yet but would allow reading a specific product.
- • readProducts: Returns a list of all available products.
- • Server Implementation: The server is implemented in Node.js:
- • It loads the product.proto file using protoLoader.
- • The server defines functions to handle RPC calls:
- • createProduct: Creates a product and adds it to the products array.
- • readProducts: Returns the list of products in memory.
- • Server Startup: The server listens on 0.0.0.0:4000 with insecure credentials.

# Example Usage

You can use any gRPC client to interact with the server once it’s running, such as:

- • gRPC CLI
- • Postman (with gRPC support)
- • Custom gRPC client implementations in various programming languages like Python, Java, or Go.

## sample using postman to create a gRPC request

![Screenshot 2024-10-11 at 06 25 07](https://github.com/user-attachments/assets/b253ed0a-fe6d-4362-8d41-1048360c8b34)

## gRPC flow 

( diagram taken from https://grpc.io/docs/what-is-grpc/introduction/ )
![Screenshot 2024-10-11 at 06 26 31](https://github.com/user-attachments/assets/62e3157a-6e56-4638-975a-17e4815f56eb)

## Docs

- https://grpc.io/
