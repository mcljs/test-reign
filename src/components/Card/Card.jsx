import React from "react";
import FavoriteIcon from "../../Icons/FavoriteIcon";
import FavoriteOutlineIcon from "../../Icons/FavoriteOutlineIcon";
import TimeIcon from "../../Icons/TimeIcon";
import Link from "../Link";

function Card({notes,distance,favourites,addFav,removeFav}) {
  return (
    <li
      className='col-span-1 border-solid border-[1px] border-[#979797]/[.8] rounded-lg shadow hover:border-[#979797]/[.4]  hover:opacity-[.5]'
    >
      <div className='w-full flex items-center justify-between space-x-6'>
        <Link href={notes.story_url} className='flex-1 truncate px-4 text-[#767676] text-[11px]'>
          <div className='flex items-center space-x-3'>
            <TimeIcon className='w-4 ml-1' />
            <h3 className=''>
              {distance.substring(distance.indexOf(distance.match(/\d+/g)))} by{" "}
              {notes.author}
            </h3>
          </div>
          <p className='mt-1 text-gray-500 text-[14px] font-medium truncate'>
            {notes.story_title}
          </p>
        </Link>
        <div className='bg-[#606060]/[.06]  flex-shrink-0 py-7 px-4 '>
          {!favourites.some((found) => found.objectID === notes.objectID) ? (
            <b className='cursor-pointer' onClick={() => addFav(notes)}>
              <FavoriteOutlineIcon className='w-6' />
            </b>
          ) : (
            <b className='cursor-pointer' onClick={() => removeFav(notes)}>
              <FavoriteIcon className='w-6' />
            </b>
          )}
        </div>
      </div>
    </li>
  );
}

export default Card;
