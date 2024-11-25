import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './Blockchain.css';

const Blockchain = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [productID, setProductID] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos para crear un nuevo producto
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    origin: '',
    details: '',
    quantity: '',
    price: ''
  });

  // Dirección del contrato inteligente
  const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

  // ABI del contrato inteligente
  const contractABI = [
    {
      inputs: [{ internalType: 'string', name: 'productId', type: 'string' }],
      name: 'getProduct',
      outputs: [
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'string', name: 'productId', type: 'string' },
        { internalType: 'string', name: 'name', type: 'string' },
        { internalType: 'string', name: 'origin', type: 'string' },
        { internalType: 'string', name: 'details', type: 'string' },
        { internalType: 'uint256', name: 'quantity', type: 'uint256' },
        { internalType: 'uint256', name: 'price', type: 'uint256' }
      ],
      name: 'addProduct',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);

          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) setAccount(accounts[0]);
          });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });
        } catch (error) {
          console.error('Error al conectar MetaMask:', error);
          setError('Error al conectar MetaMask. Verifica tu cuenta.');
        }
      } else {
        setError('MetaMask no está instalado. Instálalo para continuar.');
      }
    };

    loadWeb3();
  }, []);

  const fetchProductData = async () => {
    if (contract && productID) {
      setLoading(true);
      setError(null);
      try {
        const result = await contract.methods.getProduct(productID).call();
        setProductData({
          name: result[0],
          origin: result[1],
          details: result[2],
          quantity: result[3],
          price: result[4]
        });
      } catch (error) {
        console.error('Error al obtener la información del producto:', error);
        setError('No se pudo obtener la información del producto.');
        setProductData(null);
      }
      setLoading(false);
    } else {
      setError('Por favor, ingresa un ID válido.');
    }
  };

  const createProduct = async () => {
    if (!contract || !account) {
      setError('Contrato no disponible o cuenta no conectada.');
      return;
    }

    if (
      newProduct.id &&
      newProduct.name &&
      newProduct.origin &&
      newProduct.details &&
      newProduct.quantity &&
      newProduct.price
    ) {
      setLoading(true);
      setError(null);
      try {
        await contract.methods
          .addProduct(
            newProduct.id,
            newProduct.name,
            newProduct.origin,
            newProduct.details,
            parseInt(newProduct.quantity),
            parseInt(newProduct.price)
          )
          .send({ from: account });
        alert('Producto creado exitosamente.');
        setNewProduct({ id: '', name: '', origin: '', details: '', quantity: '', price: '' });
      } catch (error) {
        console.error('Error al crear el producto:', error);
        setError('Error al crear el producto.');
      }
      setLoading(false);
    } else {
      setError('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="blockchain">
      <h1>Trazabilidad en Blockchain</h1>
      <p>
        <strong>Cuenta de MetaMask:</strong> {account || 'No conectado'}
      </p>

      {error && <p className="error-message">{error}</p>}

      {!account && (
        <button
          onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}
        >
          Conectar con MetaMask
        </button>
      )}

      <div className="input-container">
        <input
          type="text"
          placeholder="Ingrese el ID del producto"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          disabled={loading}
        />
        <button onClick={fetchProductData} disabled={loading || !productID}>
          {loading ? 'Cargando...' : 'Consultar Información'}
        </button>
      </div>

      {productData && (
        <div className="product-info">
          <h3>Información del Producto</h3>
          <p><strong>Nombre:</strong> {productData.name}</p>
          <p><strong>Origen:</strong> {productData.origin}</p>
          <p><strong>Detalles:</strong> {productData.details}</p>
          <p><strong>Cantidad:</strong> {productData.quantity}</p>
          <p><strong>Valor:</strong> {productData.price}</p>
        </div>
      )}

      <h2>Crear Nuevo Producto</h2>
      <div className="create-container">
        <input
          type="text"
          placeholder="ID del Producto"
          value={newProduct.id}
          onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Origen"
          value={newProduct.origin}
          onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
        />
        <input
          type="text"
          placeholder="Detalles"
          value={newProduct.details}
          onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={createProduct} disabled={loading}>
          {loading ? 'Cargando...' : 'Crear Producto'}
        </button>
      </div>
    </div>
  );
};

export default Blockchain;
