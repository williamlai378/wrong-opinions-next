import axios from 'axios'
import { NextResponse } from 'next/server';

const anilistURI = 'https://graphql.anilist.co';
const upcomingHypeQuery = `
        query {
            Page(perPage: 50) {
            media(type:ANIME sort: TRENDING_DESC status: NOT_YET_RELEASED) {
                id
                title{
                romaji
                english
                }
                idMal
                averageScore
                popularity
                startDate {
                year
                month
                day
                }
                trending
                status
                bannerImage
                coverImage {
                medium
                large
                extraLarge
                color
                }
                genres
                trailer {
                id
                site
                thumbnail
                }
                format
                externalLinks{
                site
                url
                }
                description
                season
                studios (isMain: true) {
                edges {
                    id
                }
                nodes {
                    name
                    isAnimationStudio
                } 
                }
            }
        }
    }
`
const trendingNowQuery = `
query {
    Page(perPage:16) {
    media(type:ANIME sort: TRENDING_DESC) {
        id
        title{
          romaji
          english
        }
        idMal
        averageScore
        popularity
        startDate {
          year
          month
          day
        }
        trending
        episodes
        bannerImage
        status
        coverImage {
          medium
          large
          extraLarge
          color
        }
        genres
        trailer {
          id
          site
          thumbnail
        }
        format
        externalLinks{
          site
          url
        }
        description
        season
        studios (isMain: true) {
            edges {
              id
            }
            nodes {
              name
              isAnimationStudio
            } 
        }
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        } 
      }
    }
}
`
const lastSeasonQuery = (lastSeason, year) => `query {
  Page(perPage:16) {
  media(type:ANIME sort: POPULARITY_DESC, season:${lastSeason.toUpperCase()}, seasonYear: ${year}) {
      id
      title{
        romaji
        english
      }
      idMal
      averageScore
      episodes
      popularity
      status
      startDate {
        year
        month
        day
      }
      trending
      bannerImage
      coverImage {
        medium
        large
        extraLarge
        color
      }
      genres
      trailer {
        id
        site
        thumbnail
      }
      format
      externalLinks{
        site
        url
      }
      description
      studios (isMain: true) {
          edges {
            id
          }
          nodes {
            name
            isAnimationStudio
          } 
      }
      nextAiringEpisode {
        id
        timeUntilAiring
        episode
      } 
    }
  }
}
`
const currentYearQuery = (year) => `
query {
  Page(perPage:16) {
    media(type:ANIME sort: POPULARITY_DESC, seasonYear: ${year}) {
        id
        title{
          romaji
          english
        }
        idMal
        averageScore
        popularity 
        status
        startDate {
          year
          month
          day
        }
        trending
        bannerImage
        episodes
        coverImage {
          medium
          large
          extraLarge
          color
        }
        genres
        trailer {
          id
          site
          thumbnail
        }
        format
        externalLinks{
          site
          url
        }
        description
        season
        studios (isMain: true) {
            edges {
              id
            }
            nodes {
              name
              isAnimationStudio
            } 
        }
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        } 
    }
    }
  
}
        
`
const popularAllTimeQuery = `
query {
    Page(perPage:16) {
    media(type:ANIME sort: POPULARITY_DESC) {
        id
        title{
          romaji
          english
        }
        idMal
        averageScore
        popularity 
        status
        startDate {
          year
          month
          day
        }
        trending
        bannerImage
        episodes
        coverImage {
          medium
          large
          extraLarge
          color
        }
        genres
        trailer {
          id
          site
          thumbnail
        }
        format
        externalLinks{
          site
          url
        }
        description
        season
        studios (isMain: true) {
            edges {
              id
            }
            nodes {
              name
              isAnimationStudio
            } 
        }
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        } 
    }
    }
}
`



export const getUpcomingHype = async () => {
  const results = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: upcomingHypeQuery
    }
  }).then((res) => {
    return { success: true, data: res?.data }
  }).catch((e) => {
    return {
      success: false,
      error: e
    }
  })

  if (results.success) {
    return results.data
  } else {
    return results.error
  }
}

export const getTrending = async () => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: trendingNowQuery
    }
  }).then((response) => {
    return { success: true, data: response.data }
  }).catch((e) => {

    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return result.data
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getLastSeason = async (lastSeason, year) => {

  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: lastSeasonQuery(lastSeason, year)
    }
  }).then((response) => {
    return { success: true, data: response.data }
  }).catch((e) => {

    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return result.data
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getCurrentYear = async (year) => {

  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: currentYearQuery(year)
    }
  }).then((response) => {
    return { success: true, data: response.data }
  }).catch((e) => {

    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return result.data
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getPopularAllTimeAnime = async () => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: popularAllTimeQuery
    }
  }).then((response) => {
    return { success: true, data: response.data }
  }).catch((e) => {
    console.log(e);
    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return result.data
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getAiringSchedule = async (airingGreater, airingLess) => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: `
      query($airingGreater: Int, $airingLess: Int) {
        Page(perPage: 50) {
          airingSchedules (sort: TIME airingAt_greater:$airingGreater, airingAt_lesser: $airingLess) {
            id
            episode
            timeUntilAiring
            airingAt
            media {
              id
              title {
                english
                romaji
              }
              trending
            }
          }
        }
      } 
  `,
      variables: {
        airingGreater: airingGreater,
        airingLess: airingLess
      }
    }
  }).then((response) => {
    console.log(response.data.data.Page.media)
    return { success: true, data: response.data.data.Page.airingSchedules }
  }).catch((e) => {

    return {
      success: false,
      error: e
    };
  })
  if (result.error) {
    return false
  }

  return result.data
}

export const getAnimeData = async (id) => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: `
        query {
          Media(id: ${id}, type: ANIME) {
            id
            title {
              english
              romaji
              userPreferred
            }
            idMal
            type
            tags {
              name
              rank
              category
              description
            }
            format
            rankings {
              id
              rank
              type
              format
              year
              allTime
              season
              context
            }
            status
            description
            startDate {
               year
               month
               day
            }
            endDate {
               year
               month
               day
            }
            season
            seasonYear
            seasonInt
            episodes
            duration
            countryOfOrigin
            isLicensed
            source
            hashtag
            trailer {
              id
              thumbnail
            }
            updatedAt
            coverImage {
              extraLarge
              medium
              large
              color
            }
            bannerImage
            genres
            siteUrl
            synonyms
            averageScore
            meanScore
            episodes
            popularity
            trending
            favourites
            characters (sort: FAVOURITES_DESC) {
              edges {
                id
                role
                voiceActorRoles {
                  voiceActor {
                    id
                    siteUrl
                    name {
                      first
                      middle
                      last
                      full
                      native
                      userPreferred
                    }
                    image {
                      large
                      medium
                    }
                    languageV2
                  }
                }
                node {
                  name {
                    first
                    middle
                    last
                    full
                    native
                    userPreferred
                  }
                  gender
                  siteUrl
                  dateOfBirth {
                    year
                    month
                    day
                  }
                  description
                  age
                  image {
                    medium
                    large
                  }
                  
                }
              }
            }
            tags {
              id
              name
              rank
              description
            }
            relations {
              edges {
                relationType
                node {
                  id
                  idMal
                  title {
                    english
                    romaji
                    userPreferred
                  }
                  popularity
                  nextAiringEpisode {
                    id
                    timeUntilAiring
                    episode
                    mediaId
                  }
                  coverImage {
                    medium
                    large
                    color
                  }
                  format
                  averageScore
                }
              }
            }
            stats {
              scoreDistribution {
                score
                amount
              }
              statusDistribution {
                status
                amount
              }
            }
            staff (sort: RELEVANCE){
              edges {
                role
                id
                node {
                  id
                  siteUrl
                  image {
                    medium
                    large
                  }
                  name {
                    first
                    middle
                    last
                    full
                    native
                    userPreferred
                  }
                  gender
                  languageV2
                  
                }
              }
            }
            studios {
              nodes {
                name
                isAnimationStudio
                siteUrl
              }
            }
            airingSchedule {
              edges {
                node {
                  airingAt
                  timeUntilAiring
                  episode
                  mediaId
                  id
                }
              }
            }
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            externalLinks {
              id
              url
              site
              icon
              type
              color
              isDisabled
              language
              notes
            }
            reviews (perPage: 5, sort: RATING_DESC) {
              edges {
                node {
                  rating
                  user {
                    id
                    name
                  }
                  score
                  summary
                  body
                  siteUrl
                  createdAt
                }
              }
            }
            recommendations(sort:RATING_DESC) {
              edges {
                node{
                  id
                  mediaRecommendation{
                    id
                    idMal
                    title {
                      english
                      romaji
                      userPreferred
                    }
                    popularity
                    coverImage {
                      medium
                      large 
                      color
                    }
                    averageScore
                    format
                    nextAiringEpisode {
                      episode
                      timeUntilAiring
                    }
                    studios {
                      nodes {
                        isAnimationStudio
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `
    }
  }).then((response) => {
    if (!response.data || response.data === null) {
      return { success: false, error: response.errors }
    }
    return { success: true, data: response.data }
  }).catch((e) => {
    console.log(e)
    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return { status: 'success', data: result.data.data }
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getCharactersData = async (id, pageNumber) => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: `
        query ($pageNumber: Int) {
          Media(id: ${id}) {
            characters(sort: FAVOURITES_DESC, page: $pageNumber, perPage: 30) {
              edges {
                id
                role
                voiceActorRoles {
                  voiceActor {
                    name {
                      first
                      middle
                      last
                      full
                      native
                      userPreferred
                    }
                    image {
                      large
                      medium
                    }
                    languageV2
                  }
                }
                node {
                  name {
                    first
                    middle
                    last
                    full
                    native
                    userPreferred
                  }
                  gender
                  siteUrl
                  dateOfBirth {
                    year
                    month
                    day
                  }
                  description
                  age
                  image {
                    medium
                    large
                  }
                }
              }
            }
          }
        }        
    `,
      variables: {
        pageNumber: pageNumber
      }
    }
  }).then((response) => {
    if (!response.data || response.data === null) {
      return { success: false, error: response.errors }
    }
    return { success: true, data: response.data.data.Media }
  }).catch((e) => {
    console.log(e)
    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return { status: 'success', data: result.data }
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getStaffData = async (id, pageNumber) => {
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query: `
        query ($pageNumber: Int) {
          Media(id: ${id}) {
            staff (sort: RELEVANCE, page: $pageNumber, perPage: 25){
              edges {
                role
                id
                node {
                  id
                  siteUrl
                  image {
                    medium
                    large
                  }
                  name {
                    first
                    middle
                    last
                    full
                    native
                    userPreferred
                  }
                  gender
                  languageV2

                }
              }
            }
          }
        }        
    `,
      variables: {
        pageNumber: pageNumber
      }
    }
  }).then((response) => {
    if (!response.data || response.data === null) {
      return { success: false, error: response.errors }
    }
    return { success: true, data: response.data }
  }).catch((e) => {
    console.log(e)
    return {
      success: false,
      error: e
    };
  })

  if (result.success) {
    return { status: 'success', data: result.data.data }
  } else {
    return {
      status: 'failure',
      error: result.error
    }
  }
}

export const getBrowseData = async (queryData) => {
  const airingStatus = queryData.airingStatus ? `status: ${queryData.airingStatus},` : '';
  const season = queryData.season ? `season: ${queryData.season},` : '';

  console.log('getBrowseData', queryData)
  const result = await axios({
    url: anilistURI,
    method: 'POST',
    data: {
      query:`
      query (
        $genresNotIn: [String!], 
        $genresIn: [String!],
        $tagIn: [String!],
        $tagNotIn: [String!],
        $searchQuery: String,
        $pageNumber: Int,
        $sortFilter: [MediaSort!]){
        Page(perPage: 28, page: $pageNumber) {
          pageInfo {
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, 
            genre_in: $genresIn, 
            genre_not_in: $genresNotIn,
            tag_in: $tagIn,
            tag_not_in: $tagNotIn,
            search: $searchQuery,
            sort: $sortFilter
            ${queryData.year ? `seasonYear: ${queryData.year}` : ''}
            ${season}
            ${airingStatus}
            ) {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            genres
            format
            seasonYear
            coverImage {
              large
              color
            }
            bannerImage
            averageScore
            popularity
            episodes
            status
            format
            duration
            trending
            studios (isMain: true) {
              edges {
                id
              }
              nodes {
                name
              } 
            }
            airingSchedule {
              edges {
                id
                node {
                  id
                  episode
                  timeUntilAiring
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        genresNotIn: queryData.genreNotIn,
        genresIn: queryData.genreIn,
        tagIn: queryData.tagIn,
        tagNotIn: queryData.tagNotIn,
        searchQuery: queryData.search,
        pageNumber: queryData?.pageNumber ? queryData.pageNumber : 1,
        sortFilter: queryData?.sort ? queryData.sort : null,
      }
    }
  }).catch((e) => {
    return NextResponse.json({
      status: 'failure',
      message: e.message
    })
  })

  console.log('from graphql api: result.data', result.data)
  if(result.data) {
    return NextResponse.json({
      status: 'success',
      data: result.data.data.Page
    })
  }else {
    return NextResponse.json({
      status: 'failure',
    })
  }
}
