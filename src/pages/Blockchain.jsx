import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './Blockchain.css';

const Blockchain = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [productID, setProductID] = useState('');
  const [productData, setProductData] = useState('');
  const [loading, setLoading] = useState(false);

  // Dirección del contrato inteligente (Smart Contract)
  const contractAddress = 'TU_CONTRACTO_SMART';  // Reemplaza con la dirección de tu contrato

  // ABI del contrato inteligente (esto se genera al desplegar tu contrato)
  const contractABI = [
    // ABI de tu contrato inteligente (debe incluir las funciones necesarias)
    {
      "constant": true,
      "inputs": [{"name": "productId", "type": "string"}],
      "name": "getProductTraceability",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Conectar a Web3 y Metamask
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Solicitar acceso a la cuenta de Metamask
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        setAccount(accounts[0]);
      });

      // Inicializar el contrato
      const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
    } else {
      alert('Por favor, instala MetaMask');
    }
  }, []);

  // Obtener la trazabilidad de un producto usando el productID
  const fetchProductTraceability = async () => {
    if (contract && productID) {
      setLoading(true);
      try {
        const result = await contract.methods.getProductTraceability(productID).call();
        setProductData(result);
      } catch (error) {
        console.error('Error al obtener la trazabilidad:', error);
        setProductData('No se pudo obtener la trazabilidad.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="blockchain">
      <h1>Trazabilidad en Blockchain</h1>
      <p>Cuenta de MetaMask: {account}</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ingrese el ID del producto"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          disabled={loading} // Deshabilita el input durante la carga
        />
        <button 
          onClick={fetchProductTraceability} 
          disabled={loading || !productID} // Deshabilita el botón si no hay ID o si está cargando
        >
          {loading ? 'Cargando...' : 'Consultar Trazabilidad'}
        </button>
      </div>
      {productData && (
        <div className="product-info">
          <h3>Información del Producto</h3>
          <p>{productData}</p>
        </div>
      )}
    </div>
  );
};

export default Blockchain;
