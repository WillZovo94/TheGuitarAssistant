import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
    uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    const location = useLocation();
    const currentPage = location.pathname;
    const isAuthenticated = !!localStorage.getItem('id_token');

    return (
        <ApolloProvider client={client}>
            <div id="main">
                <Header></Header>
                <Outlet />
                <Footer></Footer>
            </div>
        </ApolloProvider>
    )
}

export default App;