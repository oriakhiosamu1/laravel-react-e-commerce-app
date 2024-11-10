import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import AxiosClient from '../Axios/Axios';
import { useState } from 'react';
import { useStateContext } from '../context/ContextProvider';

const AuthenticatedNavBar = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {setUser, setToken} = useStateContext();
    const navigate = useNavigate();

    function handleLogOut(e){
        setIsLoading(true)

        AxiosClient.post('/logout')
        .then(()=>{
            setIsLoading(false);
            setToken(null);
            setUser(null);

            localStorage.clear();
            // localStorage.removeItem('PRODUCTS');
            navigate('/');
        })
        .catch((e)=>{
            setIsLoading(false);
            console.log(e);
        })
    }

  return (
	<section className="ftco-section">
		<div className="container-fluid px-md-5">
			<div className="row justify-content-between">
				<div className="col-md-8 order-md-last">
					<div className="row">
						<div className="col-md-6 text-center">
							<Link to='/' className="navbar-brand" href="index.html">Logistica <span>Architecture Agency</span></Link>
						</div>

						<div className="col-md-6 d-md-flex justify-content-end mb-md-0 mb-3">
							<form action="#" className="searchform order-lg-last">
			                    <div className="form-group d-flex">
			                        <input type="text" className="form-control pl-3" placeholder="Search" />
			                        <button type="submit" placeholder="" className="form-control search">
                                        <span className="fa fa-search"></span>
                                    </button>
			                    </div>
			                </form>
						</div>
					</div>
				</div>
			</div>
		</div>

        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item"><Link to='/index' className="nav-link">Dashboard</Link></li>
                        <li className="nav-item"><Link to='/index/products' className="nav-link">Products</Link></li>
                        <li className="nav-item"><Link to='/index/cart' className="nav-link">Cart</Link></li>
                        <li className="nav-item"><Link onClick={handleLogOut} className="nav-link">{isLoading ? 'Logging out..' : 'Logout'}</Link></li>
                    </ul>
                </div>
            </div>
        </nav>

	</section>
  )
}

export default AuthenticatedNavBar
