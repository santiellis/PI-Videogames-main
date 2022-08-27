import { React } from 'react';
import loader from "./LoadingScreen.gif"
import './loading.css'


export default function Loader() {
    return (
        <div className='loader-container'>
            <img src={loader} alt=' '/>
        </div>
    );
};