import React, { useEffect, useReducer, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import moment from 'moment'
import { API_KEY, value_con } from '../../data'
import { useParams } from 'react-router-dom'





const PlayVideo = ({  }) => {

    const {videoId} = useParams();

    const [apidata, setApiData] = useState(null);

    const [otherData, setOtherData] = useState(null)
    const [commentData, setCommentData] = useState([])

    const fetchotherData = async () => {

        //fetching cahnnel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`

        await fetch(channelData_url)
            .then(res => res.json())
            .then(data => setOtherData(data.items[0]));

        //fetching channel comments Data

        const comment_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`

        await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))

    }

    const fetchVideoData = async () => {
        //Getting video data
        const videoDetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => setApiData(data.items[0]))

    }
    useEffect(() => {
        fetchVideoData()
    }, [videoId])

    useEffect(() => {
        fetchotherData()
    }, [apidata])

    return (
        <div className='play-video'>

            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apidata ? apidata.snippet.title : 'My_Title'}</h3>
            <div className="play-video-info">
                <p>{apidata ? value_con(apidata.statistics.viewCount) : '16K'} views &bull; {apidata ? moment(apidata.snippet.publishedAt).fromNow() : '2 days ago'}</p>
                <div>
                    <span><img src={like} alt="" />{apidata ? value_con(apidata.statistics.likeCount) : '155'}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />125</span>
                    <span><img src={save} alt="" />125</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={otherData ? otherData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apidata ? apidata.snippet.channelTitle : 'Brijesh'}</p>
                    <span>{otherData ? value_con(otherData.statistics.subscriberCount) : '2M'} Subscriber</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-discription">
                <p>{apidata ? apidata.snippet.description.slice(0, 300) + '........' : 'Description'}</p>
                <hr />
              
              
                <h4>{apidata ? value_con(apidata.statistics.commentCount) : '12 Comments'}  Comments</h4>
                {commentData.map((item,index)=>{
                    return (
                        <div className="comment" key={index}>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{value_con(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
    
                        </div>
    
                    </div>
                   
                    )
                })}
               
            </div>

        </div>
    )
}

export default PlayVideo