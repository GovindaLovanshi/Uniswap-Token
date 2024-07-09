import React from "react";

import {} from ""

const Networks = ({setActiveComponent,activeNetwork,setNetwork}) => {

  const networks = [
    {
      name:"Ethereum",
      rcpUrl:"",
      logo:"assets/images/ethereum.png"
    },
    {
      name:"Polygon Mumbai",
      rcpUrl:"",
      logo:"assets/images/polygon.png"
    },
    {
      name:"Polygon",
      rcpUrl:"",
      logo:"assets/images/polygon.png"
    },
    {
      name:"Goerli",
      rcpUrl:"",
      logo:"assets/images/ethereum.png"
    },
    {
      name:"Sepolia",
      rcpUrl:"",
      logo:"assets/images/ethereum.png"
    },
  ];

  const selectNetwork = (network)=>{
    setNetwork(network.name);
    setActiveComponent("Networks");
    localStorage.se("activeNetwork",JSON.stringify(network));
  };
  return (
    <section id="generator" className="py-14">
      <div className="container z-10">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20">
            {
              networks?.map((network,index) => (
                <div key={index + 1} onClick={()=> selectNetwork(network)}>
                   <div className={'group p-8 rounded-xl bg-default-950/40transition-all duration-500 hover:-translate-y-2 hover:bg-primary/40${activeNetwork == network.name ? "bg-primary/40 : ""}'}>
                     <div className="h-14 w-14 flex items-center
                      justify-center rounded-lg  bg-primary text-primary group-hover:bg-white/20 group-hover:text-white">
                         <img src={network.logo} className="h-10" alt=""/>

                      </div>

                      <h3 className="text-xl font-medium text-default-200 mt-8">
                         {network.name}
                      </h3>

                      <p className="text-base font-normal text-default-300 mt-4">
                         By Utilizing the Selected network{""}
                         <strong> {network.name}</strong> , you can able to find and get access of the details for getting the pool address and liquidity
                      </p>
                   </div>
                </div>
              ))
            }
        </div>
      </div>
    </section>
  );
};

export default Networks;
