import {GraphQLClient, gql} from "graphql-request";

const API_URL = `https://api.podchaser.com/graphql`;
// const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjJkZWM3Yi0yZDVhLTRiZDgtOTQ3MC1iZDdlZjRmYWExMjEiLCJqdGkiOiJhNzliMDdiZmUwYTRkMjgzYzUzMGVjYmMyY2JmZDg5OThiMDllYWU2NjlmOTBlYWM4M2M5YTg3YTY4NDhhZTAwZTJlYjViYzM4Y2RiZjgxOCIsImlhdCI6MTY1MTI0MDEyMS41MzkxNCwibmJmIjoxNjUxMjQwMTIxLjUzOTE0OCwiZXhwIjoxNjgyNzc2MTIxLjUxMDUxOSwic3ViIjoiIiwic2NvcGVzIjpbIioiXX0.Ef-wBWW0WXIEwFX318RzKXXxOy_Yv-Mq5tC6e3kf-20kBumQlChlO65RTGD_HF3YNcgUA761L8UiqlFxqsGvAEvUugZWR1lo9VXF8kSqyjQcxf0WCel5RES5XEaHECnT6_mMGcXlDRgRTuknq2KRyR1DPtz1DIAhdxmPrqm1Tirx00aIZfDpa0_K6nb66BQG_M8AD3UM4Txhwfg2OL7NPkL-wmMtTU9HPpQwPboMhIj2tDtGDyjsh75KBRLGPD5XO8BPAG2sR3mageCMHd4NWHAq4C2eMWtwtgXd__PJQKKkZGpCmUsIVdYX4z7IKTL5x-5UGKMsLNT0IgG04cQjvM6sYMtkfocrD9U5jDSQv7D1Tt5jP1734uKGb7DdGEgwrbe2KWKt4ncBn0k9-nygBYYtdyW5tz7Zv7pUvwP7QOBPmCkUGiy4tchLpiB2_H8tx3bbTP8oCkortz0Tur3dLni4W92KgxJjCZ-SYmRUk9vZWMPLvhMlioGdz9cngHRguwvbKiqYihums6kX5HrjeGD8nmaYNS0Py5wH8_qPvnWWiCddBjH94Tvfqp2-P7vh4gvZzu_Tc_3c9zkkA1bgqWi2suT28_kUzFS87k72SOaKtxCl9G6zpijOh7z9KcdZqCjTA3Wq4qMGKj8ALOaV4Fvrc_7JESkGlbnwtGbDAmg`
const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2YzMzAzNy02Y2Q0LTQ0MGQtYTZkOS1jNjRkOGU3OWEwOWEiLCJqdGkiOiJjYWYwZGZmNTBjNzg0YmM4OWJjZmMxNTEyYmQyMTlmYTM3ZjgxYTMwMTRlOWI5ZTA3MDkyMDJjZDJlZjNlOWNlNGIxMjE0MDg4YTFlMGEyNSIsImlhdCI6MTY3MDcwODY1MC40OTMyNjEsIm5iZiI6MTY3MDcwODY1MC40OTMyNjMsImV4cCI6MTcwMjI0NDY1MC40ODMyODIsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.SPPdXhqo6qo0m1UcaUZBnLzFPXv2UV3MdH_vN1sF7-g0zyg3E1aRjf4quMh3zqQ-sJO5GGSgtsOqadFVMgPn5ysOKqIeSBDv4tEbTaqyarH0bGGLZS3fIe728TywjMCIdi94TEEF82UJlfwKoe1RmLugksP_EJhTFVhy3WM0N9_UmVEARJFD3M5ExTQ2yRDWut7fh6X-8-5Zp-8TD-Dd1yNLxGu7OA0jghs-X9gqsWZbD6BTmvH9E_RRHFiRlQGv9SmTCtw0cgAmT9C0jOZvc_u7ZVM3k7jXVLMxUYBrhvBNlRcgtuXexNJ0aBJ0l48ckgsic8rEJ9AhaSafIqxUJTPVm_KBk-bYlFRglEumAZCGxmepZGrlbHysz9cUuitLDTcsB-khAjz8rPBNVuKhkJ-LFYAn99GEIjecnrr-dIvfBV9ZSaUklkUESGRUYG7UAJS9Hya3AjSy6Wx_bxSFBjOvQBZdHZTYo_o3WyWXHElr1Xf3BeUUZjWWs9b_nf5j2cdts-P19IdbBYcTPjJNSFvkxqXGk9pLmTGsbkxtLEKUo7l70XULtwMZEvxDEObbpmkQEjZ-Obc978hdo7pkghD8AUANWnbDqE0xrBNkiRZAs55TKVUkga5TZl95_31GXbEBw8yhqMUYTyArNcnwSh9BRPLOi0VkpdvvFHchFlg`

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
});

export async function useGetPodcasts() {
    return await graphQLClient.request(gql`
      query {
        podcasts {
            data {
                id,
                title,
                description
            }
        }
      }
    `);
}

export async function useGetPodcast(podcastId) {
    return await graphQLClient.request(
        gql`
        query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `, {podcastId}
    );

}

export async function getPodcastsBySearchTerm(searchTerm) {
    return await graphQLClient.request(gql`
        query {
            podcasts(searchTerm: "${searchTerm}") {
                data {
                    id,
                    title,
                    imageUrl,
                    description
                }
            }
        }
    `);
}

export async function getPodcastsByFavorite(searchTerm) {
    return await graphQLClient.request(gql`
        query {
            podcasts(
                searchTerm: "${searchTerm}",
                first: 5) {
                data {
                    id,
                    title,
                    imageUrl,
                    avgEpisodeLength,
                    description
                }
            }
        }
    `);
}


export async function getPodcastsTopRated() {
    return await graphQLClient.request(gql`
        query {
            podcasts(filters: {rating: {minRating: 4, maxRating: 5}}, 
            sort: {sortBy: FOLLOWER_COUNT, direction: DESCENDING},
            first: 5) {
                data {
                    id,
                    title,
                    imageUrl,
                    avgEpisodeLength,
                    description
                }
            }
        }
    `);
}

export async function getPodcastsById(id) {
    return await graphQLClient.request(gql`
        query {
            podcast(identifier: {type: PODCHASER, id: "${id}"}) {
                id,
                title,
                imageUrl,
                avgEpisodeLength,
                description
            }
        }
    `);
}

export async function getEpisodesById(id) {
    return await graphQLClient.request(gql`
        query {
            episode(identifier: {type: PODCHASER, id: "${id}"}) {
                id,
                title,
                imageUrl,
                description
            }
        }
    `);
}

export async function getPodcastEpisodes(id, page) {
    return await graphQLClient.request(gql`
        query {
            podcast(identifier: {type: PODCHASER, id: "${id}"}) {
                episodes(page: ${page}, first: 5, sort: {sortBy: AIR_DATE, direction: DESCENDING}) {
                    paginatorInfo {
                        currentPage,
                        hasMorePages,
                        lastPage,
                    },
                    data {
                        id,
                        title,
                        airDate,
                        imageUrl,
                    }
                }
            }
        }
    `);
}

export async function getPodcastsByCategoryAndRating(category) {
    return await graphQLClient.request(gql`
query {
    podcasts(filters: {categories: "Comedy", rating: {minRating: 3}) {
        data {
            title,
            id,
            description,
            imageUrl
        }
    }
}
    `);
}