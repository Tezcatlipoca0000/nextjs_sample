import Layout from '../../components/layout';
const title = 'Home';

export default function Home( {info} ) {
    
    return (
        <Layout title={title}>
            <p>Login succesfull!</p>
            <p>{JSON.stringify(info)}</p>
        </Layout>
    );
}