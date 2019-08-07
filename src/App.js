import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
     let routes = (
         <Switch>
           <Route path='/auth' component={Auth}/>
           <Route path='/' component={BurgerBuilder}/>
         </Switch>
     );

     if (this.props.isAuthenticated) {
       routes = (
           <Switch>
             <Route path='/checkout' component={Checkout}/>
             <Route path='/orders' component={Orders}/>
             <Route path='/logout' component={Logout}/>
             <Route path='/auth' component={Auth}/>
             <Route path='/' component={BurgerBuilder}/>
           </Switch>
       );
     }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
