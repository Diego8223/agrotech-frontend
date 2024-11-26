import { ethers } from "ethers";

// Dirección del contrato en la blockchain
const contractAddress = "0x7015672E76039ce2d4dA6Db605F0d5837B4be186";

// ABI generado (usa el JSON que compartiste)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "productId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ProductAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "productId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newQuantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "ProductUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "productId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "productId",
        "type": "bytes32"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "internalType": "struct ProductRegistry.Product",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "productId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "newQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "updateProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Verifica que window.ethereum esté disponible (MetaMask)
if (typeof window.ethereum === 'undefined') {
  console.error("Por favor, instala MetaMask o conecta tu billetera.");
  alert("MetaMask no está disponible.");
} else {
  // Conexión a la blockchain (asegúrate de usar un proveedor adecuado)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Instancia del contrato
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Función para agregar un producto
  async function addProduct(productId, name, origin, details, quantity, price) {
    try {
      const tx = await contract.addProduct(
        ethers.utils.formatBytes32String(productId), // Convierte el productId de string a bytes32
        name,
        origin,
        details,
        quantity,
        price
      );
      await tx.wait(); // Espera a que la transacción se confirme
      console.log("Producto agregado con éxito");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  // Función para obtener un producto
  async function getProduct(productId) {
    try {
      const product = await contract.getProduct(ethers.utils.formatBytes32String(productId));
      console.log("Producto obtenido:", product);
      return product;
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }

  // Función para actualizar un producto
  async function updateProduct(productId, newQuantity, newPrice) {
    try {
      const tx = await contract.updateProduct(
        ethers.utils.formatBytes32String(productId),
        newQuantity,
        newPrice
      );
      await tx.wait();
      console.log("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }

  export { addProduct, getProduct, updateProduct };
}
