import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useState } from 'react'

const TransList = (props) => {

    const [ztransactions, setZtransactions] = useState([]);
    const [zbtransactions, setZbtransactions] = useState([]);

    props.contractzoom.on("Transfer", (from, to, amount, event) => {
        const t1 = {
            from: from, 
            to: to, 
            amount: formatEther(amount),
            id: event.transactionHash, 
            key: event.transactionHash,
            data: event
        };
        setZtransactions((prev) => {
            const newarr = [t1, ...prev];
            return newarr.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
        })
        props.zsupply();
        props.zbsupply();
    });

    props.contractzoombies.on("Transfer", (from, to, tokenID, event) => {
        const t1 = {
            from: from, 
            to: to, 
            tokenID: tokenID.toString(),
            id: event.transactionHash, 
            key: event.transactionHash,
            data: event
        };
        setZbtransactions((prev) => {
            const newarr = [t1, ...prev];
            return newarr.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
        })
        props.zsupply();
        props.zbsupply();
    });
        
    return (
        <div className="d-flex flex-row justify-content-between mt-3">
            <div>
                <div>Zoom Transfers List: </div>
                <ul className="list-group">
                {
                    ztransactions.map((item) => 
                    <li key={item.key} className="list-group-item border border-primary">
                        <a href={props.chID == '1287' ? `https://moonbase.moonscan.io/tx/${item.id}` : `https://moonriver.moonscan.io/tx/${item.id}`} target='blank'>{item.id}</a>
                    </li>)
                }
                </ul>
            </div>
            <div>
                <div>Zoombies Transfers List: </div>
                <ul className="list-group">
                {
                    zbtransactions.map((item) => 
                    <li key={item.key} className="list-group-item border border-primary">{item.tokenID}</li>)
                }
                </ul>
            </div>
        </div>
    )
}

export default TransList