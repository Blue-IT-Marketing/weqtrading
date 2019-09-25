import React, { Fragment,useState,useContext } from 'react';
import {Link } from 'react-router-dom';
import { routes } from '../../constants';
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";

export default function Home (){

  const {user_account_state} = useContext(UserAccountContext);
  const [displayMenu, setMenu] = useState({ menu: false });

  const showDropdownMenu = e => {
    e.preventDefault();
    setMenu({ menu: true });
    document.addEventListener("click", hideDropdownMenu);
  };
  const hideDropdownMenu = () => {
    setMenu({ menu: false });
    document.removeEventListener("click", hideDropdownMenu);
  };

	return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              {" "}
              <i className="fa fa-home"> </i> Weq Trading{" "}
            </strong>{" "}
          </h3>

          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
              <i className="fa fa-bars"> </i>
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li className="btn btn-block droplink" name="entertainment">
                    <Link to={routes.market_services_page}>
                      <i className="fa fa-shopping-bag"> </i> Market Services{" "}
                    </Link>
                  </li>
                  <li className="btn btn-block droplink">
                    <Link to={routes.market_products_page}>
                      <strong>
                        {" "}
                        <i className="fa fa-shopping-bag"> </i> Market Products{" "}
                      </strong>{" "}
                    </Link>
                  </li>

                  <li className="btn btn-block droplink">
                    {user_account_state.user_account.uid ? (
                      <Link to={routes.logout_page}>
                        <strong>
                          {" "}
                          <i className="fa fa-sign-in"> </i> Log out{" "}
                        </strong>{" "}
                      </Link>
                    ) : (
                      <Link to={routes.login_page}>
                        <strong>
                          {" "}
                          <i className="fa fa-sign-in"> </i> Log in to Weq
                          Trading{" "}
                        </strong>{" "}
                      </Link>
                    )}
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
