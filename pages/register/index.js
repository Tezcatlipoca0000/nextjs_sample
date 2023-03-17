import Layout from "../../components/layout";
import { useState } from 'react';
const title = 'New Page Title';

export default function Register() {
    const [error, setError] = useState(null);

    async function insert(e) {
        e.preventDefault();
        const userName = e.target.elements.username.value;
        const pass = e.target.elements.password.value;
        const user = {'userName': userName, 'password': pass};
        try {
            let res = await fetch('http://localhost:3000/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            res = await res.json();
            if (res['error']) {
                setError(res['error']);
            } else {
                setError(false);
                // redirect to /home
            }
        } catch(e) {
            console.log('pages/register/index.js error ', e);
        }
    }


    return (
        <Layout title={title}>
            <div className='flex items-center justify-center h-screen'>
                <div className='bg-red-400 p-4'>
                    <form onSubmit={insert}>
                        <div className='flex justify-evenly'>
                            <label htmlFor='username' className=''>Username: </label>
                            <input type="text" placeholder='Username' name='username' id='username' className='border'/>
                        </div>
                        <div>{error ? error : ''}</div>
                        <br/>
                        <div className='flex justify-evenly'>
                            <label htmlFor='password' className=''>Password: </label>
                            <input type="password" placeholder='********************' name="password" id="password" className='border'/>
                        </div>
                        <br/>
                        <div className='flex justify-evenly'>
                            <button className='border p-1' type="submit">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </Layout>
    );
}

// TODO *****
/*
- get password (currently failing) DONE!
- encript password 
- separate register windows (first only ask for username. on click "next"=> search db for uniqueness. then resp | ask for pass. maybe mail too for a future "forgot your pass")


import { useState } from 'React';

pass initialData to Register function:
> export default function Register({ initialData }) { ...
    const [data, setData] = useState(initialData);

    async function findUser(userName) {
        fetch(.../findOne, {post, userName})
        setData(newData)
    }

    function handle_next(e) {
        e.preventDefault()
        userName = e.target......
        findUser(userName)
    }

    return (
        {!data }
    );

        OR .....

import { useSate, useEffect } from 'react';

export default function Register() { ...
    const [found, setFound] = useState(null);

    async function handle_search(e) {
        e.preventDefault()
        userName = e.target......
        useEffect(()=> {
            fetch(.../find, userName)
                .then((res)=>res.json())
                .then((data)=> {
                    setFound(data) //boolean
                })
        }), [])
    }

    if (found) {
        return (...);
    } else {
        return (...);
    }
*/