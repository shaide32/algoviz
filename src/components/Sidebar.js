import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import {metaData} from '../core/algorithms';

const getChildren = (children, parentUrl) => {
    if(children){
        return children.map((child) => {
            return (
                <Link to={parentUrl + child.url} key={child.name}>{child.name}</Link>
            )
        });
    }
    return null;
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true
        }
    }
    render() {
        console.log(metaData.children);
        const links = metaData.children;
        return(
            <div className="sidebar">
                <span>Company Logo</span>
                {
                    links.map((link) => {
                        const childElements = getChildren(link.children, link.url);
                        return (
                            <Fragment key={link.name}>
                                <h2 key={link.name}>{link.name}</h2>
                                {childElements}
                            </Fragment>
                            
                        );
                    })
                }
                
            </div>
        );
    }
}

export default Sidebar;