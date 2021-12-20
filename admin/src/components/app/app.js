import React, {useEffect} from "react"
import {Route, Routes} from "react-router-dom"
import {withApiService} from "../hoc"
import SideMenu from "../../components/side-menu"
import { connect } from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import "./app.css"
import { Spinner } from "../spinner"
import { bindActionCreators } from 'redux';
import { compose } from '../../utils';
import { checkAuth } from "../../actions"
import ApiService from "../../services/api-service"
import { LoginPage } from "../pages";

const App = ({ auth, phone, checkAuth}) => {
    const location = useLocation().pathname;
    const history = useNavigate()
    if (location == "/logout") {
        let apiService = new ApiService()
        apiService.logout()
        history.replace("/")
    }
    useEffect(()=>{
        //checkAuth()
    },[])

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )

    /*if (auth == null) {
        return <Spinner />
    } else if(auth==false){*/
       
    /*} else {
        return (
            
            <React.Fragment>
                {/*<Navbar />
                <SideMenu />}*/
                {/*<Routes>
                    <Route path="/off-days" component={ReservePreventPage} exact />
                    <Route path="/clients/blocked" component={BlackListPage} exact />
                    <Route path="/objects" component={ObjectsPage} exact/>
                    <Route path="/objects/:objectID" component={ObjectDetail} exact/>
                    <Route path="/halls/list" component={Halls} exact/>
                    <Route path="/halls/panoramas" component={Panoramas} exact/>
                    <Route path="/halls/schemes" component={Schemes} exact/>
                    <Route path="/employees" component={ EmployeesPage} exact/>
                    <Route path="/services" component={Services} exact/>
                    <Route path="/actions" component={ActionsPage} exact/>
                    <Route path="/photos" component={PhotosPage}/>
        <Route path="/" component={Dashboard}/>*/}
               {/* </Routes>
            </React.Fragment>
               )
    }*/}
}

const mapStateToProps = ({ /*authStatus: { auth, phone, loading, error }*/}) => {
    return {  }; //auth, phone
};

const mapDispatchToProps = (dispatch, { apiService}) => {
    return bindActionCreators({
        checkAuth: checkAuth(apiService)
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
  )(App)