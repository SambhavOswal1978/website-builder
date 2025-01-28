import * as React from 'react';

export const demoEle = (title, description, url) => {
    return (
        <div style={{border: '1px rgba(0, 0, 0, 0.10) solid', borderRadius:10, width: '100%',}}>
            <div style={{backgroundColor:'#F3F4F6', display:'flex', justifyContent:'center', height:200}}>
                <img width={120} src={url}></img>
            </div>  
            <div style={{padding:'8px 16px'}}>
                <p style={{fontSize:16, margin:0}}>{title}</p>
                <p style={{fontSize:12, margin:0}}>{description}</p>
            </div>
        </div>
    );
}