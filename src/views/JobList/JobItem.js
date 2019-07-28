import React from 'react';
import { Link } from 'react-router-dom';
import './JobItem.scss';

export default function JobItem(props) {
    const data = props.data;
    return (
        <Link to="/" className="job-title">
            <h2>{data.jobTitle}</h2>
            <ul className="tag-wrapper">
                <li>{data.educationType}</li>
                <li>{data.number}人</li>
                <li>{data.jobType}</li>
            </ul>
            <div className="job-bottom">
                <p className="position">
                    <i className="icon-position"></i>
                    {data.city}
                </p>
                <p className="time">{data.createdTime}</p>
            </div>
        </Link>
    )
}