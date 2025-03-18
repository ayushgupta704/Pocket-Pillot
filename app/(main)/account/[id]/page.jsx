// import { getAccountWithTransactions } from "@/actions/accounts";
// import {TransactionTable} from "@/app/_components/transaction-table";
// import { notFound } from "next/navigation";
// import { BarLoader } from "react-spinners";
// import React,{ Suspense } from "react";
// // import {AccountChart} from "../_componets/account-chart";

// const AccountPage=async({params})=>{
//     //    console.log("Params received:", params); // Debugging

//     // if (!params?.id) {
//     //     notFound();
//     // }
//     const accountData=await getAccountWithTransactions(params.id);
//     if(!accountData){
//         notFound();
//     }
//     const {transactions,...account}=accountData;
//     return (
//     <div className="space-y-8 px-5">
//         <div className="flex gap-4 items-end justify-between">
//         <div>
//             <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">{account.name}</h1>
//             <p className="text-muted-foreground">
//                 {account.type.charAt(0)+account.type.slice(1).toLowerCase()}{" "}Account</p>
//         </div>
//         <div className="text-right pb-2">
//             <div className="text-xl sm:text-2xl font-bold">${parseFloat(account.balance).toFixed(2)}</div>
//             <p text-sm text-muted-foreground>
//                 {account._count.transactions} Transactions</p>
//         </div>
//     </div>
//         {/* Chart section */}
//         {/* Trnsaction Table */}
// {/* 
//         <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}>
//             <TransactionTable transactions={transactions}/>
//         </Suspense> */}

//         <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}>
//         <TransactionTable transactions={transactions}/>
//         </Suspense>
 
//     </div>
// )};
// export default AccountPage;


import { getAccountWithTransactions } from "@/actions/accounts";
import React,{Suspense} from "react";
import TransactionTable from "@/app/_components/transaction-table";
import { notFound } from "next/navigation";
import { BarLoader } from "react-spinners";
import AccountChart from "@/app/_components/account-chart";


const AccountPage=async({params})=>{
    const accountData=await getAccountWithTransactions(params.id);
    if(!accountData){
        notFound();
    }
    const {transactions,...account}=accountData;
    return (
        <div className="space-y-8 px-5">
            <div>
                <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
                    {account.name}
                </h1>
                <p className="text-muted-foreground">
                    {account.type.charAt(0)+account.type.slice(1).toLowerCase()}Account 

                </p>
            </div>
            <div className="text-right pb-2">
                <div className="text-xl sm:text-2xl font-bold">
                    ${parseFloat(account.balance).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                    {account._count.transactions} Transactions
                </p>
            </div>
            
            {/* Chart section */}
            <Suspense
                fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}
            ><AccountChart transactions={transactions}/>
            </Suspense>
            
            {/* TransactionTable */}
            <Suspense 
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}
            >
                <TransactionTable transactions={transactions}/>
            </Suspense>
        </div>
    );
};
export default AccountPage;