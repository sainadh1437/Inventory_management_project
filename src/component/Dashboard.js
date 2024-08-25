import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Dashboard.css"
import CustomAlert from './CustomAlert';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
    const [APIData, setAPIData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://${props.apiKey}/product`)
            .then((response) => {
                const fetchedData = response.data;
                setAPIData(fetchedData);

                const lowStockItems = fetchedData.filter(item => item.avlQty < item.minQty);
                if (lowStockItems.length > 0) {
                    setShowAlert(true);
                }
            });
    }, [])

    const setData = (data) => {
        let { productId, name, description, cost, avlQty, minQty } = data;
        localStorage.setItem('Product Id', productId);
        localStorage.setItem('Name', name);
        localStorage.setItem('Description', description);
        localStorage.setItem('Cost', cost)
        localStorage.setItem('Avl Qty', avlQty);
        localStorage.setItem('Min Qty', minQty);
    }

    const onDelete = (data) => {
        const confirmDelete = window.confirm(`Do you want to delete this product ${data.name}?`);
        if (confirmDelete) {
        axios.delete(`http://${props.apiKey}/product/${data.productId}`)
            .then(() => {
                getData();
            })
        }
    }

    const getData = () => {
        axios.get(`http://${props.apiKey}/product`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const handleUpdate = (data) => {
        const confirmUpdate = window.confirm(`Do you want to update this product ${data.name}?`);
        if (confirmUpdate) {
            setData(data);
            navigate('/update');
        }
    }

    const handleProcure = (data) => {
        const confirmProcure = window.confirm(`Do you want to procure this product ${data.name}? (Increase Available Qty)`);
        if (confirmProcure) {
            setData(data);
            navigate('/update');
        }
    }

    return (

        <div class="dbody">
            <h1 class="text-center pt-5">Inventory Dashboard</h1>
            <span>
                {showAlert && (
                    <CustomAlert
                        message="Warning: Some products are low in stock!"
                        onClose={() => setShowAlert(false)}
                        timer={5000} 
                    />
                )}
            </span>
            <div className='container col-8'>
            <table class="container transparent-bordered-table ">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Avl Qty</th>
                        <th scope="col">Min Qty</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Procure</th>
                    </tr>
                </thead>
                <tbody>
                    {APIData.map((data) => {
                        const isLowStock = data.avlQty < data.minQty;
                        return (
                            <tr key={data.productId} className={isLowStock ? 'low-stock' : ''}>
                                <td>{data.productId}</td>
                                <td>{data.name}</td>
                                <td>{data.description}</td>
                                <td>{data.cost}</td>
                                <td>{data.avlQty}</td>
                                <td>{data.minQty}</td>
                                <td>
                                <button type="button" className="btn btn-secondary" 
                                onClick={() => handleUpdate(data)}>Update</button>
                                </td>
                                <td>
                                <button type="button" className="btn btn-danger" 
                                onClick={() => onDelete(data)}>Delete</button>                               
                                </td>
                                <td>
                                {isLowStock && (
                                
                                <button type="button" className=" btn btn-warning" 
                                 onClick={() => handleProcure(data)}>Procure</button>)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>

    )

}