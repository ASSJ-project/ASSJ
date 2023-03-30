// coding by 'ikki'
import {} from "@/apis/admin/getUser";
import "./UserInfo.css";

function InfoTable({ columns, data }) {
  return (
    <div className="user_info_container">
      <table>
        <thead>
          {/* head : id, name, email, adress */}
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, email, adress }) => (
            <tr key={id + name + email + adress}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default InfoTable;
