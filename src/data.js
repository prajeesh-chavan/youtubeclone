export const API_KEY = 'AIzaSyBf7yqKfstbZt-tq7EuL5XCsPzMQDArhrg';

export const value_converter = (value) =>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}

export const fetchYouTubeData = async (query) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=25&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
  };
