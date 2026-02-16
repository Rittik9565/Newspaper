import React from "react";

export default function NewsItem(props) {
  return (
    <>
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">

        <div className="card">
          <img src={urlToImage} className="card-img-top" alt={urlToImage}></img>
          <div className="card-body">
            <h5 className="card-title">{props.source}</h5>
            <h5 className="card-title">{props.title}</h5>
            <h5 className="card-title">{props.publishedAt}</h5>
            <p className="card-text">{props.description}</p>
            <a href={props.url} className="btn btn-primary">Read More.....</a>
          </div>
        </div>
      </div>
      </>
      );
}
