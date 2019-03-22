import React, { FunctionComponent, useState, FormEvent, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './ProductForm.css'

import useForm from '../hooks/useForm';
import { StoreContext } from './StoreContext';
import { newProduct, oldProduct } from '../types/StoreTypes';

 interface ProductFormProps {
    image: null | File,
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    inStock: string,
    newItem: boolean,
    _id: string,
    closeForm: () => void,
    addItem: (product: newProduct) => void,
    updateItem: (product: oldProduct) => void,
    removeItem: () => void,
    updateImage: (newImage: File | null) => void
}


const ProductForm:FunctionComponent<ProductFormProps> = (props) => {  
    
    const [imgUrl, setImageUrl] = useState(props.imgUrl)
    const [preview, setPreview] = useState<string>('')
    const {state} = useContext(StoreContext)

    const { 
        handleSubmit, 
        handleChange, 
        values, setValues,
        isDisabled, setIsDisabled, 
        error, setError,
        capitalize
    } = useForm(submitFunction, {title: props.title, price: props.price, description: props.description, inStock: props.inStock})

    const {title, price, description, inStock} = values;

    function submitFunction(e: FormEvent<Element>) {
        if(props._id) props.updateItem({title, price, description, image: props.image, _id: props._id, inStock})
        if(props.image && !props._id) props.addItem({title, price, description, image: props.image, inStock})
    }

    const handleDescriptionChange = (e: any)  => {
        e.preventDefault()
        const newDescription = e.target.value.replace(/\n/g, ' ');
        setValues(prevValues => ({...prevValues, description: newDescription}))
    }

    const addImage = (e: any) => {
        e.preventDefault()
        if(!e.target.files[0]) {
            props.updateImage(null)
            setPreview('')
            return
        } 
        props.updateImage(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const confirmRemoveItem = () => {
        const confirmed = window.confirm('Are you sure?  The item will be permanently deleted.')
        if(confirmed) props.removeItem()
    }

    return (
        <Form onSubmit={handleSubmit} id="product-form">
            {state.error && <p style={{color: 'red'}}>{state.error}</p>}
            <Button variant='dark' className='btn-circle' onClick={props.closeForm}>X</Button>
            {
                preview? 
                    <div className='product-preview-empty' style={{background: `url(${preview}) center center / contain no-repeat`}}></div> :
                    imgUrl ?
                        <div className='product-preview-empty'><img className="product-preview" src={imgUrl}/></div> :
                        <div className='product-preview-empty'></div>
            }
            <Form.Group controlId='productName'>
                <Form.Label className="user-form-label">Image</Form.Label>
                <Form.Control 
                    required={!imgUrl}
                    disabled={isDisabled || state.isLoading} 
                    type='file'
                    accept='image/*'
                    className='product-file-input'
                    onChange={addImage}
                />
            </Form.Group>
            <Form.Group controlId='productName'>
                <Form.Label className="user-form-label">Item Name</Form.Label>
                <Form.Control 
                    required 
                    disabled={isDisabled || state.isLoading} 
                    type='text'
                    className='product-text-input'
                    placeholder='Item Name'
                    name='title' 
                    maxLength={20}
                    value={title || ''} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId='productDescription'>
                <Form.Label className="user-form-label">Short Description (optional)</Form.Label>
                <Form.Control 
                    disabled={isDisabled || state.isLoading} 
                    as='textarea'
                    rows={3}
                    maxLength={50}
                    className='product-textarea-input'
                    name='description' 
                    value={description || ''} 
                    onChange={handleDescriptionChange}
                />
            </Form.Group>
            <Form.Group controlId='productPrice'>
                <Form.Label className="user-form-label">Price</Form.Label>
                <Form.Control 
                    required 
                    disabled={isDisabled || state.isLoading} 
                    type='number'
                    min='0'
                    max='9999'
                    className='product-number-input'
                    name='price' 
                    value={price || ''} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId='productStock'>
                <Form.Label className="user-form-label">In Stock</Form.Label>
                <Form.Control 
                    required 
                    disabled={isDisabled || state.isLoading} 
                    type='number'
                    min='0'
                    max='9999'
                    className='product-number-input'
                    name='inStock' 
                    value={inStock || ''} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Button type='submit' variant='primary'>Save</Button>
            {!props.newItem && <Button variant='danger' onClick={confirmRemoveItem}>Remove From Store</Button>}
        </Form>
    )
}

export default ProductForm;