
import React,{Fragment, useState,useEffect} from 'react'

function BlogHome(){
    const [posts,setPosts] = useState({posts:[]});

    useEffect(() => {
      return () => {
        
      };
    }, [])

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box-header">
            <h3 className="box-title">
              <strong> Blog Home</strong>
            </h3>
          </div>
          <div className="row">
              <div className="col-lg-3">
                <BlogPost />
              </div>
              <div className="col-lg-3">
                <BlogPost />
              </div>
              <div className="col-lg-3">
                <BlogPost />
              </div>
              <div className="col-lg-3">
                <BlogPost />
              </div>
          </div>
        </div>
      </Fragment>
    );
}


function BlogPost(){
    return(
        <Fragment>
            <div className='content'>
                <div className='content-header'>
                    Post title
                </div>
            </div>
        </Fragment>
    )
}


export default function Blog (){
  
  
    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <i className="fa fa-book"> </i> Blog{" "}
              </strong>
            </h3>

            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool"
                name="pages"
              >
                <strong>
                  {" "}
                  <i className="fa fa-folder"> </i> Pages{" "}
                </strong>
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                name="posts"
              >
                <strong>
                  {" "}
                  <i className="fa fa-file"> </i> Posts{" "}
                </strong>
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                name="categories"
              >
                <strong>
                  {" "}
                  <i className="fa fa-folder-open"> </i> Categories{" "}
                </strong>
              </button>
            </div>
          </div>

          <BlogHome />
        </div>
      </Fragment>
    );
}
