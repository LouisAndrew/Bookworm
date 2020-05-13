import React from 'react'
import styled from 'styled-components'

const Pagination = ({ totalItems, currentPage, maxResult, paginate }) => {

    const LINK_NUM = 5
    const numOfPages = Math.ceil( totalItems / maxResult )

    //create links here => just 5 links must be available.
    
    const createLinks = ( currentPage, LINK_NUM, numOfPages ) => {

        let linksArray = [ ]
        for ( let i = 0, j = -2; i < LINK_NUM; i++, j++ ) {
            linksArray = [...linksArray, currentPage + j]
        }

        //handling for elements on min and max side of the link.
        linksArray.forEach( (link, i) => {

            if ( link < 1 ) {

                linksArray[i] = Math.abs(link) + 4
            } else if ( link > numOfPages ) {

                linksArray[i] = link - 4
            }
        } )

        return linksArray.sort()
    }

    const links = createLinks( currentPage, LINK_NUM, numOfPages )

    return (
        <Pages>
            {
                links.map( (link, i) => <Link $currentPage={ link === currentPage } key={i}><a onClick={() => paginate(link)} >{link}</a></Link>)
            }
        </Pages>
    )
}

export default Pagination

const Link = styled.li`
    
    padding: 1vh 1.5vh;
    margin: 0 1vh;

    background-color: ${props => props.$currentPage && props.theme.pink };
    border-radius: 4px;

    a {
        font-weight: bold;
        color: ${props => props.$currentPage && props.theme.bg} !important;
    }

    &:hover {

        cursor: pointer;
    }
`

const Pages = styled.ul`
    
    display: flex;
    
    list-style: none;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -10%);
`