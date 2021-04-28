import { Pagination } from '@material-ui/lab';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import activityService from '../../../services/activity-service';


const ListActivity2 = (props) => {
    const [activity, setActivity] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    const activityRef = useRef();

    activityRef.current = activity;

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    const onChangeSearchTitle = (e) => {
        const search = e.target.value;
        setSearchTitle(search);
    };
    
    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};
    
        if (searchTitle) {
          params["title"] = searchTitle;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
    };
    
    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
    
        activityService.getByPage(params)
        .then((response) => {
            const {activities, totalPages } = response.data;
    
            setActivity(activities);
            setCount(totalPages);
        }, 
        (error) => {
            console.log(error);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    
    useEffect(retrieveTutorials, [page, pageSize]);

    const findByTitle = () => {
        setPage(1);
        retrieveTutorials();
    };
    
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const toStringCommune = (commune) => {
        if(commune){
            var district = commune.district;
            var province = district.province;
            return commune.communeName + ", " + district.districtName + ", " + province.provinceName;   
        }            
    }

    const deleteActivity = (rowIdx) => {
        console.log(rowIdx);
        var r = window.confirm("Bạn có chắc muốn xóa hoạt động này không?");
        if (r === true) {
            activityService.deleteActivity(activityRef.current[rowIdx].id);
            let v = [...activityRef.current];
            v.splice(rowIdx, 1);
            setActivity(v);
        }      
    }

    const columns = useMemo(
        () => [
            {
                Header: "Tiêu đề",
                accessor: "title"
            },
            {
                Header: "Địa điểm",
                accessor: "commune",
                Cell: (props) => {
                    return toStringCommune(props.value);
                }
            },
            {
                Header: "Từ ngày",
                accessor: "fromDate",
                Cell: (props) => {
                    return new Date(props.value).toLocaleDateString("en-GB");
                }
            },
            {
                Header: "Đến ngày",
                accessor: "toDate",
                Cell: (props) => {
                    return new Date(props.value).toLocaleDateString("en-GB");
                }
            },
            {
                Header: "Số người tham gia",
                accessor: "numVolunteer"
            },
            {
                Header: "Tạo bởi",
                accessor: "createdBy"
            },
            {
                Header: "Ngày tạo",
                accessor: "createdDate"
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div className="row ml-1">
                            <span><Link to={"/activity/edit/" + activityRef.current[rowIdx].id}><i className="far fa-edit action mr-1"></i></Link></span>
                            <span><Link to={"/activity/" + activityRef.current[rowIdx].id}><i className="fas fa-info-circle mr-1"></i></Link></span>
                            <span onClick={() => deleteActivity(rowIdx)}>
                                <i className="fas fa-trash action"></i>
                            </span>
                        </div>
                    );  
                }
            },
        ], []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: activity,
    });
    return (
        <div className="container">
            <div><Link to="/createActivity" className="btn btn-primary mt-5"><i className="far fa-calendar-plus mr-1"></i>Thêm</Link></div>  
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3 mt-3">
                        <input type="text"
                        className="from-control"
                        placeholder="Tìm kiếm"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>Search</button>
                        </div>
                    </div>
                </div>  
                <div className="col-md-12 list">
                    <div className="mt-3">
                        Items per page: 
                        <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <Pagination className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}/>
                    </div>    
                    <table  className="table table-striped table-bordered"
                    {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>  
            </div>             
        </div>
    );
}; export default ListActivity2;