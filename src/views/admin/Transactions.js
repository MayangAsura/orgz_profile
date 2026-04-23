import React from "react";
import { useState, useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.js";
import Datatable from "../../components/Tables/Datatables.js"
import NewDataTable from "../../components/Tables/NewDatatables";
import { data } from "../../utils/datas/transactions.js";
import { toast } from "react-toastify";
import supabase from "configs/supabase.js";
import HeaderTrans from "components/Headers/HeaderTrans.js";

export default function Transactions() {
  const [datas, setDatas] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if(data){
      setDatas(data)
    }
    console.log('products', data, datas)

  },[data])
  return (
    <>
      <HeaderTrans/>
      <div className="flex flex-wrap">
        {/* <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
        {/* FROM PRO */}
        <div className="w-full mb-12 px-4">
          <NewDataTable
            data={datas}
            type='transactions'
            searchBar
            excelExport
            pageSizeControl
            pagination
            removableRows
          />
        </div>
      </div>
    </>
  );
}
