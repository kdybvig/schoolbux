import React, { FunctionComponent, useState, MouseEvent } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './ProductCard.css'

interface handleUpdateValues {
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    inStock: string
}
interface ProductCardProps {
    imgUrl: string,
    title: string,
    price: string,
    description: string,
    inStock: string,
    handleUpdate: (e: any) => void
}

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
    const {imgUrl, title, price, description, inStock} = props;

    return (
        <Card className='product-card'>
            <Card.Img style={{border: '1px solid #AAA', width: 210, height: 210 }}variant="top" src={imgUrl} />
            <hr />
            <Card.Title style = {{marginBottom: 5}}>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <div className='on-bottom'>
                <Card.Text style={{fontWeight: 'bold', marginBottom: 0}}>{price} School Bux</Card.Text>
                <Card.Text>{inStock} left in stock</Card.Text>
                <Button className='update-button' variant='dark' size='sm' onClick={props.handleUpdate}>Update Item</Button>
            </div>
        </Card>
        )
}

export default ProductCard;