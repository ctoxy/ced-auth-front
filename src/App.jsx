import React from 'react';
import Layout from './core/Layout';
import { Helmet } from 'react-helmet';
import MainContent from './component/Maincontent';

const App = () => {
    const head = () => (
        <Helmet>
            <meta charSet="utf-8" />
            <title>MERN Stack</title>
            <link rel="canonical" href="/" />
        </Helmet>
    );
    return (
        <Layout>
            {head()}
            <MainContent />
        </Layout>
    );
};

export default App;
