


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoginStatusProvider from './Context/LoginStatusProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const client = new ApolloClient({
   uri: 'http://3.15.232.45:3001/graphql',
   cache: new InMemoryCache()
})





root.render( 

   <ApolloProvider client={client}>

     <LoginStatusProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginStatusProvider>
    
   </ApolloProvider>
 

);


