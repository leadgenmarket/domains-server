const ToolBar = () => {
    return <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" />
                                </span>
                                <span className="logo-lg">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span className="logo-txt">Лидген</span>
                                </span>
                            </a>
                            <a href="#" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" />
                                </span>
                                <span className="logo-lg">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span className="logo-txt">Лидген</span>
                                </span>
                            </a>
                        </div>

                        <button type="button" className="btn btn-sm px-3
                            font-size-16 header-item" id="vertical-menu-btn">
                            <i className="feather-menu"></i>
                        </button>
                        <div className="dropdown d-none d-sm-inline-block">
                            <button type="button" className="btn header-item" id="mode-setting-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon icon-lg layout-mode-dark"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun icon-lg layout-mode-light"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            </button>
                        </div>
                    </div>

                    <div className="d-flex">
                        
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item
                                bg-soft-light border-start border-end" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src="/images/avatar.png" alt="Header Avatar" />
                                <span className="d-none d-xl-inline-block ms-1
                                    fw-medium">Лауран К.</span>
                                <i className="mdi mdi-chevron-down d-none
                                    d-xl-inline-block"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"><i className="mdi
                                        mdi-face-profile font-size-16
                                        align-middle me-1"></i> Profile</a>
                                <a className="dropdown-item" href="#"><i className="mdi
                                        mdi-credit-card-outline font-size-16
                                        align-middle me-1"></i> Billing</a>
                                <a className="dropdown-item" href="#"><i className="mdi
                                        mdi-account-settings font-size-16
                                        align-middle me-1"></i> Settings</a>
                                <a className="dropdown-item" href="#"><i className="mdi
                                        mdi-lock font-size-16 align-middle
                                        me-1"></i> Lock screen</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="mdi
                                        mdi-logout font-size-16 align-middle
                                        me-1"></i> Logout</a>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
}

export default ToolBar