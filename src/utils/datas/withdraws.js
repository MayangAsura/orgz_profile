import { useState } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import supabase from "configs/supabase";
// import { ColumnData } from "../types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { formatCurrency } from "utils/formatCurrency";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

let datas = []


const { data: orgz_cash_flows, error } = await supabase
									.from('orgz_cash_flows')
									.select('withdraw_number,last_balance,last_debit,total_debit,request_withdraw,transfer_eviden,is_complete,admin_fee')
									.eq('orgz_id', ORGZ_ID)
									.is('deleted_at', null)

if(orgz_cash_flows && orgz_cash_flows.length > 0){
	console.log('orgz_cash_flowss--', orgz_cash_flows)

	datas = orgz_cash_flows
	// datas = orders.map(order => {return {type: order.type, title: order.title, slug: order.slug, thumbnail: order.thumbnail, price: order.price, views: order.views, rating:order.rating, subcategory_id: order.subcategory_id, subcategory_code: order.orgz_subcategory.code, subcategory_name: order.orgz_subcategory.name}})

	console.log('datas', datas)

}else{
	// setError(true)
	// setErrorMessage(error)
	toast('Error retrive data from server.')
}

export const data= {
	'No. Penarikan': {
		values: datas.map(cash_flow => cash_flow.withdraw_number),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
				// <div className='font-medium'>
					<Link to={`/admin/withdraws/${value}`}>{value}</Link>
				// </div>
			)
		}
	},
	'Saldo Terakhir': {
		values: datas.map(cash_flow => cash_flow.last_balance),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
						`${formatCurrency(value || 0, 'IDR')}`
			)
		}
	},
	// 'Debit Terakhir': {
	// 	values: `${formatCurrency(datas.map(cash_flow => cash_flow.last_debit), 'IDR')}`,
	// 	classNames: (value) =>
	// 		value === "Jane Smith" || value === "Emma Martinez"
	// 			? "text-green-400 font-medium"
	// 			: "text-gray-600",
	// },
	'Jumlah Penarikan': {
		values: datas.map(cash_flow => cash_flow.request_withdraw),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
						`${formatCurrency(value || 0, 'IDR')}`
			)
		}
	},
	'Biaya Admin': {
		values: datas.map(cash_flow => cash_flow.admin_fee),
		renderValue: (value) => {
			return (
						`${formatCurrency(value || 0, 'IDR')}`
			)
		}
	},
	'Total Penarikan': {
		values: datas.map(cash_flow => cash_flow.total_debit),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
						`${formatCurrency(value || 0, 'IDR')}`
			)
		}
	},
	Status: {
		values: datas.map(cash_flow => cash_flow.is_complete),
		// classNames: (value) =>
		// 	value === "successed"
		// 		? "p-5 rounded rounded-lg bg-green-500"
		// 		: value === "pending"? "rounded rounded-sm bg-yellow-500": "rounded rounded-sm bg-red-500",
		renderValue: (value) => {
			if (value === true) {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-green-500`}>
						{'SELESAI'}
					</div>
				);
			}
			if (value === false) {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-yellow-500`}>
						{'PENDING'}
					</div>
				);
			}
			// if (value === "failed") {
			// 	return (
			// 		<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-red-500`}>
			// 			{value}
			// 		</div>
			// 	);
			// }
			return value;
		},
	}
};
