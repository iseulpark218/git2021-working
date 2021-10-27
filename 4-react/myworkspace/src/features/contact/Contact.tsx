import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/PaginationContact";
import { AppDispatch, RootState } from "../../store";
import {
  requestFetchContacts,
  requestFetchPagingContacts,
} from "./contactSaga";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
  })} ⏱${dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
};

const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // console.log(dispatch);
    // console.log(contact.isFetched);
    // 데이터 fetch가 안되었으면 데이터를 받아옴
    if (!contact.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      // dispatch(requestFetchContacts());
      dispatch(
        requestFetchPagingContacts({
          page: 0,
          size: contact.pageSize,
        })
      );
    }
  }, [dispatch, contact.isFetched, contact.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    // setCurrentPage(page);
    dispatch(
      requestFetchPagingContacts({
        page,
        size: contact.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingContacts({
        page: contact.page,
        size: +e.currentTarget.value,
      })
    );
  };

  const onEvent = (e: any) => {
    console.log(e.type, "", e);
  };

  return (
    <div>
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center my-5">
          <u>Contact</u>
        </h2>
      </div>
      {/* 버튼    <div className="d-flex justify-content-start">*/}
      <div>
        <div className="d-flex justify-content-start">
          <div>
            <button
              type="button"
              className="btn btn-primary text-nowrap btn-sm"
            >
              <i className="bi bi-person-dash-fill me-2"></i>
              삭제
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark text-nowrap btn-sm mx-2"
              onClick={() => {
                history.push("/contacts/create");
              }}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              추가
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {/*-----------------*/}
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => {
              dispatch(requestFetchContacts());
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <select
            className="form-select form-select-sm me-2 p-1"
            style={{ width: "55px", height: "30px" }}
            onChange={(e) => {
              handlePageSizeChanged(e);
            }}
          >
            {[3, 5, 10, 20].map((size) => (
              <option value={size} selected={contact.pageSize === size}>
                {size}
              </option>
            ))}
          </select>
          {/*-----------------*/}
          {/*
         <select
          className="form-select form-select-sm"
          style={{ width: "60px" }}
          >
            <option>3</option>
            <option>5</option>
            <option>10</option>
        </select>
*/}
        </div>
      </div>
      <table className="table table-striped table table-hover">
        <thead className="display-flex;">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Date Created</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {contact.data.map((item, index) => (
            <tr className="display-flex">
              <td className="p-2">
                <input
                  className="checkbox mt-1"
                  style={{ zoom: 1.3 }}
                  type="checkbox"
                  onChange={onEvent}
                />
              </td>
              {/*
          <td className="text-center">❤{item.select}</td> 
*/}
              <td
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/contacts/detail/${item.id}`);
                }}
              >
                ({item.id}) {item.txtName}
              </td>
              <td>{item.txtContact}</td>
              <td>{item.txtEmail}</td>
              <td>{getTimeString(item.createdTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          blockSize={5} // 고정값
          totalPages={contact.totalPages}
          currentPage={contact.page}
          onPageChanged={handlePageChanged}
        />

        {/*
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
*/}
      </div>
    </div>
  );
};

export default Contact;
