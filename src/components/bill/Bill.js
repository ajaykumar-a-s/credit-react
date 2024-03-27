import React, { useEffect, useState } from 'react';
import BillService from '../../services/billService';

export default function Bill() {
    const [data, setData] = useState();
    const[error,setError]=useState();
    const cardNumber="4559355463649580";

    useEffect(() => {
        const getBill = async () => {
            try {
                const response = await BillService.getBill(cardNumber);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) { 
                    setError(error.request);
                } else {
                    console.error('Error', error.message);
                    setError(error.message);
                }
            }
        };
        

        getBill();
        
    },[]);
    const onPayBill = async () => {
        try {
            const response = await BillService.payBill(cardNumber);
            setData(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else if (error.request) { 
                setError(error.request);
            } else {
                console.error('Error', error.message);
                setError(error.message);
            }
        }
    };
    return (
        <>
            
            <div>
            
            {data && (
                <div className="row mt-5">
                    <div className="table-responsive">
                        <div className="text-center">
                            <label><h4 className="text">Bill</h4></label>
                        </div>
                        <br />
                        <table className="table table-bordered table-warning table-striped table-hover">
                        <thead>
                    <tr>
                        <th scope="col">Bill Id</th>
                        <th scope="col">Amount to be paid</th>
                        <th scope="col">Bill generated date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Card Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">{data.billId}</td>
                        <td>{data.amount}</td>
                        <td>{data.billGeneratedDate}</td>
                        <td>{data.dueDate}</td>
                        <td>{data.paid ? 'Paid' : 'Not Paid'}</td>
                        <td>{data.cardNumber}</td>
                    </tr>
                </tbody>

                        </table>
                        <div className="text-center">
                            {!data.paid && <button className="btn btn-success" onClick={onPayBill} >Pay Bill</button>}
                        </div>
                    </div>
                </div>
            )}
             <br /><br />
            {data && (
                <div className="row mt-5">
                    <div className="table-responsive">
                        <div className="text-center">
                            <label><h4>List of Transactions</h4></label>
                        </div>
                        <br />
                        <table className="table table-bordered table-success table-striped table-hover">
                        <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Merchant</th>
                    </tr>
                </thead>
                <tbody>
        {data.transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
                <th scope="row">{transaction.transactionId}</th>
                <td>{transaction.transactionName}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.customerCreditCardNumber}</td>
                <td>{transaction.merchantCardNumber}</td>
            </tr>
        ))}
    </tbody>
                        </table>
                    </div>
                </div>
            )}
            
        </div>
           {error ? <h1>{error }</h1>:null}
        </>
    );
}