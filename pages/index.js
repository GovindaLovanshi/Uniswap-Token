import React, { useContext, useEffect, useState } from 'react'

//INTERNAL IMPort
import { Header,
  Home,
  Action,
  GetPool,
  Networks,
  LiqudityHistory,
  PoolHistory,
  Promo,
  Loader,
  IconOne,
  IconTwo,} from "../components/index"
  import {} from "../context/index.js"

const index = () => {
  const {DAPP_NAME,GET_POOL_ADDRESS,GET_POOL_DETAILS} = useContext();

  const[activeNetwork,setNetWork] = useState("");
  const[activeComponent,setActiveComponent] = useState("Home");

  useEffect(()=>{
    const network = JSON.parse(localStorage.getItem(("activeNetwork")));
    setNetWork(network?.name);
  },[activeNetwork]);

  return (
    <div className='bg-slate-900'>
      <Header setActiveComponent={setActiveComponent} activeNetwork = {activeNetwork} />

      {
        activeComponent == "Home" ? (
          <Home setActiveComponent= {setActiveComponent} GET_POOL_ADDRESS={GET_POOL_ADDRESS}/>
        ) : activeComponent == "Liquidity" ?(
          <GetPool GET_POOL_ADDRESS={GET_POOL_ADDRESS}/>
        ) : activeComponent == "Pool History" ? (
          <PoolHistory setActiveComponent={setActiveComponent}/>
        ) : activeComponent == "Liquidity History" ?(
          <LiqudityHistory setActiveComponent={setActiveComponent}/>
        ) : activeComponent == "Networks" ?(
          <Networks setActiveComponent={setActiveComponent} activeNetwork={activeNetwork} setNetWork={setNetWork}/>
        )
        :("")
      }

      <Action/>

      {
        !Loader && (
          <div className='new_loader'>
             <Loader/>
          </div>
        )
      }
    </div>
  );
};

export default index
