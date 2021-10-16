import web3 from './web3';
// Import contract ABI

const contractAddress = 'Contracts_Address';

const abi: any = [
  // Contract's ABI
]

export default new web3.eth.Contract(abi, contractAddress);