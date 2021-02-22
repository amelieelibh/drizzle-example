import React, { useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import getOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import "./App.css";

const App = () => {
  
  const [drizzle, setDrizzle] = useState();
  const [init, setInit] = useState(false);
  
  useEffect(() => {
  }, []);

  const connectEthereum = async () => {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    setDrizzle(new Drizzle(await getOptions()));
    setInit(true);
  };

  return (
    <>
    {
      init && drizzle ?
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading..."
            }

            return (
              <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
      :
      <button className="enableEthereumButton" onClick={connectEthereum}>Enable Ethereum</button>
    }
    </>
  );
}

export default App;
