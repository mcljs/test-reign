import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Container from "../components/Container";
import SelectMenu from "../components/SelectMenu";
import apiService from "../services/apiService";
import { formatDistance } from "date-fns";
import useMediaQuery from "../hooks/useMediaQuery";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoaded, setisLoaded] = useState(false);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
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
      setisLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const numberLimit = useMediaQuery("(min-width: 1024px)") ? 10 : 4;
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
              <ul
                className={clsx(
                  "mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2",
                  isLoaded ? "lg:grid-cols-2" : "lg:grid-cols-1"
                )}
              >
                {isLoaded ? (
                  data?.hits?.map((notes, i) => {
                    const createdAt = notes.created_at;
                    const timestamp = createdAt ? new Date(createdAt) : "";
                    const distance = formatDistance(Date.now(), timestamp, {
                      addSuffix: true,
                    });
                    return (
                      <Card
                        key={i}
                        notes={notes}
                        distance={distance}
                        favourites={favourites}
                        addFav={addFav}
                        removeFav={removeFav}
                      />
                    );
                  })
                ) : (
                  <div className='min-h-full pt-16 pb-12 flex flex-col bg-white justify-center'>
                    <div className='py-16 flex justify-center'>
                      <Spinner />
                    </div>
                  </div>
                )}
              </ul>
              <div className='flex justify-center my-20'>
                <Pagination
                  goToPreviousPage={goToPreviousPage}
                  points={points}
                  changePage={changePage}
                  currentPage={currentPage}
                  goToNextPage={goToNextPage}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <ul className='mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
                {favourites?.map((notes, i) => {
                  const createdAt = notes.created_at;
                  const timestamp = createdAt ? new Date(createdAt) : "";
                  const distance = formatDistance(Date.now(), timestamp, {
                    addSuffix: true,
                  });
                  return (
                    <Card
                      key={i}
                      notes={notes}
                      distance={distance}
                      favourites={favourites}
                      addFav={addFav}
                      removeFav={removeFav}
                    />
                  );
                })}
              </ul>
            </Tab.Panel>
          </Container>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Home;
