import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Routes,  Link,
  Outlet, useNavigate, useParams } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import TokenInfo from "./components/TokenInfo";
import FactoryInfo from "./components/FactoryInfo";
import PairsInfo from "./components/PairsInfo";
//import PairListElement from "./components/PairListElement";
import SpecificPairPage from "./components/SpecificPairPage";

class App extends React.Component {
  state = { loading: true, drizzleState: null};

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });


  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <div>
          <div>Current User Address (the one logged into MetaMask):</div>
          <div>{this.state.drizzleState.accounts[0]}</div>
        </div>
        <div>
          <div>
            <h3>First Token Info:</h3>
            <h5>Address of Token Contract:</h5>
            <p>{this.props.drizzle.contracts.TestToken1.address}</p>
            <TokenInfo
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              token="TestToken1"
            />
          </div>
          <div>
            <h3>Second Token Info:</h3>
            <h5>Address of Token Contract:</h5>
            <p>{this.props.drizzle.contracts.TestToken2.address}</p>
            <TokenInfo
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              token="TestToken2"
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Factory Info:</h3>
            <h5>Address of Factory Contract:</h5>
            <p>{this.props.drizzle.contracts.Factory.address}</p>
            <FactoryInfo
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Pairs Info:</h3>
            <PairsInfo
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}

            />
            
          </div>

          </div>
        <Router>
      
        

        <div> 
              <Routes>
              <Route path='/pair/:address' element={<SpecificPairPage />} />
                                
              </Routes>
              </div>
              </Router>
            </div>

    );
  }
}

/*function SpecificPairPage(){
  let { address } = useParams();
  render() {
  return(
      <div>
          HIIII
      </div>

  );
}*/
//<Route path='/main' element={< />} />
//render={() => <MainPage drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} /> } />

export default App;
