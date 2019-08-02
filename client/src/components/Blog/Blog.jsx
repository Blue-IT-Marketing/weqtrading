
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
              <strong> <i className='fa fa-file'> </i> Articles</strong>
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


function BlogPost({fetch_post_id}){

    const [post,setPost] = useState({
      post_id:'',
      title:'',
      summary:'',
      article:'',
      author_name:'',
      author_id:'',
      datePosted:'',
      timePosted:'',
      comment_id:''
    });

    let ReadMore = (e) => {
      console.log('Loading full post');
        // fetch post_id from
        // state then load the full version of the blog post
    };

    useEffect(() => {
      //fetch post from backend if post_id changed
      //once post has been fetched setState with it
    }, [fetch_post_id]);

    const {
      post_id,
      title,
      summary,
      article,
      author_name,
      author_id,
      datePosted,
      timePosted,
      comment_id
    } = post;


    return post_id !== "" ? (
      <Fragment>
        <div className="content">
          <div className="content-header">
            <h3 className="box-title">
              <em>{title}</em>
            </h3>
          </div>
          <div className="box box-footer">
            {summary}
            <div className="box-tools">
              <span className="btn-box-tool">
                <em>Author : {author_name}</em>
              </span>
              <br />
              <span className="btn-box-tool">
                <em>Date Posted: {datePosted}, {timePosted}</em>
              </span>
            </div>
          </div>
          <div className="box-footer">
            <button
              type="button"
              className="btn btn-box-tool btn-outline-dark"
              onClick={e => ReadMore(e)}
            >
              <i className="fa fa-hashtag"> </i>
              Read More...
            </button>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">
              <em>How to watch Paint dry!</em>
            </h3>
          </div>
          <div className="box-body">
            Internet slang for staring at your download progress bar or
            watching download speeds fluctuate. Man sits there slumped over
            staring at a computer screen watching each file segment's
            progress on utorrent hoping somehow his DVD rip of the Dark
            Knight from aXXo will download faster because he's willing it to
            happen. Friend walks in and asks. "looking at porn??" Man
            replies "no, just watching paint dry" Friend says "really should
            be looking at porn."
            <div className="box-tools">
              <span className="btn-box-tool">
                <em>Author : Justice Ndou</em>
              </span>
              <br />
              <span className="btn-box-tool">
                <em>Date Posted: 02,August,2019</em>
              </span>
            </div>
          </div>
          <div className="box-footer">
            <button
              type="button"
              className="btn btn-box-tool btn-outline-dark"
              onClick={e => ReadMore(e)}
            >
              <i className="fa fa-hashtag"> </i>
              Read More...
            </button>
          </div>
        </div>
      </Fragment>
    );
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
