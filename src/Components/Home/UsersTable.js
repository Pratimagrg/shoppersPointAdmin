import React from "react";

function UsersTable(props) {
    return (
        <div className="pt-2">
            <table className="table table-light table-bordered table-striped"style={{marginLeft: 135, paddingTop:40, width: '84vw'}}>
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                   {props.users.map((items, index) =>{
                       return(
                        <tr key={index}>
                        <td>{items.userId}</td>
                        <td>{items.username}</td>
                        <td>{items.email}</td>
                        <td>{items.contact}</td>
                        <td><button className="btn btn-primary">Edit</button></td>
                    </tr>
                       );
                   })}
                   
                </tbody>
            </table>
        </div>
    );
}
export default UsersTable;