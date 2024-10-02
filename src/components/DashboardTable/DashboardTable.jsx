import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function RenderToolBar(params) {

  const EditForm = React.memo(function EditForm(props) {

    const href = props.link+props.id;

    return (
      <a href={href}>
        <EditIcon/>
      </a>
    );

  });

  const DeleteAction = React.memo(function DeleteAction(props) {

    const handleDeleteClick = (event) => {
      console.log("Deleting id: "+props.id);
      event.preventDefault();
      event.stopPropagation();
      props.deleteFunction(id,props.rows);
      console.log("Deleted id: "+props.id);
    };

    const href = "#";

    return (
      <a href={href} onClick={handleDeleteClick}>
        <DeleteIcon/>
      </a>
    );

  });

  const id = params.value ?? '';
  var link = params.formLink;

  return (
      <div>
        <EditForm link={link} id={id} tabIndex={params.tabIndex}/>
        <DeleteAction id={id} rows={params.rows} tabIndex={params.tabIndex} deleteFunction={params.deleteFunction}/>
      </div>
  );
}

export default function DashboardTable(props) {

  const rows = props.rows;
  const columns = [{
    field: 'id',
    headerName: '',
    renderCell: (params) => <RenderToolBar {...params} rows={rows} formLink={props.formLink} deleteFunction={props.deleteFunction}/>,
    width: 70,
    editable: false
  }].concat(props.columns);
  console.log("-------------Columns----------")
  console.log(columns);

  return (
    <div style={{ width: '100%' }}>
      <h4>{props.tablename}</h4>
      <a href={props.formLink} className="btn btn-sm btn-info">New Item</a>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}