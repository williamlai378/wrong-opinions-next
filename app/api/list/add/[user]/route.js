import db from '../../../../../prisma/client'
import { NextResponse } from "next/server";

export async function POST(request, context) {
    console.log('adding to list')
    const { listItemData } = await request.json()

    //get listId 
    const list = await db.List.findFirst({
        where: {
            ownerId: context.params.user
        }
    })

    //see if the anime already exists in the user's list
    const existsInList = await db.ListItem.findUnique({
        where: {
            animeId_listId: {
                animeId: listItemData.animeId,
                listId: list.id
            }
        }
    })

    if (existsInList) {
        return NextResponse.json({
            status: 'failure',
            error: 'Anime already in list'
        })
    } else {
        const results = await db.ListItem.create({
            data: {
                animeId: listItemData.animeId,
                listId: list.id,
                animeBannerImage: listItemData.animeBannerImage,
                animeColor: listItemData.animeColor,
                animeFormat: listItemData.animeFormat,
                animeImage: listItemData.animeImage,
                animeStatus: listItemData.animeStatus,
                animeTitle: listItemData.animeTitle,
                episodeProgress: listItemData.episodeProgress,
                rating: listItemData.rating,
                totalEpisodes: listItemData.totalEpisodes,
                viewStatus: listItemData.viewStatus,
                popularity: listItemData.animePopularity
            }
        }).catch((e) => {
            console.log(e);
            return NextResponse.json({
                error: e,
                status: 'failure'
            })
        })


        return NextResponse.json({
            status: 'success',
            data: results
        })
    }


}