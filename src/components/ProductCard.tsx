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
        <Card className='product-card' style={{}/*{ width: '200px', backgroundColor: '#EAE3D7', border:'1px solid #CCC', padding: '15px', paddingBottom: '45px'}*/}>
            <Card.Img style={{border: '1px solid #AAA', width: 170, height: 170 }}variant="top" src={imgUrl} />
            <hr />
            <Card.Title style = {{marginBottom: 5}}>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text style={{fontWeight: 'bold', marginBottom: 5}}>{price} School Bux</Card.Text>
            <Card.Text>{inStock} left in stock</Card.Text>
            <Button className='update-button' variant='dark' size='sm' onClick={props.handleUpdate}>Update Item</Button>
        </Card>
        )
}

export default ProductCard;