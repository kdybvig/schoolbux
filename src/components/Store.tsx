import React, { FunctionComponent, useState, useContext } from 'react';


import './Store.css';

import ProductCard from './ProductCard';
import { UserContext } from './UserProvider'
import Unauthorized from './Unauthorized'
import Button from "react-bootstrap/Button";
import ProductForm from './ProductForm';
import Filter from './Filter';


export interface productValues {
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    inStock: string
}

const Store:FunctionComponent = () => {
    const { isAuth } = useContext(UserContext);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false)

    const initialFormProps = {newItem: true, imgUrl: '', price: '', description: '', title: '', inStock: ''}
    const [formProps, setFormProps] = useState(initialFormProps)

    const [activeProductIndex, setActiveProductIndex] = useState(-1)

    const initialProducts = [
        {
            imgUrl:"https://res.cloudinary.com/schoolbux/image/upload/v1550271379/test/lbwbntedprdth94uu6tx.jpg", 
            title:"Number 2 Pencil",
            price:'3',
            description:'',
            inStock:'194'
        }
    ]
    const [products, setProducts] = useState(initialProducts)

    if(!isAuth) return <Unauthorized />

    const openForm = () => {
        setIsFormOpen(true)
    }

    const addItem = (product: productValues) => {
        const newProducts = products.slice()
        if(activeProductIndex === -1 ) {
            newProducts.push(product)
        } else {
            newProducts[activeProductIndex] = product;
        }
        setProducts(newProducts)
        closeForm()       
    }

    const removeItem = () => {
        const newProducts = products.slice()
        if(activeProductIndex === -1 ) {
            return
        } else {
            newProducts.splice(activeProductIndex,1)
        }
        setProducts(newProducts)
        closeForm()
    }

    const closeForm = () => {
        setActiveProductIndex(-1)
        setIsFormOpen(false)
        setFormProps(initialFormProps)
    }
    
    const handleUpdate = (index: number) => {
        const price = products[index].price.toString();
        const inStock = products[index].inStock.toString();
        const {title, description, imgUrl} = products[index];
        setActiveProductIndex(index)
        setFormProps({title, description, imgUrl, price, inStock, newItem: false})
        setIsFormOpen(true)
    }

    return (
        <div id="bux-store">
            {
                isFormOpen && 
                    <div>
                        <Filter/>
                        <ProductForm 
                            removeItem={removeItem}
                            addItem={addItem}
                            closeForm={closeForm} 
                            newItem={formProps.newItem}
                            imgUrl={formProps.imgUrl} 
                            price={formProps.price} 
                            description={formProps.description} 
                            title={formProps.title} 
                            inStock={formProps.inStock}
                        />
                    </div>
            }
            <Button variant='greenish' onClick={openForm}>Add Item</Button>
            <div id="store-items">
                {
                    products.map((product, index) => {
                        return (
                            <ProductCard 
                                key={`store-product-${index}`}
                                handleUpdate={(e: any)=> handleUpdate(index)} 
                                imgUrl={product.imgUrl} 
                                title={product.title}
                                price={product.price} 
                                description={product.description} 
                                inStock={product.inStock}
                            />
                        )
                    })
                }
                {/* <ProductCard handleUpdate={handleUpdate} imgUrl="https://res.cloudinary.com/schoolbux/image/upload/v1550271379/test/lbwbntedprdth94uu6tx.jpg" title="Number 2 Pencil" price={3} description='' inStock={200}/> */}
            </div>
        </div>
    )
}

export default Store;