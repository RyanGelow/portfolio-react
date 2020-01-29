import React, { Component } from 'react';
import axios from 'axios';


const DefaultMessage = () => {
  return (
    <p className="lead contact-head">Feel free to contact me about my work or with any questions!</p>
  );
}
const Success = () => {
  return (
    <h4 className="lead contact-head message-success">Message Sent!</h4>
  );
}

const Result = props => {
  const messageStatus = props.messageStatus;
  if(messageStatus === "success") {
      return <Success />;
  }
  else {
      return <DefaultMessage />;
  }
}

export default class ContactForm extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      message: null,
      check: false,
      status: null,
      form: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, message } = this.state;

    axios.post('/api/form', {
      name,
      email, 
      message
    })

    this.setState({ status: 'success' })
    
    this.resetForm()

  }

  resetForm() {
    
     this.setState({name: "", email: "", message: "", check: false, form: "sent"});
     document.getElementById("contact-form").reset();

  }
  
  render() {
    let resumeData = this.props.resumeData;

	  return(
      <section id="contact">
        <div className="row section-head">
          <div className="ten columns">
            <Result messageStatus={this.state.status}/>
          </div>
        </div>
        <div className="ContactForm row">
          <form id="contact-form" className="twelve columns" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="3" id="message" name="message" onChange={this.handleChange} />
            </div>
            <div className="row">
              <div className="ten columns">
                <label htmlFor="check">Check Box If You're Not A Robot</label> 
                <input className="form-control" type="checkbox" name="check" value="check" onChange={this.handleChange} required/>
              </div>
              <br/>
              <div className="two columns">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
            <aside className="eigth columns footer-widgets">
              <div className="widget">
                <h4>Linked in:&nbsp;
                  <a href={"https://www.linkedin.com/in/"+resumeData.linkedinId}>
                  {resumeData.linkedinId}
                  </a>
                </h4>
              </div>
            </aside>
          </div>
      </section>
	  );
  }

  // onNameChange(event) {
	//   this.setState({name: event.target.value})
  // }

  // onEmailChange(event) {
	//   this.setState({email: event.target.value})
  // }

  // onMessageChange(event) {
	//   this.setState({message: event.target.value})
  // }
}