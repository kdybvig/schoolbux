import React, { FunctionComponent, useState, useContext, useEffect } from 'react';


import './Store.css';

import ProductCard from './ProductCard';
import { UserContext } from './UserProvider'
import Unauthorized from './Unauthorized'
import Button from "react-bootstrap/Button";
import ProductForm from './ProductForm';
import Filter from './Filter';
import { StoreContext } from './StoreContext';
import { productValuesWithId, newProduct, oldProduct } from '../types/StoreTypes';



const Store:FunctionComponent = () => {
    const { isAuth } = useContext(UserContext);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [curId, setCurId] = useState('')

    const initialFormProps = {newItem: true, imgUrl: '', price: '', description: '', title: '', inStock: ''}
    const [formProps, setFormProps] = useState(initialFormProps)

    const {state, dispatch} = useContext(StoreContext);

    const initialProducts = [
        {
            imgUrl:"https://res.cloudinary.com/schoolbux/image/upload/v1550271379/test/lbwbntedprdth94uu6tx.jpg", 
            title:"Number 2 Pencil",
            price:'3',
            description:'',
            inStock:'194'
        }
    ]
    // const [products, setProducts] = useState(initialProducts)
    const products: productValuesWithId[] = state? state.items : []

    useEffect(()=> {
        dispatch({type: 'GET_INITIAL_ITEMS'})
    }, [])

    if(!isAuth) return <Unauthorized />

    const openForm = async() => {
        console.log(state)
        setIsFormOpen(true)
    }

    const addItem = async(product: newProduct) => {
        await dispatch({type: 'PUT_ADD_ITEM', payload:product})
        closeForm()      
    }

    const updateItem = async(product: oldProduct) => {
        await dispatch({type: 'PUT_UPDATE_ITEM', payload:product})
        closeForm()    
    }

    const removeItem = async() => {
        await dispatch({type: 'DELETE_REMOVE_ITEM', payload: curId})
        closeForm()
    }

    const closeForm = () => {
        setIsFormOpen(false)
        setFormProps(initialFormProps)
        setCurId('')
    }
    
    const handleUpdate = (index: number) => {
        const price = products[index].price.toString();
        const inStock = products[index].inStock.toString();
        const {title, description, imgUrl, _id} = products[index];
        setFormProps({title, description, imgUrl, price, inStock, newItem: false})
        setCurId(_id)
        setIsFormOpen(true)
    }

    function updateImage(newImage: File | null) {
        setImage(newImage)
    }

    
    const emptyBoxes = new Array(10).fill('')
    return (
        <div id="bux-store">
            {
                isFormOpen && 
                    <div>
                        <Filter/>
                        <ProductForm
                            _id={curId}
                            image={image}
                            updateImage={updateImage}
                            removeItem={removeItem}
                            addItem={addItem}
                            updateItem={updateItem}
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
                {
                    emptyBoxes.map((box, index) => {
                        return <div key={'empty-box-' + index} className='.card empty-box product-card'></div>
                    })
                }
                {/* <ProductCard handleUpdate={handleUpdate} imgUrl="https://res.cloudinary.com/schoolbux/image/upload/v1550271379/test/lbwbntedprdth94uu6tx.jpg" title="Number 2 Pencil" price={3} description='' inStock={200}/> */}
            </div>
        </div>
    )
}

export default Store;