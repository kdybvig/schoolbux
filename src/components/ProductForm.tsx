import React, { FunctionComponent, useState, FormEvent, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './ProductForm.css'

import useForm from '../hooks/useForm';
import { productValues } from './Store';

 interface ProductFormProps {
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    inStock: string,
    newItem: boolean,
    closeForm: () => void,
    addItem: (product: productValues) => void,
    removeItem: () => void
}


const ProductForm:FunctionComponent<ProductFormProps> = (props) => {  
    
    const [imgUrl, setImageUrl] = useState(props.imgUrl)
    const [preview, setPreview] = useState<any>('')

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
        props.addItem({title, price, description, imgUrl: preview ? preview: imgUrl, inStock})
    }

    const handleDescriptionChange = (e: any)  => {
        e.preventDefault()
        const newDescription = e.target.value.replace(/\n/g, ' ');
        setValues(prevValues => ({...prevValues, description: newDescription}))
    }

    const previewImage = (e: any) => {
        e.preventDefault()
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const confirmRemoveItem = () => {
        const confirmed = window.confirm('Are you sure?  The item will be permanently deleted.')
        if(confirmed) props.removeItem()
    }

    return (
        <Form onSubmit={handleSubmit} id="product-form">
            <Button variant='dark' className='btn-circle' onClick={props.closeForm}>X</Button>
            {
                preview? 
                    <img className="product-preview" src={preview}/> :
                    imgUrl ?
                        <img className="product-preview" src={imgUrl}/> :
                        <div className='product-preview-empty'></div>
            }
            <Form.Group controlId='productName'>
                <Form.Label className="user-form-label">Item Name</Form.Label>
                <Form.Control 
                    required={!imgUrl}
                    disabled={isDisabled} 
                    type='file'
                    accept='image/*'
                    className='product-file-input'
                    onChange={previewImage}
                />
            </Form.Group>
            <Form.Group controlId='productName'>
                <Form.Label className="user-form-label">Item Name</Form.Label>
                <Form.Control 
                    required 
                    disabled={isDisabled} 
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
                <Form.Label className="user-form-label">Description (optional)</Form.Label>
                <Form.Control 
                    disabled={isDisabled} 
                    as='textarea'
                    rows={3}
                    maxLength={200}
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
                    disabled={isDisabled} 
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
                    disabled={isDisabled} 
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