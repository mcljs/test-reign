import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function SelectMenu({ selected, setSelected, options }) {
  return (
    <Listbox
      className='w-[240px] h-[32px] '
      value={selected}
      onChange={setSelected}
    >
      {({ open }) => (
        <>
          <div className='mt-1 relative'>
            <Listbox.Button className='relative  bg-white border border-[#2e2e2e] rounded-md shadow-sm w-[240px] h-[32px] px-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <span className='flex items-center'>
                {selected?.avatar && (
                  <img
                    src={selected.avatar}
                    alt=''
                    className='flex-shrink-0 h-6 w-6'
                  />
                )}
                <span className='ml-3 block truncate text-[14px]'>
                  {selected.name}
                </span>
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none'>
                {options.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-[#343434] bg-[#eaeaea]"
                          : "text-gray-900",
                        "cursor-default select-none relative w-[240px] h-[42px] px-3 py-3"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          {person?.avatar && (
                            <img
                              src={person.avatar}
                              alt=''
                              className='flex-shrink-0 h-6 w-6'
                            />
                          )}

                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate text-[14px]"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default SelectMenu;
