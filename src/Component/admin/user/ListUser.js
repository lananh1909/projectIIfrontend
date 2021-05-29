import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth-service';
import { Pagination } from '@material-ui/lab';
import UserDetail from './UserDetail';

const pageSizes = [3, 6, 9];

class ListUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            table: true,
            sortConfig: "",
            searchTitle: "",
            page: 1,
            count: 0,
            pageSize: 3,
            role: 0,
            currentUser: ""
        }
    }

    componentDidMount() {
        this.retrieveUser();  
        this.setState({
            currentUser: authService.getCurrentUser()  
        })            
    }

    retrieveUser = () => {
        const params = this.getRequestParams(this.state.searchTitle, this.state.page, this.state.pageSize, this.state.role);
        authService.getAllUsers(params)
        .then(
            (response) => {
                const {users, totalPages} = response.data;
                this.setState({
                    users: users,
                    count: totalPages
                })
            },
            (error) => {
                console.log(error);
            }
        )
        .catch((e) => {
            console.log(e);
        });
    };

    getRequestParams = (searchTitle, page, pageSize, role) => {
        let params = {};
        if(searchTitle){
            params["username"] = searchTitle;
        }
        if(page){
            params["page"] = page - 1;
        } 
        if(pageSize){
            params["size"] = pageSize;
        }
        if(role){
            params["role_id"] = role;
        }
        return params;
    }

    toTable(){
        this.setState({
            table: !this.state.table
        })
    }

    onChangeSearchTitle = (e) => {
        const search = e.target.value;
        this.setState({
            searchTitle: search
        }, () => this.findByTitle())
    };

    findByTitle = () => {
        this.setState({
            page: 1
        }, () => this.retrieveUser());
    };

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {this.retrieveUser()})
    };

    handlePageSizeChange = (event) => {
        this.setState({
            pageSize: event.target.value,
            page: 1
        }, () => {this.retrieveUser()})
    };

    sortTable = (name) => {
        const sortConfig = this.state.sortConfig;
        let direction = 'up';
        if (sortConfig && sortConfig.key === name && sortConfig.direction === 'up') {
            direction = 'down';
        }
        this.setState({
            sortConfig: {
                key: name,
                direction: direction
            }
        }, () => {
             this.sort();
        });        
    }

    sort(){
        const sortConfig = this.state.sortConfig;
        if (sortConfig) {            
            const myData = [].concat(this.state.users).sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? 1 : -1;
                }
                return 0;
            });
            this.setState({
                users: myData
            })
            var x = document.getElementsByClassName("icon");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            const icon = document.getElementById(sortConfig.key);
            if(icon){
                icon.style.display = 'inline';
                if(sortConfig.direction === 'up'){
                    icon.classList.add('fa-sort-up');
                } else if(sortConfig.direction === 'down'){
                    icon.classList.add('fa-sort-down');
                }
            }
        }
    }

    onChangeFilterRole = (e) => {
        var role = e.target.value;
        this.setState({
            page: 1,
            role: role
        }, () => this.retrieveUser());
    }

    deleteUser(id){
        var r = window.confirm("Bạn có chắc muốn xóa user này không?");
        if (r === true) {
            authService.deleteUser(id)
            .then(
                () => {
                    var n = this.state.users.filter(item => item.id !== id);
                    this.setState({
                        users: n
                    })
                },
                error => {
                    const reMessage = (
                        error.response && error.response.data && error.response.data.message) || 
                        error.message || error.toString();
                        window.alert(reMessage);
                }
            )
            
        } else {
        }     

    }

    openDetail(user){

    }
    
    render() {
        return (
            <div className="container">
                <div><Link to="/createUser" className="btn btn-primary mt-5"><i className="far fa-calendar-plus mr-1"></i>Thêm</Link></div>  
                <div className="input-group mb-3 mt-3">
                    <input type="text"
                    className="from-control"
                    placeholder="Tìm kiếm"
                    value={this.state.searchTitle}
                    onChange={this.onChangeSearchTitle}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.findByTitle}>Search</button>
                    </div>
                </div>

                <div onChange={this.onChangeFilterRole}>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio" name="roles" value="0" defaultChecked/> All
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio" name="roles" value="2"/> User
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio" name="roles" value="1"/> Admin
                        </label>
                    </div>
                </div>
    
                <div className="mt-3 mb-3 row">
                    <div className="col-sm-8">
                        Items per page: 
                        <select onChange={this.handlePageSizeChange} value={this.state.pageSize}>
                            {pageSizes.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4 float-right">
                        <Pagination 
                        count={this.state.count}
                        page={this.state.page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={this.handlePageChange}/>
                    </div>                    
                </div>     
                <div>
                    <table className="table table-striped">
                        <thead style={{background: 'pink'}}>
                            <tr>
                            <th scope="col" className="align-middle">STT</th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("username")}>Username <i id="username" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle">Role</th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("email")}>Email <i id="email" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("createdDate")}>Ngày tạo <i id="createdDate" className="fas icon" style={{display: 'none'}}></i></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users && this.state.users.map((act, index) => {
                                return (
                                    <tr key={act.id}>
                                        <th scope="row">{index + 1 + this.state.pageSize * (this.state.page-1)}</th>
                                        <td>{act.username}</td>
                                        <td>{act.role.roleName}</td>
                                        <td>{act.email}</td>
                                        <td>{new Date(act.createdDate).toLocaleDateString("en-GB")}</td>
                                        <td>
                                            <div className="btn-group btn-block" style={{float:"right"}}>
                                                {this.state.currentUser.id === act.id?(
                                                    <button type="button" className="btn btn-danger col-sm-4" onClick={(id) => this.deleteUser(act.id)} disabled><i className="far fa-trash-alt mr-1"></i></button>
                                                ):(
                                                    <button type="button" className="btn btn-danger col-sm-4" onClick={(id) => this.deleteUser(act.id)}><i className="far fa-trash-alt mr-1"></i></button>
                                                )}
                                                
                                                <button data-toggle="modal" data-target={"#myModal" + act.id} className="btn btn-success col-sm-4"><i className="fas fa-info-circle mr-1"></i></button>
                                            </div>
                                            <UserDetail user={act}/>
                                        </td>                                    
                                    </tr>
                                )
                            })}                        
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUser;