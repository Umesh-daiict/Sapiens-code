import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Routes from "./Routes";
import { Provider } from "react-redux";
import leadStore from "./store/LeadStore";
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_URL}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={leadStore}>
        <Routes />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
