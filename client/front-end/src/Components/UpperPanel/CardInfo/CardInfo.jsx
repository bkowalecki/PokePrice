import { useState } from "react";
import { db, addCard } from "../../../firebase";
import defaultImg from "../../../pokemon_card_back.jpg";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "./CardInfo.css";

import Pokeball from '../../../Assets/3.svg'

const CardInfo = ({
  fetchedCard,
  addCardToPortfolio,
  deleteCardFromPortfolio,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="card-info-wrapper">
      {fetchedCard.id !== null ? (
        <div className="card-window">
          <div className="img-wrapper">
            <img className="card-img" src={fetchedCard.img} alt="new" />
          </div>

          <div className="info-chunk">
            <div>Price</div>
            <div>${fetchedCard.price}</div>
            <div className="btn-container">
              <button onClick={addCardToPortfolio} className="add-card-btn">
                Add
              </button>
              <button
                onClick={deleteCardFromPortfolio}
                className="remove-card-btn"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-window">
          {/* <img
            className="card-img"
            src={defaultImg}
            alt="new"
          /> */}

          <div class="container mx-auto py-10 ">
            <div class="flex justify-center px-4 flex-wrap">
              <div class="w-80 overflow-hidden flex justify-center items-center  ring-8 ring-[#ffcb05] bg-[#FB1B1B] shadow-lg  md:w-1/2">
                <div class="bg-[url()] bg-repeat">
                  <div class=" mx-5 mt-2 flex justify-between items-center shadow-md border-2 px-2 pt-1 rounded-[2px] border-opacity-50  border-t-teal-50 border-l-teal-50  border-b-[#000000] border-r-[#000000]">
                    <span class="font-Merriweather font-bold text-lg bg-color:#FB1B1B">
                      <input class="bg-black text-white" placeholder="Name" />
                    </span>
                    {/* <span><img src="https://static.wikia.nocookie.net/yugioh/images/a/a1/EARTH.svg" height="30" width="30" alt=""/></span> */}
                  </div>
                  <div class="mx-7 my-1 flex justify-end items-center">
                    {/* <span><img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Starball_Red.svg" height="20" width="20"
                                    alt=""/></span> */}
                  </div>
                  <div class=" mx-auto bg-black rounded-[1px] ring-4 my-1 h-[260px] w-[260px] shadow-lg shadow-black ring-offset-0 ring-[#808080] ">
                    <img
                      class="object-fill"
                      src={Pokeball}
                      alt="haru"
                    />
                  </div>
                  <div class="mx-7 my-1 flex justify-end items-center">
                    <span class="text-xs font-bold font-Merriweather">
                      
                    </span>
                  </div>
                  <div class="mx-2">
                    <div class="bg-[url('hhttp://www.w3.org/2000/svg')] bg-repeat">
                      <div class="bg-slate-200 mx-1 my-2 px-1 ring-4 ring-[#FFC85F] font-Merriweather">
                        <p class="text-[20px]">
                          Welcome to Pokeprice! A fun, easy way to track the value of your pokemon
                          card collection. Enter your card's information and get real time prices.
                        </p>
                        <hr class="h-1 bg-black" />
                        <div class="flex justify-end items-center"></div>
                      </div>
                    </div>
                  </div>
                  <div class="mx-2 flex justify-between items-center">
                    <span class="text-[9px] text-white">
                    <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Set
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Account settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Support
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    License
                                  </a>
                                )}
                              </Menu.Item>
                              <form method="POST" action="#">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      type="submit"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block w-full px-4 py-2 text-left text-sm"
                                      )}
                                    >
                                      Sign out
                                    </button>
                                  )}
                                </Menu.Item>
                              </form>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </span>
                    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Number
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfo;
