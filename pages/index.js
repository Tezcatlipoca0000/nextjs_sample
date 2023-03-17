import Link from 'next/link';
import Layout from "../components/layout";
import { useState } from 'react';
import Router from 'next/router';
import Home from './home/index';


const title = 'Home Page Title'

export default function Login() {
    const [data, setData] = useState(null);

    async function handle_submit(e) {
        e.preventDefault()
        const userName = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const user = {'userName': userName, 'password': password};

        try {
            let res = await fetch('http://localhost:3000/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            res = await res.json();

            //console.log('the validate response!', res);
            if (res['found']) {
                //Router.push('/home');
                setData(res['data']);
            } else {
                setData(false);
            }
        } catch(e) {
            console.log(e);
        }
    }

    if (data) return <Home info={data}/>

    return (
        <Layout title={title}>
            <div className='flex items-center justify-center h-screen'>
                <div className='bg-red-400 p-4'>
                    <h2>Login</h2>
                    <form onSubmit={handle_submit}>
                        <div className='flex justify-evenly'>
                            <label htmlFor='username' className=''>Username: </label>
                            <input type="text" placeholder='Username' name='username' id='username' className='border'/>
                        </div>
                        <br/>
                        <div className='flex justify-evenly'>
                            <label htmlFor='password' className=''>Password: </label>
                            <input type="password" placeholder='********************' name="password" id="password" className='border'/>
                        </div>
                        <br/>
                        <div className='flex justify-evenly'>
                            <button className='border p-1' type='submit'>Sign In</button>
                            <button className='border p-1'><Link href='/register'>Register</Link></button>
                        </div>
                        <div>{data === false ? 'Wrong Access Information' : ''}</div>
                    </form>
                </div>
            </div>
        </Layout>       
    );
    
}