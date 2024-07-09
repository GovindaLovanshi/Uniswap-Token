import React, { useEffect, useState } from 'react'
import {ethers,Contract} from "ethers"
import axios from "axios"
import uniSwapV3Pool from "@u"// node module mod
import toast from "react-hot-toast"
import {FACTORY_ABI,FACTORY_ADDRESS} from "./constants"

import  {shortenAddress,parseErrorMsg} from "../utils/shortaddress";

export const CONTEXT = React.createContext();

export const CONTEXT_Provider = ({children}) => {
    const DAPP_NAME = "WebAI";
    const[loader,setLoader] = useState(false);

    //NOTIFICATION

    const notifyError = (msg)=> toast.error(msg,{duration:4000});
    const notifySuccess = (msg) => toast.success(msg,{duration:4000});

    // GET POLL ADDRESS

    const GET_POOL_ADDRESS = async(liquidity,selectNetwork) =>{
        try{
            setLoader(true);
            const PROVIDER = new ethers.providers.JsonRpcProvider(
                selectNetwork.rpcUrl
            );

            const factoryContract = new ethers.Contract(
                FACTORY_ADDRESS,FACTORY_ABI,PROVIDER
            );

            const poolAddress = await factoryContract.functions.getPool(
                liquidity.token_A,
                liquidity.token_B,
                Number(liquidity.fee)
            );

            const poolHistory = {
                token_A:liquidity.token_A,
                token_B:liquidity.token_B,
                fee:liquidity.fee,
                network:selectNetwork.name,
                poolAddress:poolAddress
            };

            let poolArray = [];
            const poolList = localStorage.getItem("poolHistory");
            if(poolList){
                poolArray = JSON.parse(localStorage.getItem("poolHistory"));
                poolArray.push(poolHistory);
                localStorage.setItem("poolHistory",JSON.stringify(poolArray));
            }else{
                poolArray.push(poolHistory);
                localStorage.setItem("poolHistory",JSON.stringify(poolArray));
            }
            setLoader(false);
            notifySuccess("SUccessFully Completed");
            
        }
    catch(error){
        const errorMsg = parseErrorMsg();
        setLoader(false);
        notifyError(errorMsg);
    }
};

// GET POOL DETAIL

async function getPoolData(poolContract,selectNetwork,poolAddress){
    const [liquidity,fee,token0,token1] = await Promise.all([
        poolContract,liquidity(),
        poolContract.fee(),
        poolContract.token0(),
        poolContract.token1(),
    ]);

    return {
        liquidity:liquidity.toString(),
        fee:fee,
        token_A:token0,
        token_B:token1,
        network:selectNetwork.name,
        poolAddress:poolAddress
    }
}

const GET_POOL_DETAILS = async(poolAddress,selectNetwork)=>{
    try{
        setLoader(true);

        //PROVIDER
        const PROVIDER = new ethers.providers.JsonRpcProvider(
            selectNetwork.rpcUrl
        );

        const poolContract = new Contract(
            poolAddress,uniSwapV3Pool.abi,
            PROVIDER
        );

        const poolData =await getPoolData(
            selectNetwork,poolAddress
        )

        let liquidity = [];
            const poolList = localStorage.getItem("liquidityHistory");
            if(poolList){
                poolArray = JSON.parse(localStorage.getItem("liquidityHistory"));
                poolArray.push(poolData);
                localStorage.setItem("liquidityHistory",JSON.stringify(poolArray));
            }else{
                poolArray.push(poolData);
                localStorage.setItem("liquidityHistory",JSON.stringify(poolArray));
            }
            setLoader(false);
            notifySuccess("SUccessFully Completed");
return poolData

    }catch(error){
        const errorMsg = parseErrorMsg();
        setLoader(false);
        notifyError(errorMsg);
    }
}

useEffect(()=>{

})

return (
    <CONTEXT.Provider value={{DAPP_NAME,GET_POOL_ADDRESS,GET_POOL_DETAILS}}>{children}<CONTEXT.Provider>;</CONTEXT.Provider>

)
};