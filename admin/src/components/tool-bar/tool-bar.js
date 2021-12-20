const ToolBar = () => {
    return <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                        <div class="navbar-brand-box">
                            <a href="#" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" />
                                </span>
                                <span class="logo-lg">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span class="logo-txt">Лидген</span>
                                </span>
                            </a>
                            <a href="#" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" />
                                </span>
                                <span class="logo-lg">
                                    <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span class="logo-txt">Лидген</span>
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3
                            font-size-16 header-item" id="vertical-menu-btn">
                            <i class="feather-menu"></i>
                        </button>
                        <div class="dropdown d-none d-sm-inline-block">
                            <button type="button" class="btn header-item" id="mode-setting-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon icon-lg layout-mode-dark"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun icon-lg layout-mode-light"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex">
                        
                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item
                                bg-soft-light border-start border-end" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="rounded-circle header-profile-user" src="/images/avatar.png" alt="Header Avatar" />
                                <span class="d-none d-xl-inline-block ms-1
                                    fw-medium">Лауран К.</span>
                                <i class="mdi mdi-chevron-down d-none
                                    d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#"><i class="mdi
                                        mdi-face-profile font-size-16
                                        align-middle me-1"></i> Profile</a>
                                <a class="dropdown-item" href="#"><i class="mdi
                                        mdi-credit-card-outline font-size-16
                                        align-middle me-1"></i> Billing</a>
                                <a class="dropdown-item" href="#"><i class="mdi
                                        mdi-account-settings font-size-16
                                        align-middle me-1"></i> Settings</a>
                                <a class="dropdown-item" href="#"><i class="mdi
                                        mdi-lock font-size-16 align-middle
                                        me-1"></i> Lock screen</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#"><i class="mdi
                                        mdi-logout font-size-16 align-middle
                                        me-1"></i> Logout</a>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
}

export default ToolBar