import React, { FunctionComponent, useState, useEffect } from 'react';

const Filter:FunctionComponent = () => {


    return (
        <div className="dark-filter" style={
            {
                position:'fixed',
                padding:'0',
                margin:'0',
                
                top:0,
                left: 0,
                zIndex: 5000,
                width: '100%',
                height: '100%',
                background:'rgba(0,0,0,0.3)'
            }
        }>
        
        </div>
    )
}

export default Filter;