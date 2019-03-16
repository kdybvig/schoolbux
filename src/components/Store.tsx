import React, { FunctionComponent, useState, useContext } from 'react';


import './Store.css';

import ProductCard from './ProductCard';
import { UserContext } from './UserProvider'
import Unauthorized from './Unauthorized'




const Store:FunctionComponent = () => {
    const { isAuth } = useContext(UserContext);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    

    if(!isAuth) return <Unauthorized />

    const handleUpload = (files: FileList | null) => {
        if(files === null) return;
        const file: File = files[0];
        const reader = new FileReader();
        reader.onload = e => {
            if(typeof reader.result === 'string') {
                setPreview(reader.result)
            }
        }
        reader.readAsDataURL(file);
        setImage(file);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!image) return
        console.log(image)
        const formData: FormData = new FormData();
        formData.append("image", image)
        console.log('fetching...')
        fetch('http://localhost:3002/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <ProductCard imgSrc="https://res.cloudinary.com/schoolbux/image/upload/v1550271379/test/lbwbntedprdth94uu6tx.jpg" title="Pencil"/>
                <form onSubmit={handleSubmit}>
                <input onChange={e => handleUpload(e.target.files)} required type='file' accept="image/*" />
                <input type='submit'/>
            </form>
            {preview && <img src={preview} alt='preview'/>}
        </div>
    )
}

export default Store;