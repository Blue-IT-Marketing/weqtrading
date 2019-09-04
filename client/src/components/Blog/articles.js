import Axios from 'axios';

function return_date(){
	const now = new Date();
	const this_year = now.getFullYear();
	const this_month = now.getMonth();
	const this_day = now.getDate();
	return this_year + '-' + this_month + '-' + this_day;
}

function return_page_size(){
	// consider checking the backend for page size
	return 20;
}

let articles_api = {
	apiKey : '41e896a0a1c94b61903408fae1a49471',
	this_date : return_date(),
	this_pagesize :return_page_size(),
	entertainment_news: 'https://newsapi.org/v2/top-headlines?country=za&category=entertainment&apiKey=41e896a0a1c94b61903408fae1a49471',
	sports_news: 'https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=41e896a0a1c94b61903408fae1a49471',
    business_news: 'https://newsapi.org/v2/top-headlines?country=za&category=business&apiKey=41e896a0a1c94b61903408fae1a49471',
    tech_news: 'https://newsapi.org/v2/top-headlines?country=za&category=technology&apiKey=41e896a0a1c94b61903408fae1a49471',
    science_news: 'https://newsapi.org/v2/top-headlines?country=za&category=science&apiKey=41e896a0a1c94b61903408fae1a49471',
    health_news: 'https://newsapi.org/v2/top-headlines?country=za&category=health&apiKey=41e896a0a1c94b61903408fae1a49471'
};
export async function get_blog_articles(category) {	
	let results = '';
	let apiRequest = '';
    console.log('CATEGORY',category);	
		switch(category){
            case 'entertainment': apiRequest = articles_api.entertainment_news;break;
            case 'sports' : apiRequest = articles_api.sports_news;break;
            case 'business' : apiRequest = articles_api.business_news;break;
            case 'tech' : apiRequest = articles_api.tech_news;break;
            case 'science': apiRequest = articles_api.science_news;break;
            case 'health' : apiRequest = articles_api.health_news;break;
            default: apiRequest = articles_api.entertainment_news;break;        
        }
        
	await Axios.get(apiRequest).then(result => {
		if (result.status === 200) {
			return result.data;
		} else {
			throw new Error('There was an error fetching articles');
		}
	}).then(articles => {
		results = articles;
	}).catch(error => {
		console.log(error);
	});
	console.log('RESULTS : ', results);
	return results.articles;
}