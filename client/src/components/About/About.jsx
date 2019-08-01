import React, { Fragment } from 'react'
import './About.css';

export default function About () {

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box-header">
            <h3 className="box-title">
              <strong>
                <i className="fa fa-info"> </i> About
              </strong>
            </h3>
          </div>

          <div className="box box-footer">
            <div className="box box-header">
              <h3 className="box-title">
                <strong> Introduction </strong>
              </h3>
            </div>
            <blockquote>
              <ul className="list-group">
                <li className="list-group-item">
                  Whittlesea Experience Quality Computer College &amp;
                  Solutions is a registered company registered as a close
                  corporation
                </li>
                <li className="list-group-item">
                  It is a service provider company, which is concerned about
                  its community, because the main aim is to fight
                  unemployment.
                </li>
                <li className="list-group-item">
                  It is owned by two directors but aims to employing more
                  than twenty employees.
                </li>
                <li className="list-group-item">
                  The books of this company are managed by the accountant
                  Ntombizamfaku Nelisa Sigcau.
                </li>
                <li className="list-group-item">
                  This company has got visions and dreams of the rainbow
                  nation.
                </li>
              </ul>
            </blockquote>
          </div>

          <div className="box-footer">
            <div className="box-header">
              <h3 className="box-title">
                <strong>Vision</strong>
              </h3>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                To be a leading and effective organization that is based on
                its community needs, fulfilment and also that is capable of
                meaningful contribution towards the development of the
                people.
              </li>
              <li className="list-group-item">
                To see a well developed community.
              </li>
              <li className="list-group-item">
                To see the previously disadvantaged community with the
                skills to fight poverty and unemployment.
              </li>
              <li className="list-group-item">
                To see an improved standard of living for every South
                African.
              </li>
            </ul>
          </div>

          <div className="box box-footer">
            <div className="box box-header">
              <h3 className="box-title">
                <strong>Services</strong>
              </h3>
              <blockquote>
                The company offers the following other services
              </blockquote>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                Internet Connections / WIFI access
              </li>
              <li className="list-group-item">Construction</li>
              <li className="list-group-item">Fencing</li>
              <li className="list-group-item">Renovations</li>
              <li className="list-group-item">Rentals Apartments</li>
              <li className="list-group-item">Transportation</li>
              <li className="list-group-item" > Training</li>
              <li className='list-group-item'> Supply of Chairs,Tables, and Tents</li>
              <li className='list-group-item'>Installations of Surveilance Cameras and Alarms</li>
              <li className='list-group-item'>Supply of cleaning Materials</li>
              <li className='list-group-item'>Construction</li>
              <li className='list-group-item'>Tilling</li>
              <li className='list-group-item'>Plumbing</li>
              <li className='list-group-item'>Wiring (Electrical)</li>
              <li className='list-group-item'>Painting</li>
            </ul>

          </div>
        </div>
      </Fragment>
    );
}
