import React, {Component} from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    _isMounted = false;

    state = {
      error: null,
    };

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        if (this._isMounted) {
          this.setState({error: null});
        }
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        if (this._isMounted){
          this.setState({error: error});
        }
      });
    };

    componentWillUnmount() {
      this._isMounted = false;
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    };

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Aux>
          <Modal
              modalClosed={this.errorConfirmedHandler}
              show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
};

export default withErrorHandler;