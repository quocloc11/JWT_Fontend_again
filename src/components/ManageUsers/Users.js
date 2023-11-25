import { useEffect, useState } from "react"
import { fetchAllUser, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate'
import { toast } from "react-toastify"
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUsers"
import './Users.scss'
const Users = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    //modal updata
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({})
    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit)
        if (response && response.data && response.data.EC === 0) {
            //setListUsers(response.data.DT)
            setTotalPages(response.data.DT.totalPage)
            setListUsers(response.data.DT.users)

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        // await fetchUsers(+event.selected + 1)
    };
    const handleDelete = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }
    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})

    }
    const confirmDeleteUser = async () => {
        let reponse = await deleteUser(dataModal)
        if (reponse && reponse.data.EC === 0) {
            toast.success(reponse.data.EM)
            await fetchUsers()
            setIsShowModalDelete(false)

        } else {
            toast.error(reponse.data.EM)
        }
    }
    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsers()

    }
    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setIsShowModalUser(true)
        setDataModalUser(user)
    }
    const handleRefresh = async () => {
        await fetchUsers()

    }
    return (
        <>
            <div className="container">

                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-success refresh"
                                onClick={() => handleRefresh()}
                            ><i className="fa fa-refresh" ></i>Refesh</button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE")
                                }}>
                                <i className="fa fa-plus-circle"></i>
                                Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <tb>
                                                        <span title="Edit" className="edit "
                                                            onClick={() => handleEditUser(item)}

                                                        >
                                                            <i className="fa fa-pencil"></i>
                                                        </span>
                                                        <span title="Delete" className="delete"
                                                            onClick={() => handleDelete(item)}
                                                        ><i className="fa fa-trash-o"></i></span>
                                                    </tb>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td>Not found users</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                            <ModalUser
                                onHide={onHideModalUser}
                                show={isShowModalUser}
                                action={actionModalUser}
                                dataModalUser={dataModalUser}
                            />
                        </div>
                    }
                </div>

            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
        </>
    )
}

export default Users