import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";
import {getPodcastsById, getPodcastsBySearchTerm, getPodcastsTopRated, getPodcastsByFavorite} from "../useRequest";
import {Link} from "react-router-dom";
import SecureContent from "./secure-content";

const Homepage = () => {

    let {profile} = useProfile();

    let [followedPodcasts, setFollowedPodcasts] = useState([])
    let [topRatedPodcasts, setTopRatedPodcasts] = useState([])
    let [favoritePodcasts, setFavoritePodcasts] = useState([])


    useEffect(() => {
        if (profile !== null) {
            getFollowedPodcasts()
        }
    }, []);

    useEffect(() => {
        if (profile !== null) {
            getFavoritePodcasts()
        }
    }, []);

    useEffect(() => { getTopRatedPodcasts()}, []);


    const getFollowedPodcasts = async () => {
        const podcastPochaserIds = profile.following;
        let newPodcasts = [];

        if (podcastPochaserIds) {
            await Promise.all(podcastPochaserIds.map(async (pod) => {
                const details = await getPodcastsById(pod.podcastId);
                newPodcasts.push(details.podcast);
            }));
        }
        setFollowedPodcasts(newPodcasts);
    }

    const getFavoritePodcasts = async () => {
        const favoritePodcast = profile.favorite;
        const favoritePods = await getPodcastsByFavorite(favoritePodcast);
        console.log(favoritePods);
        // let newPodcasts = [];

        // if (podcastPochaserIds) {
        // await Promise.all(podcastPochaserIds.map(async (pod) => {
        //     const details = await getPodcastsById(pod.podcastId);
        //     newPodcasts.push(details.podcast);
        // }));
        // const favoritePods = await getPodcastsTopRated();
        // setTopRatedPodcasts(topRatedPods.podcasts.data);
        // }
        // setFollowedPodcasts(newPodcasts);
        setFavoritePodcasts(favoritePods.podcasts.data);
    }

    const getTopRatedPodcasts = async () => {
        // const trendingPods = await getPodcastsBySearchTerm("Cats");
        const topRatedPods = await getPodcastsTopRated();
        setTopRatedPodcasts(topRatedPods.podcasts.data);

    }

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 60) + "..." : description;
    }

    return (
        <div>
            <h1>Homepage</h1>
            <SecureContent>
                <h3 className={"mt-3"}>Podcasts you interested</h3>
                <div className={"ps-0 mt-4 card-group"}>
                    {
                        favoritePodcasts.map((podcast) => {
                            return (<div key={podcast.podcastId}>
                                <div className={"card m-2"} style={{width: '15rem'}}>
                                    <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"}>{podcast.title}</h6>
                                        <p className={"text-muted"}>{truncateDescription(podcast.description)}</p>
                                        <p className={"text-dark"}>Average Episode Length in seconds:  {podcast.avgEpisodeLength}</p>
                                        <Link to={`/podcasts/details/${podcast.id}`}
                                              className={"link text-decoration-none p-0 m-0"}>See more</Link>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </SecureContent>
            <SecureContent>
                <h3 className={"mt-3"}>Podcasts you follow</h3>
                <div className={"ps-0 mt-4 card-group"}>
                    {
                        followedPodcasts.map((podcast) => {
                            return (<div key={podcast.podcastId}>
                                <div className={"card m-2"} style={{width: '15rem'}}>
                                    <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"}>{podcast.title}</h6>
                                        <p className={"text-muted"}>{truncateDescription(podcast.description)}</p>
                                        <p className={"text-dark"}>Average Episode Length in seconds:  {podcast.avgEpisodeLength}</p>
                                        <Link to={`/podcasts/details/${podcast.id}`}
                                              className={"link text-decoration-none p-0 m-0"}>See more</Link>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </SecureContent>
            <h3 className={"mt-4"}>Top Rated Podcasts</h3>
            <div className={"ps-0 mt-4 card-group"}>
                {
                    topRatedPodcasts.map((podcast, index) => {
                        index += 1;
                        return (<div key={index}>
                            <div className={"card m-2"} style={{width: '15rem'}}>
                                <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>{podcast.title}</h6>
                                    <p className={"text-muted"}>{truncateDescription(podcast.description)}</p>
                                    <p className={"text-dark"}>Average Episode Length in seconds:  {podcast.avgEpisodeLength}</p>
                                    <Link to={`/podcasts/details/${podcast.id}`}
                                          className={"link text-decoration-none p-0 m-0"}>See more</Link>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    );
};

export default Homepage;