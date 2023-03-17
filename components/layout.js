import Head from "next/head";

export default function Layout( {children, title} ) {
    return (
        <div className="container">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Tezcatlipoca's nextjs first sample app"/>
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="https://i.imgur.com/Jw35rQA.png"/>
                <meta property="og:url" content="https://www.tezcatlipoca.com"/>
            </Head>
            <main>
                {children}
            </main>
        </div>
    );
}