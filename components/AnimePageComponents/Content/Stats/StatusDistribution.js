'use client'

import ProgressProvider from "@/lib/progressProvider";
import { statusColor } from "@/lib/textColor";


const StatusDistribution = ({ data }) => {

    let totalAmount = 0

    if (data) {
        data.map((status) => {
            if (status.amount) {
                totalAmount += status.amount;
            }
        })
    }



    if (!data) {
        return (
            <div className="w-full">
                <h3 className="text-lg mb-2">Score Distribution</h3>
                <div className="flex flex-nowrap bg-white items-center justify-center w-full h-[190px] shadow-md">
                    <div className="bg-neutral-200 p-3 shadow-lg">
                        Data Unavailable
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full mb-4">
                <h3 className="mb-2">View Status Distribution</h3>
                <div className="flex flex-col flex-nowrap w-full bg-white h-[190px] justify-between shadow-md">
                    {data.map((status) => {
                        let amountPercentage = totalAmount <= 0 ? 1 : status.amount / totalAmount;

                        return (
                            <ProgressProvider
                                key={`${status.status}-${amountPercentage}-${crypto.randomUUID()}`}
                                valueStart={0}
                                valueEnd={amountPercentage * 100}>
                                {(value) =>
                                    <div className={`h-[30px] w-full flex flex-row flex-nowrap items-center justify-between`}>
                                        <div
                                            style={{
                                                width: `${value}%`,
                                                backgroundColor: statusColor(status.status),
                                                transition: 'all 2s ease'
                                            }}
                                            className={`h-full bg-[${statusColor(status.status)}] flex items-center shadow-mdjustify-between rounded-e-lg`}>
                                            <h4 className="ml-1 relative z-10 bg-transparent">
                                                {parseFloat(amountPercentage * 100).toFixed(2)}%
                                            </h4>
                                        </div>
                                        <p
                                            style={{
                                                marginRight: '.5rem'
                                            }}>
                                            {status.status}
                                        </p>
                                    </div>
                                }
                            </ProgressProvider>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default StatusDistribution