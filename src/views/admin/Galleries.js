import React from "react";
import { useState, useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.js";
import Datatable from "../../components/Tables/Datatables.js"
import NewDataTable from "../../components/Tables/NewDatatables";
import { getData } from "../../utils/datas/galleries.js";
import { toast } from "react-toastify";

export default function Galleries() {
  const [datas, setDatas] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    const data = getData()

    if(data){
      setDatas(data)
    }
    console.log('Galleries', data, datas)

  },[getData()])
  return (
    <>
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
            type='galleries'
            searchBar
            excelExport
            addNew
            pageSizeControl
            pagination
            removableRows
          />
        </div>
      </div>
    </>
  );
}
