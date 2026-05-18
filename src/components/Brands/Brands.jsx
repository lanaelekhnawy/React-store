import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getBrands() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error fetching brands", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <i className="fas fa-spinner fa-spin fa-4 text-success fs-1"></i>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-success">All Brands</h2>
                <p className="text-muted">Explore our wide range of trusted brands</p>
            </div>

            <div className="row g-4">
                {brands.map((brand) => (
                    <div key={brand._id} className="col-md-3">
                        <div className="card brand-card h-100 border-0 shadow-sm rounded-3 overflow-hidden transition-all">
                            <div className="p-3 text-center">
                                <img 
                                    src={brand.image} 
                                    className="img-fluid mb-3" 
                                    alt={brand.name} 
                                    style={{ height: '150px', objectFit: 'contain' }}
                                />
                                <h6 className="fw-bold text-dark m-0">{brand.name}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}