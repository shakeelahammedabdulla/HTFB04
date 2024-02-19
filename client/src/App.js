// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

///////////////////////////////////////////////////////////////////////

//reference code design

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
// import "./App.css";
// import FileUpload from "./components/FileUpload";
// import Display from "./components/Display";
// import Modal from "./components/Modal";


// function App() {
//   const [account, setAccount] = useState("");
//   const [contract, setContract] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [modelOpen, setModelOpen] = useState(false);

//   useEffect(() => {
//     const wallet = async () => {
//       if (provider) {
//         await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         console.log(address);
//         setAccount(address);

//         const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//         // const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

//         // 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
//         const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
//         console.log(contract);
//         setContract(contract);
//         setProvider(signer);
//       } else {
//         alert("Metamask is not installed");
//       }
//     };
//     provider && wallet();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Secure File Upload</h1>
//         <div className="Account-info">
//           <h2>Connected Account:</h2>
//           <p>{account}</p>
//         </div>
//         <button className="Upload-button" onClick={() => setModelOpen(true)}>
//           Upload File
//         </button>
//       </header>
//       {modelOpen && (
//         <div className="Modal">
//           <div className="Modal-content">
//             <h3>Upload File</h3>
//             <input type="file" />
//             <button className="Close-button" onClick={() => setModelOpen(false)}>
//               Close
//             </button>
//             <button className="Submit-button">Submit</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;