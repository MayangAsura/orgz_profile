import React from "react";
import { useState, useEffect } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import supabase from "configs/supabase";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function Header({page_title}) {

  const [total_classes, setTotalClasses] = useState(0)
  const [total_customers, setTotalCustomers] = useState(0)
  const [total_transactions, setTotalTransactions] = useState(0)
  const [total_complete_transactions, setTotalCompleteTransactions] = useState(0)
  const [is_class_up, setIsClassUp] = useState(false)
  const [is_new_users_up, setIsNewUsersUp] = useState(false)
  const [is_transactions_up, setIsTransactionsUp] = useState(false)
  const [class_percentage, setClassesPercentage] = useState(0)
  const [new_users_percentage, setNewUsersPercentage] = useState(0)
  const [transactions_percentage, setTransactionsPercentage] = useState(0)

  const [admin_role, setAdminRole] = useState('a67080bd-6944-4efe-8f00-3c045ba309cd')
  const [learner_role, setLearnerRole] = useState('6a1fcfd1-8bb6-4176-852c-7e5378804bb4')

  useEffect(() => {
    if(total_classes == 0){
      getTotalClasses()
    }

    if(total_transactions === 0){
      getTotalTransactions()
    }

    if(total_complete_transactions === 0){
      getTotalCompleteTransactions()
    }

    if(total_customers === 0){
      getTotalCustomers()
    }


  }, [total_classes, total_transactions, total_complete_transactions, total_customers])

  const getTotalClasses = async () => {
    const diff = new Date().getTime() - (7 * 24 * 3600 * 1000)
    const date = new Date(diff).toISOString()
    let { data: orgz_products, error } = await supabase
                                          .from('orgz_products')
                                          .select(`
                                            id.count()
                                          `)
                                          .eq('type', 'classes')
                                          // .gte('created_at', date)
                                          .eq('orgz_id', ORGZ_ID)
                                          .is('deleted_at', null)
                                          .single()

    if(orgz_products){
      setTotalClasses(orgz_products.count)

    }

  }
  const getTotalTransactions = async () => {
    let { data: orgz_cash_flows, error } = await supabase
                                          .from('orgz_orders')
                                          .select(`
                                            id.count()
                                          `)
                                          .eq('orgz_id', ORGZ_ID)
                                          .is('deleted_at', null)
                                          .single()
                                          // .select(`
                                          //   total_debit.sum(),
                                          // `)
                                          // .eq('is_complete', true)
                                          // .eq('orgz_id', ORGZ_ID)
                                          // .is('deleted_at', null)
                                          // .single()

    if(orgz_cash_flows){
      setTotalTransactions(orgz_cash_flows.count)
    }

  }
  const getTotalCompleteTransactions = async () => {
    let { data: orgz_orders, error } = await supabase
                                          .from('orgz_orders')
                                          .select(`
                                            id.count()
                                          `)
                                          .eq('order_status', 'successed')
                                          .eq('orgz_id', ORGZ_ID)
                                          .is('deleted_at', null)
                                          .single()
                                          // total_price.sum()

    if(orgz_orders){
      setTotalCompleteTransactions(orgz_orders.count)
    }

  }
  const getTotalCustomers = async () => {
    let { data: orgz_users, error } = await supabase
                                          .from('orgz_users')
                                          .select(`
                                            id.count()
                                          `)
                                          .eq('orgz_role_id', learner_role)
                                          .eq('orgz_id', ORGZ_ID)
                                          .is('deleted_at', null)
                                          .single()

    if(orgz_users){
      setTotalCustomers(orgz_users.count)
    }

  }

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12 -mt-10 -mx-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* px-4 md:px-10  */}
          <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="KELAS"
                  statTitle={total_classes}
                  // statArrow={is_class_up? 'up': 'down'}
                  // statPercent={class_percentage}
                  statPercentColor="text-emerald-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-cubes"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PENGGUNA BARU"
                  statTitle={total_customers}
                  // statArrow={is_new_users_up? 'up': 'down'}
                  // statPercent={new_users_percentage}
                  statPercentColor="text-red-500"
                  // statDescripiron="Since last week"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TRANSAKSI BARU"
                  statTitle={total_transactions}
                  // statArrow={is_transactions_up? 'up': 'down'}
                  // statPercent={transactions_percentage}
                  statPercentColor="text-orange-500"
                  // statDescripiron="Since yesterday"
                  statIconName="fas fa-arrows-h"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TRANSAKSI SELESAI"
                  statTitle={total_complete_transactions}
                  // statArrow={is_transactions_up? 'up': 'down'}
                  // statPercent={transactions_percentage}
                  statPercentColor="text-orange-500"
                  // statDescripiron="Since yesterday"
                  statIconName="fas fa-tasks"
                  statIconColor="bg-pink-500"
                />
              </div>
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PELANGGAN"
                  statTitle={total_customers}
                  // statArrow="up"
                  // statPercent="12"
                  statPercentColor="text-emerald-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-lightBlue-500"
                />
              </div> */}
            </div>
        </div>
      </div>
    </>
  );
}
