/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react';
import Axios from 'axios';
import './Blog.css';
import {useForceUpdate} from '../hooks/forceUpdate';
import {get_blog_articles} from './articles';

let blog_posts = '';


function BlogPost({ post_data }) {
	const [post, setPost] = useState({});

	let article = post_data;
	console.log('Articles',article);
	return (
		<Fragment>
			<div className="box box-body with-border">
				<div className="box box-header with-border">
					<a href={article.url} target="_blank">
						<h2 className="box-title">{article.title}</h2>
					</a>
				</div>
				<div className="polaroid">
					<img src={article.urlToImage} className="pola-image" />
					<div className="polatext">{article.description}</div>
					<div className="box box-footer with-border">
						<a href={article.url} target="_blank">
							<h3 className="box-title">
								{' '}
								{article.source.name} - {article.author}{' '}
							</h3>
						</a>
						<button
							type='button'
							className='btn btn-primary'
              onClick={e => {}}
              // when clicked display the entire article
						>
							<i className='fa fa-file-pdf-o'> </i>{' '}
              Read more...
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};


const Blog = () => {
	const[category,setCategory] = useState('entertainment');
  const [posts, setPosts] = useState([]);
  const [displayMenu,setMenu] = useState({menu:false});
	

  

const showDropdownMenu = e => {
    e.preventDefault();
    setMenu({menu:true});
    document.addEventListener('click', hideDropdownMenu);    
  }

  const hideDropdownMenu = () => {
    setMenu({menu:false});
    document.removeEventListener('click', hideDropdownMenu);    
  }

  const title = `${category[0].toUpperCase()}${category.slice(1)} News`;

	useEffect(() => {
    async function fetchData() {
      try{
        let blog_posts = await get_blog_articles(category);
        console.dir(blog_posts);
        setPosts(blog_posts);
        return true;
      }catch(error){
        console.log(error);
        return false;
      }            
    }
    fetchData().then(result => {
      console.log(result);
    })
  }, [category]);

	return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>
              {" "}
              <i className="fa fa-file-text"> </i> Blog{" "}
            </strong>
          </h3>

          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
                <i className='fa fa-bars'> </i>{" "}
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    className="btn btn-block droplink"
                    name="entertainment"
                    onClick={() => setCategory("entertainment")}
                  >
                    <i className="fa fa-folder-open"> </i> Entertainment{" "}
                  </li>

                  <li
                    className="btn btn-block droplink"
                    name="sports"
                    onClick={() => setCategory("sports")}
                  >
                    <i className="fa fa-folder-open"> </i> Sports{" "}
                  </li>

                  <li
                    className="btn btn-block droplink"
                    name="business"
                    onClick={() => setCategory("business")}
                  >
                    <i className="fa fa-folder-open"> </i> Business{" "}
                  </li>

                  <li
                    className="btn btn-block droplink"
                    name="tech"
                    onClick={() => setCategory("tech")}
                  >
                    <i className="fa fa-folder-open"> </i> Tech{" "}
                  </li>

                  <li
                    className="btn btn-block droplink"
                    name="science"
                    onClick={() => setCategory("science")}
                  >
                    <i className="fa fa-folder-open"> </i> Science{" "}
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="health"
                    onClick={() => setCategory("health")}
                  >
                    <i className="fa fa-folder-open"> </i> Health
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <div className="box box-footer">
          <div className="box box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <i className="fa fa-files-o"> </i> {title}{" "}
              </strong>
            </h3>
          </div>
          {posts &&
            posts.map((post, index) => {
              return <BlogPost post_data={post} key={index} />;
            })}
        </div>
      </div>
    </Fragment>
  );
}


export default Blog;