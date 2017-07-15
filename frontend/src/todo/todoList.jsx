import React from 'react';
import IconButton from '../template/iconButton';
import '../template/custom.css';

export default props => (
    <table className='table'>
        <thead>
            <tr>
                <th>Descrição</th>
                <th className='tableActions'>Ações</th>
            </tr>
        </thead>
        <tbody>
            {renderRows(props)}
        </tbody>
    </table>
)

const renderRows = (props) => {
    const list = props.list || [];

    return list.map(data => (
        <tr key={data._id}>
            <td className={data.done?'markedAsDone':''}>{data.description}</td>
            <td>
                <IconButton hide={data.done} style='success' icon='check' onClick={() => props.handleMarkAsDone(data)}/>
                <IconButton hide={!data.done} style='warning' icon='undo' onClick={() => props.handleMarkAsPending(data)} />
                <IconButton style='danger' icon='trash-o' onClick={() => props.handleRemove(data)}/>
            </td>
        </tr>
    ));
}