import Web3 from "web3";
import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
// this function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const getOptions = async () => {
  const provider = await detectEthereumProvider();
  
  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    // startApp(provider); // initialize your app
    console.log("provider", provider);
    // window.alert("initializing app");
  } else {
    // window.alert('Please install MetaMask!');
  }
  
  const options = {
    web3: {
      block: false,
      customProvider: new Web3(provider || window.ethereum || "ws://localhost:8545"),
    },
    contracts: [SimpleStorage, ComplexStorage, TutorialToken],
    events: {
      SimpleStorage: ["StorageSet"],
    },
  };

  console.log("provider", options.web3);
  
  return options;
};

export default getOptions;