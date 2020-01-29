import React, { Component } from 'react';
export default class Header extends Component {
    render() {
        let resumeData = this.props.resumeData;
        return (
            <React.Fragment>
                <header id="home">
                    <nav id="nav-wrap">
                        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                        <ul id="nav" className="nav">
                            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                            <li><a className="smoothscroll" href="#about">About</a></li>
                            <li><a className="smoothscroll" href="#portfolio">Works</a></li>
                            <li><a className="smoothscroll" href="#resume">Resume</a></li>
                            <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
                            <li><a className="smoothscroll" href="#contact">Contact</a></li>
                        </ul>
                    </nav>

                    <div className="row banner">
                        <div className="banner-text">
                            <h1 className="responsive-headline">{resumeData.name}</h1>
                            <ul className="social">
                                <li className="top-line">
                                    <h2 id="role-name" style={{color:'#fff', fontFamily:'sans-serif '}}>{resumeData.role}</h2>
                                </li>
                                {
                                    resumeData.socialLinks && resumeData.socialLinks.map(item =>{
                                    return(
                                            <li key={item.name}>
                                                <a href={item.url} target="_blank"><i className={item.className}></i></a>
                                            </li>
                                            )
                                        }
                                    )
                                }
                            </ul>
                            <h3 style={{color:'#fff', fontFamily:'sans-serif '}} className="lead leave">Welcome to my porfolio! As a shameless hook for visitors, I've connected with Giphy's API to randomly show today's top trending GIFs. Enjoy!</h3>
                            <hr className="leave"/>
                                <a className="button giphy" role="button">Today's Trending GIFs</a>
                            <div className="front-card row">
                                <div className="five columns">
                                    <h3 style={{color:'#fff', fontFamily:'sans-serif '}}  className="trending"></h3>
                                    <h3 style={{color:'#fff', fontFamily:'sans-serif '}}  className="word"></h3>
                                </div>
                                <div className="giphy-image seven columns">
                                    <a className="gif"></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="scrolldown">
                        <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
                    </p>

                </header>
            </React.Fragment>
        );
    }
}