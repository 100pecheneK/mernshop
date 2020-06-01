import SpinnerLinear from "../../layout/SpinnerLinear"
import Pagination from "../../layout/Pagination"
import React from "react"

const AdminGoods = ({match}) => (
    <>
        <h1>AdminGoods<SpinnerLinear/></h1>
        <p>Page:{match.params.page}</p>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
                <td><a className="waves-effect waves-light btn blue">button</a></td>
                <td><a className="waves-effect waves-light btn red">button</a></td>
            </tr>
            </tbody>
        </table>
        <Pagination
            path={'/admin/adminGoods'}
            totalPages={15}
            currentPage={+match.params.page ? +match.params.page : 1}
        />
    </>
)

export default AdminGoods