import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { withApiService } from "../hoc"
import SideMenu from "../../components/side-menu"
import { connect } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import "./app.css"
import { Spinner } from "../spinner"
import { bindActionCreators } from 'redux';
import { compose } from '../../utils';
import { checkAuth } from "../../actions"
import ApiService from "../../services/api-service"
import { LoginPage } from "../pages";
import ToolBar from "../tool-bar";
import DomainsPage from "../pages/domains/list";
import DomainDetail from "../pages/domains/detail";
import DomainEdit from "../pages/domains/edit";
import { TitlesList } from "../pages/titles/titles-list";
import LeadsList from "../pages/leads/leads-list";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LeadDetail from "../pages/leads/detail/lead-detail";
import { OrganizationsPage } from "../pages/organizations/organizations-list";
import Prices from "../pages/prices/prices";


const App = ({ auth, phone, checkAuth }) => {
    const location = useLocation().pathname;
    const history = useNavigate()
    if (location == "/logout") {
        let apiService = new ApiService()
        apiService.logout()
        history.replace("/")
    }
    console.log(auth)
    useEffect(() => {
        checkAuth()
    }, [])



    if (auth == null) {
        return <Spinner />
    } else if (auth == false) {
        return (
            <Routes>
                <Route path="*" element={<LoginPage />} ></Route>
            </Routes>
        )
    } else {
        return (
            <React.Fragment>
                <ToolBar />
                <SideMenu />
                <Routes>
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/organizations/" element={<OrganizationsPage />} />
                    <Route path="/leads/:id" element={<LeadDetail />} />
                    <Route path="/leads/" element={<LeadsList />} />
                    <Route path="/titles/" element={<TitlesList />} />
                    <Route path="/edit/:id" element={<DomainEdit />} />
                    <Route path="/add" element={<DomainEdit />} />
                    <Route path="/:id" element={<DomainDetail />} />
                    <Route path="/*" element={<DomainsPage />} />
                </Routes>
                <ToastContainer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ authStatus: { auth, phone, loading, error } }) => {
    return { auth, phone }; //
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        checkAuth: checkAuth(apiService)
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(App)