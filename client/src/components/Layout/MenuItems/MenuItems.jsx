import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {routes} from '../../../constants';

const SideBarMenuAuth = () => {
    return (
        <ul className="sidebar-menu">
            <li className="header">B-Feather</li>
            <li><Link to={routes.home_page} title="Big feather Music Portal"><i className="fa fa-home"></i> <strong>Home</strong></Link></li>
            <li><Link to={routes.about_page} title="About"><i className="fa fa-info"></i> <strong>About</strong></Link></li>
            <li><Link to={routes.contact_page} title="Contact Us"><i className="fa fa-envelope"></i> <strong>Contact</strong></Link></li>
            <li className="active treeview">
                <Link to="#">
                    <i className="fa fa-user-md"></i> <span>Client Area</span>
                    <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"></i>
                    </span>
                </Link>
                <ul className="treeview-menu">
                    <li><Link to={routes.admin_page} title="manage your Account"><i className="fa fa-sign-in"> </i> <strong> Account</strong> </Link> </li>                    
                    <li><Link to={routes.music_page} title=""><i className="fa fa-soundcloud"> </i> <strong>Music</strong></Link></li>
                    <li><Link to={routes.vidoes_page} title=""><i className="fa fa-youtube"> </i> <strong>Videos</strong></Link></li>
                </ul>
            </li>
            <li><Link to={routes.blog_page} title="Bulk Messaging &amp; Contact Management Blog"><i className="fa fa-book"> </i> <strong>Blog</strong></Link></li>
            <li><Link to={routes.dashboard_page} title="Dashboard"><i className="fa fa-dashboard"> </i> <strong>Dashboard</strong></Link></li>
        </ul>        
    )
}

const SideBarMenuNonAuth = () => {
    return (
    <ul className="sidebar-menu">
        <li className="header">B-Feather</li>
            <li className="active treeview">
                <ul className="treeview-menu">
                    <li><Link to={routes.home_page} title="Big feather Music Portal"><i className="fa fa-home"></i> Home</Link></li>
                    <li><Link to={routes.about_page} title="Contact Us"><i className="fa fa-info"></i> About</Link></li>
                    <li><Link to={routes.contact_page} title="Contact Us"><i className="fa fa-envelope"></i> Contact</Link></li>
                    <li><Link to={routes.blog_page} title="Bulk Messaging &amp; Contact Management Blog"><i className="fa fa-book"> </i> <strong>Blog</strong></Link></li>
                    <li><Link to={routes.music_page} title=""><i className="fa fa-soundcloud"> </i> <strong>Music</strong></Link></li>
                    <li><Link to={routes.vidoes_page} title=""><i className="fa fa-youtube"> </i> <strong>Videos</strong></Link></li>
                    <li><Link to={routes.login_page} title="Login to Big Feather"><i className="fa fa-sign-in"> </i> Login </Link></li>
                </ul>
            </li>
    </ul>   
    ) 
}


export default function MenuItems (props) {
    const [user, setLoggedIn] = useState({user:''})
  return (
    <div>
        {
              user.isLoggedIn ? <SideBarMenuAuth /> : <SideBarMenuNonAuth />
        }
        
    </div>
  )
}

MenuItems.propTypes = {

}
