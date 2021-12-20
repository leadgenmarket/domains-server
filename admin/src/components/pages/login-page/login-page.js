import React, { useState, Component }  from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchLogin } from "../../../actions";
import { compose } from "../../../utils";
import { withApiService } from "../../hoc";
const LoginPage = () => {
    console.log('login')
    return <div className="auth-page">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xxl-3 col-lg-4 col-md-5">
                        <div className="auth-full-page-content d-flex p-sm-5 p-4">
                            <div className="w-100">
                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5 text-center">
                                        <a href="index.html" className="d-block auth-logo">
                                            <img src="assets/images/logo-sm.svg" alt="" height="28" /> <span className="logo-txt">Панель управления</span>
                                        </a>
                                    </div>
                                    <div className="auth-content my-auto">
                                        <div className="text-center">
                                            <h5 className="mb-0">Доброго времени суток!</h5>
                                            <p className="text-muted mt-2">Авторизуйся чтобы продолжить.</p>
                                        </div>
                                        <form className="custom-form mt-4 pt-2" action="index.html">
                                            <div className="mb-3">
                                                <label className="form-label">Логин</label>
                                                <input type="text" className="form-control" id="username" placeholder="Введите логин" />
                                            </div>
                                            <div className="mb-3">
                                                <div className="d-flex align-items-start">
                                                    <div className="flex-grow-1">
                                                        <label className="form-label">Пароль</label>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div className="">
                                                            <a href="recover-password.html" className="text-muted">Забыли пароль?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="input-group auth-pass-inputgroup">
                                                    <input type="password" className="form-control" placeholder="Введите пароль" aria-label="Password" aria-describedby="password-addon" />
                                                    <button className="btn btn-light ms-0" type="button" id="password-addon"><i className="mdi mdi-eye-outline"></i></button>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="remember-check" />
                                                        <label className="form-check-label" htmlFor="remember-check">
                                                            Запомнить меня
                                                        </label>
                                                    </div>  
                                                </div>
                                                
                                            </div>
                                            <div className="mb-3">
                                                <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Войти</button>
                                            </div>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-9 col-lg-8 col-md-7">
                        <div className="auth-bg pt-md-5 p-4 d-flex">
                            <div className="bg-overlay bg-primary"></div>
                            <ul className="bg-bubbles">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <div className="row justify-content-center align-items-center">
                                <div className="col-xl-7">
                                    <div className="p-0 p-sm-4 px-xl-0">
                                        <div id="reviewcarouselIndicators" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-indicators carousel-indicators-rounded justify-content-start ms-0 mb-0">
                                                <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
                                                <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                                                <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                                            </div>
                                            <div className="carousel-inner">
                                                <div className="carousel-item carousel-item-next carousel-item-start">
                                                    <div className="testi-contain text-white">
                                                        <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                                        <h4 className="mt-4 fw-medium lh-base text-white">“I feel confident
                                                            imposing change
                                                            on myself. It's a lot more progressing fun than looking back.
                                                            That's why
                                                            I ultricies enim
                                                            at malesuada nibh diam on tortor neaded to throw curve balls.”
                                                        </h4>
                                                        <div className="mt-4 pt-3 pb-5">
                                                            <div className="d-flex align-items-start">
                                                                <div className="flex-shrink-0">
                                                                    <img src="assets/images/users/avatar-1.jpg" className="avatar-md img-fluid rounded-circle" alt="..." />
                                                                </div>
                                                                <div className="flex-grow-1 ms-3 mb-4">
                                                                    <h5 className="font-size-18 text-white">Richard Drews
                                                                    </h5>
                                                                    <p className="mb-0 text-white-50">Web Designer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <div className="testi-contain text-white">
                                                        <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                                        <h4 className="mt-4 fw-medium lh-base text-white">“Our task must be to
                                                            free ourselves by widening our circle of compassion to embrace
                                                            all living
                                                            creatures and
                                                            the whole of quis consectetur nunc sit amet semper justo. nature
                                                            and its beauty.”</h4>
                                                        <div className="mt-4 pt-3 pb-5">
                                                            <div className="d-flex align-items-start">
                                                                <div className="flex-shrink-0">
                                                                    <img src="assets/images/users/avatar-2.jpg" className="avatar-md img-fluid rounded-circle" alt="..." />
                                                                </div>
                                                                <div className="flex-grow-1 ms-3 mb-4">
                                                                    <h5 className="font-size-18 text-white">Rosanna French
                                                                    </h5>
                                                                    <p className="mb-0 text-white-50">Web Developer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="carousel-item active carousel-item-start">
                                                    <div className="testi-contain text-white">
                                                        <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                                        <h4 className="mt-4 fw-medium lh-base text-white">“I've learned that
                                                            people will forget what you said, people will forget what you
                                                            did,
                                                            but people will never forget
                                                            how donec in efficitur lectus, nec lobortis metus you made them
                                                            feel.”</h4>
                                                        <div className="mt-4 pt-3 pb-5">
                                                            <div className="d-flex align-items-start">
                                                                <img src="assets/images/users/avatar-3.jpg" className="avatar-md img-fluid rounded-circle" alt="..." />
                                                                <div className="flex-1 ms-3 mb-4">
                                                                    <h5 className="font-size-18 text-white">Ilse R. Eaton</h5>
                                                                    <p className="mb-0 text-white-50">Manager
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

class LoginPageContainer extends Component {
    
    componentDidMount() {
        console.log('login')
      //this.props.login();
    }
  
    render() {
      const { /*auth, loading, error, fetchLogin*/ } = this.props;
  
      return <LoginPage /*loading={loading} error={error} fetch={fetchLogin}*//>;
    }
  }
  
  const mapStateToProps = ({ /*authStatus: { auth, loading, error }*/}) => {
    return { /*auth, loading, error*/ };
  };
  
  const mapDispatchToProps = (dispatch, { apiService}) => {
    return bindActionCreators({
        fetchLogin: fetchLogin(apiService),
    }, dispatch);
  };
  export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
  )(LoginPageContainer);