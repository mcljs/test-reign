import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

import clsx from "clsx";
import Container from "../components/Container";
import SelectMenu from "../components/SelectMenu";
import TimeIcon from "../Icons/TimeIcon";
import apiService from "../services/apiService";
import { formatDistance } from "date-fns";
import Link from "../components/Link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import FavoriteIcon from "../Icons/FavoriteIcon";
import FavoriteOutlineIcon from "../Icons/FavoriteOutlineIcon";
import useMediaQuery from "../hooks/useMediaQuery";

function Home() {
  const select = [
    {
      id: 0,
      name: "Select your news",
    },
    {
      id: 1,
      name: "Angular",
      query: "angular",
      avatar: "/angular.png",
    },
    {
      id: 2,
      name: "Reacts",
      query: "reactjs",
      avatar: "/reactjs.png",
    },
    {
      id: 3,
      name: "Vuejs",
      query: "vuejs",
      avatar: "/vuejs.png",
    },
  ];
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(select[1]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  console.log(currentPage);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage < 2) {
      return;
    }
    setCurrentPage((page) => page - 1);
    getData();
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getData = async () => {
    try {
      const dataResponse = await apiService.get(
        `/search_by_date?query=${selected.query}&page=${currentPage}`
      );
      setData(dataResponse.data);
      setNumberOfPages(dataResponse.data.nbPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [selected, currentPage, data?.page]);

  const addFav = (id) => {
    const newFavourites = [...favourites, id];
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
    setFavourites(newFavourites);
  };

  const removeFav = (id) => {
    const newFavourites = [
      ...favourites.filter((found) => found.objectID !== id.objectID),
    ];
    setFavourites(newFavourites);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers.push(i);
  }

  const numberLimit = useMediaQuery('(min-width: 1024px)') ? 10 : 4;
  let startPoint = 1;
  let endPoint = numberLimit;
  if (numberLimit > numberOfPages) {
    endPoint = numberOfPages;
  } else if (currentPage <= numberLimit / 2) {
    endPoint = numberLimit;
  } else if (currentPage + numberLimit / 2 <= numberOfPages) {
    startPoint = currentPage - numberLimit / 2;
    endPoint = currentPage + numberLimit / 2;
  } else {
    startPoint = numberOfPages - (numberLimit - 1);
    endPoint = numberOfPages;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (var i = startPoint; i <= endPoint; i++) {
    points.push(i);
  }

  console.log(data);
  console.log(numberOfPages);

  return (
    <div className='text-2xl mt-[78px]'>
      <Tab.Group>
        <Tab.List className='flex justify-center'>
          <Tab
            className={({ selected }) =>
              clsx(
                "group  inline-flex items-center py-1 px-8 rounded-[2px] border-[1px] font-medium text-sm text-[16px]",
                selected
                  ? "border-[#1797ff] text-[#1797ff]"
                  : "border-[#d6d6d6] text-[#606060]"
              )
            }
          >
            All
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "group  inline-flex items-center py-1 px-5 rounded-[2px] border-[1px] font-medium text-sm text-[16px]",
                selected
                  ? "border-[#1797ff] text-[#1797ff]"
                  : "border-[#d6d6d6] text-[#606060]"
              )
            }
          >
            My faves
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Container>
            <div className='mt-[63px]'>
              <SelectMenu
                selected={selected}
                setSelected={setSelected}
                options={select}
              />
            </div>

            <Tab.Panel>
              <ul className='mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
                {data?.hits?.map((notes, i) => {
                  const createdAt = notes.created_at;
                  const timestamp = createdAt ? new Date(createdAt) : "";
                  const distance = formatDistance(Date.now(), timestamp, {
                    addSuffix: true,
                  });
                  return (
                    <li
                      key={i}
                      className='col-span-1 bg-white rounded-lg shadow hover:opacity-[.4]'
                    >
                      <div className='w-full flex items-center justify-between space-x-6'>
                        <Link
                          href={notes.story_url}
                          className='flex-1 truncate px-4'
                        >
                          <div className='flex items-center space-x-3'>
                            <TimeIcon className='w-4 ml-1' />
                            <h3 className='text-[#767676] text-[11px] hover:opacity-[.5]'>
                              {distance.substring(
                                distance.indexOf(distance.match(/\d+/g))
                              )}{" "}
                              by {notes.author}
                            </h3>
                          </div>
                          <p className='mt-1 text-gray-500 text-[14px] font-medium truncate'>
                            {notes.story_title}
                          </p>
                        </Link>
                        <div className='bg-[#606060]/[.06]  flex-shrink-0 py-6 px-4'>
                          {!favourites.some(
                            (found) => found.objectID === notes.objectID
                          ) ? (
                            <b
                              className='cursor-pointer'
                              onClick={() => addFav(notes)}
                            >
                              <FavoriteOutlineIcon className='w-6' />
                            </b>
                          ) : (
                            <b
                              className='cursor-pointer'
                              onClick={() => removeFav(notes)}
                            >
                              <FavoriteIcon className='w-6' />
                            </b>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <ul className='mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
                {favourites?.map((notes, i) => {
                  const createdAt = notes.created_at;
                  const timestamp = createdAt ? new Date(createdAt) : "";
                  const distance = formatDistance(Date.now(), timestamp, {
                    addSuffix: true,
                  });

                  //console.log( notes.story_title, "notes.story_title");
                  return (
                    <li
                      key={i}
                      className='col-span-1 bg-white rounded-lg shadow hover:opacity-[.4]'
                    >
                      <div className='w-full flex items-center justify-between space-x-6'>
                        <Link
                          href={notes.story_url}
                          className='flex-1 truncate px-4'
                        >
                          <div className='flex items-center space-x-3'>
                            <TimeIcon className='w-4 ml-1' />
                            <h3 className='text-[#767676] text-[11px]'>
                              {distance.substring(
                                distance.indexOf(distance.match(/\d+/g))
                              )}{" "}
                              by {notes.author}
                            </h3>
                          </div>
                          <p className='mt-1 text-gray-500 text-[14px] font-medium truncate'>
                            {notes.story_title}
                          </p>
                        </Link>
                        <div className='bg-[#606060]/[.06]  flex-shrink-0 py-6 px-4'>
                          {!favourites.some(
                            (found) => found.objectID === notes.objectID
                          ) ? (
                            <b
                              className='cursor-pointer'
                              onClick={() => addFav(notes)}
                            >
                              <FavoriteOutlineIcon className='w-6' />
                            </b>
                          ) : (
                            <b
                              className='cursor-pointer'
                              onClick={() => removeFav(notes)}
                            >
                              <FavoriteIcon className='w-6' />
                            </b>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Tab.Panel>
          </Container>
        </Tab.Panels>
        <div className='flex justify-center my-20'>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              type='button'
              onClick={goToPreviousPage}
              className='relative inline-flex items-center px-2 mx-2 py-2 rounded-md border border-[#d9d9d9] bg-white text-sm  text-gray-500 hover:bg-gray-50 '
            >
              <ChevronLeftIcon className=' h-5 w-5 ' aria-hidden='true' />
            </button>
            <div>
              {points?.map((number, i) => {
                return (
                  <button
                    key={i}
                    type='button'
                    onClick={number !== "..." ? changePage : () => {}}
                    className={`relative inline-flex items-center px-2 mx-2 py-2 rounded-md border border-[#d9d9d9] bg-white text-sm  text-gray-500 hover:bg-gray-50 ${
                      number === currentPage ? "bg-[#1890ff] text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                );
              })}
            </div>

            <button
              type='button'
              onClick={goToNextPage}
              className='relative inline-flex items-center px-2 py-2 rounded-md border mx-2  border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 '
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </Tab.Group>
    </div>
  );
}

export default Home;
