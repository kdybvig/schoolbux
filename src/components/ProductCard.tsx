import React, { FunctionComponent, useState } from 'react';
import Card from 'react-bootstrap/Card';

interface ProductCardProps {
    imgSrc: string
    title: string
}

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
    console.log('image source: ', props.imgSrc)
    return (
        <Card style={{ width: '200px', border:'1px solid #CCC', padding: '5px'}}>
            <Card.Img variant="top" src={props.imgSrc} />
            <hr />
            <Card.Title style = {{marginBottom: 5}}>{props.title}</Card.Title>
            <Card.Text>Price: 55</Card.Text>
        </Card>
        )
}

export default ProductCard;