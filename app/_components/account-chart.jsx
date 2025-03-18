"use client"
import { Card,CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from '@/components/ui/select';

import { format,endOfDay, startOfDay, subDays } from 'date-fns';
import React from 'react'
import { Tooltip,Bar,BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useState ,useMemo} from 'react';

const DATE_RANGES={
    "7D":{label:"Last 7 Days",days:7},
    "1M":{label:"Last Month",days:30},
    "3M":{label:"Last 3 Month",days:90},
    "6M":{label:"Last 6 Month",days:180},
    ALL:{label:"All Time",days:null},

};
const AccountChart= ({transactions}) => {
    const [dateRange,setDateRange]=useState("1M");
    const filteredData=useMemo(()=>{
        const range=DATE_RANGES[dateRange];
        const now =new Date();
        const startDate=range.days
        ? startOfDay(subDays(now,range.days))
        : startOfDay(new Date(0));

        //Filter transaction within date range
        const filtered=transactions.filter(
            (t)=>new Date(t.date)>=startDate && new Date(t.date)<=endOfDay(now)
        );

        const grouped=filtered.reduce((acc,transaction)=>{
            const date=format(new Date(transaction.date),"MMM dd");
            if(!acc[date]){
                acc[date]={date,income:0,expense:0};
            }
            if(transaction.type==="INCOME"){
                acc[date].income+=transaction.amount;
            }
            else{
                acc[date].expense+=transaction.amount;
            }
            return acc;
        },{});
        // covert to array and sort by date
        return Object.values(grouped).sort(
            (a,b)=>new Date(a.date) - new Date(b.date)
        );
    },[transactions,dateRange]);

    const totals=useMemo(()=>{
        return filteredData.reduce(
            (acc,day)=>({
                income:acc.income+day.income,
                expense:acc.expense+day.expense,
            }),
            {income:0,expense:0}
        );
    },[filteredData]);
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Transaction Overview
            </CardTitle>
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select range"/>

                </SelectTrigger>
                <SelectContent>{Object.entries(DATE_RANGES).map(([key,{label}])=>{
                    <SelectItem key={key} value={key}>
                        {label}
                    </SelectItem>;
                })}
                </SelectContent>
            </Select>
           
        </CardHeader>
        <CardContent>
            
        </CardContent>
    </Card>
  );
};    
  

export default AccountChart;
