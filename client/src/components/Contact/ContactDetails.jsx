import React,{Fragment} from 'react'
import './Contact.css';
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
                  <i className="fa fa-building"> </i> Business Details
                </strong>
              </h3>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Business Name : </strong>
                    <em>Weq Trading &amp; Projects</em>
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
                  <li className="list-group-item">
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
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m22!1m11!1m3!1d1031.541083124503!2d26.82210571473625!3d-32.17379083467601!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m5!1s0x1e62350d78cff7e3%3A0x6d7e84c719fdcd2b!2sWeq+Trading+And+Projects!3m2!1d-32.1735701!2d26.8231617!4m0!5e1!3m2!1sen!2sza!4v1564836874505!5m2!1sen!2sza"
                  className="map-style"
                  height="460"
                  width="600"
                  allowfullscreen
                  frameBorder="0"
                />
              </div>
            </div>
          </div>      
        </div>
      </div>
    </Fragment>
  );
}
