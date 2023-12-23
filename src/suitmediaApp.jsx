import "./styles.css";
import React, { useEffect } from "react";
import axios from "axios";

class SuitmediaApp extends React.Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      isDropdownPageOpen: false,
      isDropdownSortOpen: false,
      itemsPerPage: 10,
      defaultItemsPerPage: 10,
      sortOption: "-published_at",
      defaultSortOption: "-published_at",
    };

    this.toggleDropdownPage = this.toggleDropdownPage.bind(this);
    this.toggleDropdownSort = this.toggleDropdownSort.bind(this);
  }

  toggleDropdownPage = (selectedPerPage) => {
    this.setState(
      (prevState) => ({
        isDropdownPageOpen: !prevState.isDropdownPageOpen,
        itemsPerPage: selectedPerPage,
        defaultItemsPerPage: selectedPerPage,
      }),
      () => {
        this.fetchIdeasData(1, selectedPerPage, this.state.sortOption);
        // this.setLocalStorageData();
      }
    );
  };

  toggleDropdownSort = (selectedSortOption) => {
    this.setState(
      (prevState) => ({
        isDropdownSortOpen: !prevState.isDropdownSortOpen,
        sortOption: selectedSortOption,
        defaultSortOption: selectedSortOption,
      }),
      () => {
        this.fetchIdeasData(1, this.state.itemsPerPage, selectedSortOption);
        // this.setLocalStorageData();
      }
    );
  };

  fetchIdeasData = (pageNumber, pageSize, itemSort) => {
    axios
      .get("/api/ideas", {
        params: {
          "page[number]": pageNumber,
          "page[size]": pageSize,
          append: ["small_image", "medium_image"],
          sort: itemSort,
        },
      })
      .then((response) => {
        this.setState({ ideas: response.data.data });
      })
      .catch((error) => {
        console.error("Error mengambil data dari API: ", error);
      });
  };

  componentDidMount() {
    this.fetchIdeasData(1, this.state.itemsPerPage, this.state.sortOption);

    window.addEventListener("scroll", this.handleScroll);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.itemsPerPage !== this.state.itemsPerPage ||
  //     prevState.sortOption !== this.state.sortOption
  //   ) {
  //     this.setLocalStorageData();
  //   }
  // }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const banner = document.querySelector(".banner-img");
    const bannerRect = banner.getBoundingClientRect();
    const isActive =
      bannerRect.top < window.innerHeight && bannerRect.bottom >= 0;

    if (isActive) {
      banner.classList.add("active");
    } else {
      banner.classList.remove("active");
    }
  };

  render() {
    return (
      <>
        <div className="suitmedia-frontend">
          <header className="flex bg-[#E96024] py-4 px-16 h-20">
            <div className="flex-1 logo-img">
              <img className="h-full" src="/images/logo.svg" />
            </div>
            <nav>
              <ul className="flex gap-4 m-auto h-full justify-center items-center text-white">
                <li>
                  <a href="#">Work</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Ideas</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </header>

          <main>
            <div className="banner-img relative w-full h-96">
              <div className="text-white absolute z-20 w-full h-full flex flex-col gap-2 items-center justify-center">
                <h2 className="text-5xl">Ideas</h2>
                <p>Where all our great things begin</p>
              </div>
              <div className="banner-overlay"></div>
              <img
                src="/images/banner-image.jpg"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="flex justify-between m-10">
              <p>Showing 1 - {this.state.itemsPerPage} of 100</p>
              <div className="flex gap-6">
                <div className="flex gap-1 items-center">
                  <p>Show per page: </p>

                  <div>
                    <button
                      id="dropdownPageDefaultButton"
                      data-dropdown-toggle="dropdownPage"
                      className="text-black border justify-between border-black w-[120px] bg-transparent focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                      type="button"
                      onClick={() =>
                        this.toggleDropdownPage(this.state.defaultItemsPerPage)
                      }
                    >
                      {this.state.defaultItemsPerPage}{" "}
                      <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {this.state.isDropdownPageOpen && (
                      <div
                        id="dropdownPage"
                        className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[120px] mt-2"
                      >
                        <ul
                          className="py-2 text-sm text-black border border-black rounded-lg"
                          aria-labelledby="dropdownPageDefaultButton"
                        >
                          <li>
                            <a
                              className="block px-4 py-2 hover:bg-[#E96024] hover:text-white cursor-pointer"
                              onClick={() => this.toggleDropdownPage(10)}
                            >
                              10
                            </a>
                          </li>
                          <li>
                            <a
                              className="block px-4 py-2 hover:bg-[#E96024] hover:text-white cursor-pointer"
                              onClick={() => this.toggleDropdownPage(20)}
                            >
                              20
                            </a>
                          </li>
                          <li>
                            <a
                              className="block px-4 py-2 hover:bg-[#E96024] hover:text-white cursor-pointer"
                              onClick={() => this.toggleDropdownPage(50)}
                            >
                              50
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <p>Sort by: </p>

                  <div>
                    <button
                      id="dropdownSortDefaultButton"
                      data-dropdown-toggle="dropdownSort"
                      className="text-black border justify-between border-black w-[120px] bg-transparent focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                      type="button"
                      onClick={() =>
                        this.toggleDropdownSort(this.state.defaultSortOption)
                      }
                    >
                      {this.state.defaultSortOption === "-published_at"
                        ? "Newest"
                        : "Oldest"}{" "}
                      <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {this.state.isDropdownSortOpen && (
                      <div
                        id="dropdownSort"
                        className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[120px] mt-2"
                      >
                        <ul
                          className="py-2 text-sm text-black border border-black rounded-lg"
                          aria-labelledby="dropdownSortDefaultButton"
                        >
                          <li>
                            <a
                              className="block px-4 py-2 hover:bg-[#E96024] hover:text-white cursor-pointer"
                              onClick={() =>
                                this.toggleDropdownSort("-published_at")
                              }
                            >
                              Newest
                            </a>
                          </li>
                          <li>
                            <a
                              className="block px-4 py-2 hover:bg-[#E96024] hover:text-white cursor-pointer"
                              onClick={() =>
                                this.toggleDropdownSort("published_at")
                              }
                            >
                              Oldest
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mx-10 justify-center">
              {this.state.ideas.length > 0 &&
                this.state.ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex-[0_0_20%] mt-10 bg-white border border-gray-200 rounded-lg mr-10 shadow-md w-80"
                  >
                    <img
                      className="rounded-t-lg object-cover w-full h-80"
                      src="/images/thumbnail-img.jpg"
                      alt=""
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-400">
                        {idea.published_at}
                      </h5>
                      <h3 className="mb-3 font-bold text-2xl text-black">
                        <div className="title line-clamp-3">{idea.title}</div>
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default SuitmediaApp;
