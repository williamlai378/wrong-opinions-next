'use client'

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

const GenreTagFilterOption = ({ isGenre, title, filterOptions, setFilterOptions, modalToggle}) => {
    // statusTypes is used to determine which array to push/remove the genre/tag to/from
    let statusTypes = isGenre ? ['genreIn', 'genreNotIn'] : ['tagIn', 'tagNotIn'];
    let inArray = isGenre ? filterOptions.genreIn : filterOptions.tagIn;
    let notInArray = isGenre ? filterOptions.genreNotIn : filterOptions.tagNotIn;

    // ['tag-unselected', 'tag-selected', 'avoid-selected']
    const [status, setStatus] = useState('tag-unselected');

    //used to see which tag/genre has been previously selected filter modal toggles on
    const determineStatus = () => {
        inArray.map((item) => {
            if(item === title) {
                console.log(item === title)
                setStatus('tag-selected');
            }
        })

        notInArray.map((item) => {
            if(item === title) {
                setStatus('avoid-selected');
            }
        })
    }

    useEffect(() => {
        determineStatus();
    }, [modalToggle])

     
    
    const handleClick = () => {
        switch(status) {
            case('tag-unselected'): {// switch genre/tag to unselected to selected

                //check to if the genre/tag is in the inArray
                const index = inArray.indexOf(title); 
                if(index > -1) {
                    toast('already in the inArray');
                    return;
                }

                //add to inArray to be included in query search
                inArray.push(title);
                setFilterOptions({ ...filterOptions, [statusTypes[0]]: inArray})
                setStatus('tag-selected');
                break;
            }
            case('tag-selected'): { //switch genre/tag to avoid-selected


                /**
                 * remove genre/tag from inArray and add to not In array to be avoided in query search
                 */
                const index = inArray.indexOf(title);
                if(index > -1) {
                    // remove genre/tag from inArray
                    inArray.splice(index, 1);
                }
                notInArray.push(title); 
                console.log('after adding to not in array', notInArray);
                setStatus('avoid-selected');

                setFilterOptions({ ...filterOptions, [statusTypes[0]]: inArray, [statusTypes[1]]: notInArray})
                break;
            }
            case('avoid-selected'): { // switch genre/tag to unselected

                /**
                 * remove genre/tag from notInArray
                 */
                const index = notInArray.indexOf(title);
                if(index > -1) {
                    notInArray.splice(index, 1);
                    console.log('after removing from not in array', notInArray)
                }
                setStatus('tag-unselected');
                setFilterOptions({...filterOptions, [statusTypes[1]]: notInArray})
            }
        }
    }


    return (
        <button
            onClick={() => {handleClick()}}
            className={`${status}`}>
            {title}
        </button>
    )
}

export default GenreTagFilterOption;