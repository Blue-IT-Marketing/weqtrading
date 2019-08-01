import React,{Fragment} from 'react'

export default function ContactDetails () {
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              <i className="fa fa-info"> </i> Contact Details
            </strong>
          </h3>
        </div>

        <div className="box-footer">
          <div className="small-box-footer">
            <div className="box-header">
              <h3 className="box-title">
                  <strong> 
                      <i className='fa fa-building'> </i> {" "}
                      Business Details
                  </strong>
              </h3>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Business Name : </strong>
                <em>
                  Whittlesea Experience Quality Computer College &amp;
                  Solutions CC
                </em>
              </li>
              <li className="list-group-item">
                <strong>Registration Number : </strong>
                <em>2010/158059/23</em>
              </li>
              <li className="list-group-item">
                <strong>Business Address : </strong>
                <em>80 Shepstone Street, Whittlesea,5360</em>
              </li>
              <li className="list-group-item">
                <strong> Business Fax : </strong>
                <em>
                  <a href="mailto:0408421225">040-842-1225</a>
                </em>{" "}
                |
                <em>
                  <a href="mailto:0865182222@faxfx.net">086-518-2222</a>
                </em>{" "}
                |
              </li>
            </ul>
          </div>

          <div className="box box-footer">
            <div className="box box-header">
              <h3 className="box-title">
                <strong><i className='fa fa-user'> </i> Contact Persons</strong>
              </h3>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Contact Person : </strong>
                    <em>Phumza Goniwe</em>
                  </li>
                  <li className="list-group-item">
                    <strong>Cell : </strong>
                    <em>
                      <a href="tel:0834226565">083-422-6565</a>
                    </em>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Contact Person : </strong>
                    <em>Nsubuga Charles Heinnrich</em>
                  </li>
                  <li className="list-group-item">
                    <strong>Cell : </strong>
                    <em>
                      <a href="tel:O781111869">O78-111-1869 </a>
                    </em>
                  </li>
                  <li className="list-group-item">
                    <strong>Cell : </strong>
                    <em>
                      <a href="tel:0838630886">083-863-0886 </a>
                    </em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
