import SearchBar from "./components/SearchBar/SearchBar";
import React from "react";
import "./App.css";
import { requestForImage } from "./services/api";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import NoResults from "./components/NoResults/NoResults";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { ImageData } from "./types";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showList, setShowList] = useState<ImageData[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<ImageData | null>(null);
  const [openModalState, setOpenModalState] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadMoreShow, setLoadMoreShow] = useState<boolean>(false);

  const openModalFromImage = (imageData: ImageData): void => {
    setDataModal(imageData);
    setOpenModalState(true);
  };

  const modalClose = (): void => {
    setDataModal(null);
    setOpenModalState(false);
  };

  const loadMore = (): void => {
    setPage((prevState) => (prevState += 1));
  };

  function searchFormSubmit(userSearchQuery: string): void {
    setPage(1);
    setUserQuery(userSearchQuery);
    setNoResults(false);
    setShowError(false);
    setShowList([]);
  }

  useEffect(() => {
    if (userQuery !== "") {
      (() => {
        async function searchByUserQuery() {
          try {
            setLoading(true);
            setShowError(false);
            const responseData: {
              total: number;
              total_pages: number;
              results: [];
            } = await requestForImage(userQuery, page);
            if (responseData.total === 0) {
              setNoResults(true);
            }
            if (responseData.total_pages > page) {
              setLoadMoreShow(true);
            } else setLoadMoreShow(false);

            setShowList((prevState) => {
              return [...prevState, ...responseData.results];
            });
          } catch (error) {
            setShowError(true);
          } finally {
            setLoading(false);
          }
        }
        searchByUserQuery();
      })();
    } else return;
  }, [page, userQuery]);

  return (
    <>
      <SearchBar searchByKeyword={searchFormSubmit} resetPage={setPage} />
      {showError && <ErrorMessage />}
      {showList.length > 0 && (
        <ImageGallery
          itemsList={showList}
          handleOpenModal={openModalFromImage}
        />
      )}
      {noResults && <NoResults />}

      {openModalState && dataModal !== null && (
        <ImageModal
          dataModal={dataModal}
          openState={openModalState}
          modalClose={modalClose}
        />
      )}
      {loading && <Loader />}
      {loadMoreShow && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
};
export default App;
