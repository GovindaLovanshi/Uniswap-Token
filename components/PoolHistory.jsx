import React, { useEffect, useState } from "react";

import {GoCopy} from "react-icons/go"

import {shortAddress} from "../utils/shortaddress"
import {Promo} from "../components/index.js"

const PoolHistory = (setActiveComponent) => {
  const [poolDeatails,setDetails] = useState([]);

  useEffect(()=>{
    const pools  = JSON.parse(localStorage.getItem("poolHistory"));
    setDetails(pools?.reverse());
  },[]);

  return(
    <section id="price" className="pt-32">
      <div className="container">
        {
          poolDeatails ? (
            <div className="grid lg:grid-cols-3 md;grid-cols-2
             grid-cols-1 gap-10">
               {poolDeatails?.map((pool,index)=>(
                <div>
                  <div className="bg-slate-950/40 rounded-xl hover:translate-y-2 transition-all duration-500">
                     <div className="border border-white/10 rounded-xl">
                       <div className="p-6">
                         <a className="px-6 flex items-center justify-center
                          gap-2 border border-white/10 text-white py-2 mt-6 rounded-lg hover:bg-primary-hover transition-all duration-300">
                            {pool.network}
                          </a>
                          <hr className="my-5 border-dashed border-white/10"/>
                          <ul className="mt-3 text-sm text-default-700 " role="list">
                            <li className="flex items-centre gap-2 py-2">
                              <i onClick={()=> navigator.clipboard.writeText(pool.token_B)} className="inline-block w-5 text-primary">
                                <GoCopy/>
                                
                              </i>
                              <span className="text-default-50">
                                  Token A :{shortAddress(token_A)}
                                </span>
                              <i onClick={()=> navigator.clipboard.writeText(pool.token_B)} className="inline-block w-5 text-primary">
                                <GoCopy/>
                                
                              </i>
                              <span className="text-default-50">
                                  Token B :{shortAddress(token_B)}
                                </span>
                              <i onClick={()=> navigator.clipboard.writeText(pool.fee)} className="inline-block w-5 text-primary">
                                <GoCopy/>
                               
                              </i>
                              <span className="text-default-50">
                                  Fee :{shortAddress(fee)}
                                </span>
                            </li>
                          </ul>
                       </div>
                     </div>
                  </div>
                </div>
               ))}
             </div>
          ) :(
           <Promo setActiveComponent={setActiveComponent}/>)
        }
      </div>
    </section>
  )
  
};

export default PoolHistory;
