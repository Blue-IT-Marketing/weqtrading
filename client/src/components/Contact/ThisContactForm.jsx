import React, { Component } from 'react';
import axios from "axios";
import {Utils} from '../../utilities';
import InlineError from "../Forms/InlineError";
export let contact_form_details  = {
            messageid:"",
            names : "",
            email : "",
            cell: "",
            subject: "",
            message: "",

            message_read : false,
            date_read : "",
            date_sent : ""
};

export let contact_response_message_detail = {
        messageid:"",
        response:"",
        date_sent:"",
};

let contact_form_errors = {
            names_error : '',
            email_error : '',
            cell_error : '',
            subject_error : '',
            message_error : '',

};

class ThisContactForm extends Component {
    constructor (){
        super();

        this.state = {
            contact_form : {...contact_form_details},
            form_errors: {...contact_form_errors},
            form_messages : '',
        };
        this.change = this.change.bind(this);
        this.onSubmitContactForm = this.onSubmitContactForm.bind(this);
        this.onCheckErrors = this.onCheckErrors.bind(this);
    };


    change =(e) =>{

        let contact_form = Object.assign({},this.state.contact_form);
        contact_form[e.target.name] = e.target.value;

        this.setState({
            contact_form:contact_form
        });
    };

    onSubmitContactForm =(e) =>{
        e.preventDefault();        
        console.log(this.state.contact_form);
        let data = JSON.stringify(this.state.contact_form);
        console.log(data);
        let self = this;

        axios.post("/api/contact/submit-contact-form","data=" + data).then( function(response){
            if (response.status === 200){
                return response.data;
            }
        }).then(function(data){
            let message = data.message;
            self.setState({
                form_messages: message
            });

        }).catch(function(err){
            let message = err.message;
            self.setState({
                form_response : message
            });
        })
    };

    onCheckErrors = () => {
        this.isError = false;
        this.form_errors  = Object.assign({},this.state.form_errors);
        let self = this;

        this.do_check_errors = async() => {
            let check_names_errors = () =>{
                if (Utils.isEmpty(this.state.contact_form.names) === true){
                    self.form_errors.names_error = 'names field cannot be empty';
                    self.isError = true
                }
                return this;
            };

            let check_email_errors = () => {
              if (Utils.validateEmail(this.state.contact_form.email) === false){
                  self.form_errors.email_error = 'email field is invalid';
                  self.isError = true;
              }
              return this;
            };

            let check_cell_errors = () => {
                if (Utils.isCell(this.state.contact_form.cell) === false){
                    self.form_errors.cell_error = 'cell field is invalid';
                    self.isError = true
                }
                return this;
            };

            let check_subject_errors = () => {
                if (Utils.isEmpty(this.state.contact_form.subject) === true){
                    self.form_errors.subject_error = 'subject field is invalid';
                    self.isError = true;
                }
                return this;
            };

            let check_message_errors = () => {
                if (Utils.isEmpty(this.state.contact_form.message) === true){
                    self.form_errors.message_error = 'message field is invalid';
                    self.isError = true;
                }
                return this;
            };

            await check_names_errors();
            await check_email_errors();
            await check_cell_errors();
            await check_subject_errors();
            await check_message_errors();



            return self.isError
        };

        let results = this.do_check_errors();

        this.setState({
            form_errors : this.form_errors
        });
        return results;
    };

    render (){
        
        return (
        <div className="col-md-6">
        <div className="box box-header">
            <h3 className="box-title"> <strong> <i className="fa fa-envelope"> </i> Contact Form</strong></h3>
        </div>
        <form className="form-horizontal">
            <div className="form-group">            
                <input
                    className="form-control"
                    name="names"
                    placeholder="Names"
                    value={this.state.contact_form.names}
                    onChange={e => this.change(e)}
                />
                {(this.state.form_errors.names_error) ? <InlineError message={this.state.form_errors.names_error}/> : ''}
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={this.state.contact_form.email} onChange={e => this.change(e)}
                />
                {(this.state.form_errors.email_error) ? <InlineError message={this.state.form_errors.email_error}/> : ''}
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    name="cell"
                    placeholder="Cell"
                    value={this.state.contact_form.cell}
                    onChange={e => this.change(e)}
                />
                {(this.state.form_errors.cell_error) ? <InlineError message={this.state.form_errors.cell_error}/> : ''}
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    name="subject"
                    placeholder="Subject"
                    value={this.state.contact_form.subject}
                    onChange={e => this.change(e)}
                />
                {(this.state.form_errors.subject_error) ? <InlineError message={this.state.form_errors.subject_error}/> : ''}
            </div>
            <div className="form-group">
                <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    value={this.state.contact_form.message}
                    onChange={e => this.change(e)}
                />
                {(this.state.form_errors.message_error) ? <InlineError message={this.state.form_errors.message_error}/>: '' }
            </div>
            <div className="form-group">

                <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={e => {
                        let self = this;
                        this.onCheckErrors().then(function(results){
                            if (!results){
                                self.onSubmitContactForm(e)
                            }else{

                                self.setState({
                                    form_response: 'there where errors aboves'
                                });

                                console.log('there where errors on form fields')
                            }
                        }).catch(function(err){
                            self.setState({
                                form_response: err.message
                            });
                            console.log('There was an error checking for errors');
                        })
                        }
                    }>
                    <strong> <i className="fa fa-send"> </i> Submit Message</strong>
                </button>
                <button
                    type={'button'}
                    className={'btn btn-warning btn-lg'}
                    name={'reset'}
                    onClick={e => {
                        this.setState({
                            contact_form : {...contact_form_details},
                            form_errors: {...contact_form_errors},
                            form_messages : '',
                        });
                    }}
                >
                    <strong><i className={'fa fa-eraser'}> </i> Reset </strong>

                </button>

            </div>
            <div className="form-group">
                        <p>{this.state.form_messages}</p>
            </div>
        </form>
        </div>
        )
    };

}

export default ThisContactForm